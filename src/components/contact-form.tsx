"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type ContactFormCopy = {
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailValidation: string;
  formError: string;
  messageLabel: string;
  messagePlaceholder: string;
  messageValidation: string;
  nameLabel: string;
  namePlaceholder: string;
  nameValidation: string;
  pending: string;
  submit: string;
  success: string;
  turnstileError: string;
};

type ContactFormProps = {
  copy: ContactFormCopy;
  title: string;
};

type ApiResponse = {
  code?: string;
  fieldErrors?: Partial<Record<"email" | "message" | "name", string>>;
  message?: string;
  ok: boolean;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
          sitekey: string;
          theme?: "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm({ copy, title }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [pending, setPending] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"error" | "idle" | "success">("idle");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"email" | "message" | "name", string>>
  >({});

  useEffect(() => {
    if (
      !siteKey ||
      !scriptReady ||
      !widgetContainerRef.current ||
      widgetIdRef.current
    ) {
      return;
    }

    const turnstile = window.turnstile;
    if (!turnstile) {
      return;
    }

    widgetIdRef.current = turnstile.render(widgetContainerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: (nextToken) => {
        setToken(nextToken);
        setMessage(null);
        setStatus("idle");
      },
      "error-callback": () => {
        setToken("");
        setStatus("error");
        setMessage(copy.turnstileError);
      },
      "expired-callback": () => {
        setToken("");
      },
    });
  }, [copy.turnstileError, scriptReady, siteKey]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!siteKey) {
      setStatus("error");
      setMessage(copy.formError);
      return;
    }

    if (!token) {
      setFieldErrors({});
      setStatus("error");
      setMessage(copy.turnstileError);
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("cf-turnstile-response", token);

    setPending(true);
    setFieldErrors({});
    setMessage(null);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatus("error");
        setMessage(
          result.code === "turnstile_failed"
            ? copy.turnstileError
            : copy.formError,
        );
        resetTurnstile();
        return;
      }

      formRef.current?.reset();
      setFieldErrors({});
      setStatus("success");
      setMessage(copy.success);
      resetTurnstile();
    } catch {
      setStatus("error");
      setMessage(copy.formError);
      resetTurnstile();
    } finally {
      setPending(false);
    }
  }

  function resetTurnstile() {
    setToken("");
    window.turnstile?.reset(widgetIdRef.current ?? undefined);
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
      <div>
        <h2 className="text-4xl tracking-tighter font-medium md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          {copy.description}
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-[1.75rem] border border-line bg-background/70 p-5 backdrop-blur md:grid-cols-2 md:p-6"
        noValidate
      >
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />

        <Field
          error={fieldErrors.name ? copy.nameValidation : undefined}
          label={copy.nameLabel}
          name="name"
          placeholder={copy.namePlaceholder}
          type="text"
        />
        <Field
          error={fieldErrors.email ? copy.emailValidation : undefined}
          label={copy.emailLabel}
          name="email"
          placeholder={copy.emailPlaceholder}
          type="email"
        />

        <label className="sr-only" htmlFor="website">
          Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-muted"
          >
            {copy.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            required
            minLength={20}
            maxLength={5000}
            placeholder={copy.messagePlaceholder}
            className="w-full rounded-3xl border border-line bg-surface/60 px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-muted-2 focus:border-accent"
          />
          {fieldErrors.message ? (
            <p className="mt-2 text-sm text-[color:#b91c1c]">
              {copy.messageValidation}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <div ref={widgetContainerRef} />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={pending || !siteKey}
            className="inline-flex h-11 items-center justify-center rounded-full border border-transparent bg-accent px-5 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? copy.pending : copy.submit}
          </button>

          <p
            aria-live="polite"
            className={`text-sm ${
              status === "success" ? "text-accent" : "text-muted"
            }`}
          >
            {message}
          </p>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  error?: string;
  label: string;
  name: string;
  placeholder: string;
  type: "email" | "text";
};

function Field({ error, label, name, placeholder, type }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        maxLength={type === "email" ? 254 : 80}
        minLength={type === "email" ? undefined : 2}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-line bg-surface/60 px-4 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-muted-2 focus:border-accent"
      />
      {error ? (
        <p className="mt-2 text-sm text-[color:#b91c1c]">{error}</p>
      ) : null}
    </div>
  );
}
