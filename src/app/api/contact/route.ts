import { randomUUID } from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseContactFormData } from "@/lib/contact/schema";
import { profile } from "@/lib/data";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

type ErrorBody = {
  ok: false;
  code:
    | "bad_origin"
    | "bad_request"
    | "email_failed"
    | "method_not_allowed"
    | "server_misconfigured"
    | "spam_detected"
    | "turnstile_failed";
  fieldErrors?: Partial<Record<"email" | "message" | "name", string>>;
  message: string;
};

export async function POST(request: NextRequest) {
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json<ErrorBody>(
      {
        ok: false,
        code: "bad_origin",
        message: "This request origin is not allowed.",
      },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const parsed = parseContactFormData(formData);

  if (!parsed.success) {
    const { fieldErrors } = parsed;

    if (fieldErrors.website) {
      return NextResponse.json<ErrorBody>(
        {
          ok: false,
          code: "spam_detected",
          message: "Spam protection rejected the submission.",
        },
        { status: 400 },
      );
    }

    if (fieldErrors.turnstileToken) {
      return NextResponse.json<ErrorBody>(
        {
          ok: false,
          code: "turnstile_failed",
          message: "Please complete the spam check and try again.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json<ErrorBody>(
      {
        ok: false,
        code: "bad_request",
        fieldErrors: {
          name: fieldErrors.name,
          email: fieldErrors.email,
          message: fieldErrors.message,
        },
        message: "Please review the highlighted fields and try again.",
      },
      { status: 400 },
    );
  }

  const { env } = getCloudflareContext();
  const fromEmail = env.CONTACT_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const turnstileSecret =
    env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;

  if (!fromEmail || !resendApiKey || !turnstileSecret) {
    console.error("Contact form misconfigured", {
      hasContactFromEmail: Boolean(fromEmail),
      hasResendApiKey: Boolean(resendApiKey),
      hasTurnstileSecret: Boolean(turnstileSecret),
    });

    return NextResponse.json<ErrorBody>(
      {
        ok: false,
        code: "server_misconfigured",
        message: "This form is not configured correctly.",
      },
      { status: 500 },
    );
  }

  const turnstile = await verifyTurnstileToken({
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    secret: turnstileSecret,
    token: parsed.data.turnstileToken,
  });

  if (!turnstile.success) {
    return NextResponse.json<ErrorBody>(
      {
        ok: false,
        code: "turnstile_failed",
        message: "Spam protection rejected the submission.",
      },
      { status: 400 },
    );
  }

  const text = createTextEmail(parsed.data);
  const html = createHtmlEmail(parsed.data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [profile.email],
        reply_to: parsed.data.email,
        subject: `Portfolio contact from ${sanitizeHeaderValue(parsed.data.name)}`,
        text,
        html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Contact email failed", response.status, errorText);

      return NextResponse.json<ErrorBody>(
        {
          ok: false,
          code: "email_failed",
          message:
            "Your message could not be sent right now. Please try again later.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact email failed", error);

    return NextResponse.json<ErrorBody>(
      {
        ok: false,
        code: "email_failed",
        message:
          "Your message could not be sent right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your message has been sent.",
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "OPTIONS, POST",
    },
  });
}

function hasAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function verifyTurnstileToken(input: {
  ip?: string;
  secret: string;
  token: string;
}) {
  const body = new FormData();
  body.set("secret", input.secret);
  body.set("response", input.token);
  body.set("idempotency_key", randomUUID());

  if (input.ip) {
    body.set("remoteip", input.ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      success: false,
      "error-codes": ["siteverify_request_failed"],
    } satisfies TurnstileResponse;
  }

  return (await response.json()) as TurnstileResponse;
}

function sanitizeHeaderValue(value: string) {
  return value.replaceAll(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createTextEmail(data: {
  email: string;
  message: string;
  name: string;
}) {
  return [
    "New portfolio contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function createHtmlEmail(data: {
  email: string;
  message: string;
  name: string;
}) {
  return [
    "<h1>New portfolio contact form submission</h1>",
    `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
    "<p><strong>Message:</strong></p>",
    `<p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>`,
  ].join("");
}
