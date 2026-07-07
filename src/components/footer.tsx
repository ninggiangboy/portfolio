import { footerCopy, profile } from "@/lib/data";
import { BigCta } from "./big-cta";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";

type FooterProps = {
  socialOnly?: boolean;
};

export function Footer({ socialOnly = false }: FooterProps) {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line">
      <div
        className={`mx-auto max-w-[1400px] px-6 md:px-10 ${
          socialOnly ? "py-10 md:py-12" : "py-24 md:py-32"
        }`}
      >
        {socialOnly ? null : (
          <Reveal>
            <p className="font-mono text-sm text-muted">{footerCopy.eyebrow}</p>
            <div className="mt-6">
              <BigCta href={`mailto:${profile.email}`} label={footerCopy.cta} />
            </div>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              {footerCopy.description}
            </p>
          </Reveal>
        )}

        <div className={socialOnly ? "" : "mt-16"}>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-6 font-mono text-xs text-muted-2 sm:flex-row md:px-10">
          <span>&copy; 2026 {profile.name}</span>
          <span>{profile.based}</span>
        </div>
      </div>
    </footer>
  );
}
