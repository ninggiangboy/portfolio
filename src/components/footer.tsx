import { profile } from "@/lib/data";
import { BigCta } from "./big-cta";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-sm text-muted">Want to talk?</p>
          <div className="mt-6">
            <BigCta href={`mailto:${profile.email}`} label="Email me" />
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Open to good conversations about full-stack work, Go, and Spring.
          </p>
        </Reveal>

        <div className="mt-16">
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
