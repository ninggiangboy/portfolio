import { z } from "zod";

const trimmedString = z.string().trim();

export const contactFormSchema = z.object({
  name: trimmedString.min(2).max(80),
  email: trimmedString.email().max(254),
  message: trimmedString.min(20).max(5000),
  website: z.string().trim().max(0).optional().default(""),
  turnstileToken: trimmedString.min(1),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

type ContactField = "email" | "message" | "name" | "turnstileToken" | "website";

export function parseContactFormData(formData: FormData) {
  const result = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
    turnstileToken: formData.get("cf-turnstile-response"),
  });

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  }

  return {
    success: false as const,
    fieldErrors: normalizeFieldErrors(result.error.issues),
  };
}

function normalizeFieldErrors(issues: z.ZodIssue[]) {
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  for (const issue of issues) {
    const [path] = issue.path;
    if (typeof path !== "string" || path in fieldErrors) {
      continue;
    }

    switch (path) {
      case "name":
        fieldErrors.name = "invalid_name";
        break;
      case "email":
        fieldErrors.email = "invalid_email";
        break;
      case "message":
        fieldErrors.message = "invalid_message";
        break;
      case "turnstileToken":
        fieldErrors.turnstileToken = "turnstile_required";
        break;
      case "website":
        fieldErrors.website = "spam_detected";
        break;
    }
  }

  return fieldErrors;
}
