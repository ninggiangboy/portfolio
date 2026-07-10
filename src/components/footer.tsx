import { useIntlayer } from "next-intlayer/server";
import { profile } from "@/lib/data";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";

type FooterProps = {
  socialOnly?: boolean;
};

export function Footer({ socialOnly = false }: FooterProps) {
  const { footer, profile: profileCopy } = useIntlayer("site");

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line">
      <div
        className={`mx-auto max-w-[1400px] px-6 md:px-10 ${
          socialOnly ? "py-10 md:py-12" : "py-24 md:py-32"
        }`}
      >
        {socialOnly ? null : (
          <Reveal>
            <p className="font-mono text-sm text-muted">{footer.eyebrow}</p>
            <ContactForm
              title={String(footer.cta)}
              copy={{
                description: String(footer.description),
                nameLabel: String(footer.form.nameLabel),
                namePlaceholder: String(footer.form.namePlaceholder),
                nameValidation: String(footer.form.nameValidation),
                emailLabel: String(footer.form.emailLabel),
                emailPlaceholder: String(footer.form.emailPlaceholder),
                emailValidation: String(footer.form.emailValidation),
                messageLabel: String(footer.form.messageLabel),
                messagePlaceholder: String(footer.form.messagePlaceholder),
                messageValidation: String(footer.form.messageValidation),
                submit: String(footer.form.submit),
                pending: String(footer.form.pending),
                success: String(footer.form.success),
                formError: String(footer.form.formError),
                turnstileError: String(footer.form.turnstileError),
              }}
            />
          </Reveal>
        )}

        <div className={socialOnly ? "" : "mt-16"}>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-6 font-mono text-xs text-muted-2 sm:flex-row md:px-10">
          <span>&copy; 2026 {profile.name}</span>
          <span>{profileCopy.based}</span>
        </div>
      </div>
    </footer>
  );
}
