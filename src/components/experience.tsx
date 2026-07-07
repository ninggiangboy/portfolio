import { education, experience } from "@/lib/data";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            Experience
          </h2>
          <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
            Where I have worked and studied.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          <div className="space-y-10 md:col-span-7">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={i * 0.06}>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {job.org}
                  </h3>
                  <p className="text-sm text-muted">{job.role}</p>
                  <p className="font-mono text-xs text-muted-2">{job.period}</p>
                  <p className="font-mono text-xs text-muted-2">
                    {job.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-5 md:border-l md:border-line md:pl-12">
            <Reveal delay={0.12}>
              <p className="font-mono text-sm text-muted">Education</p>
              <div className="mt-6 space-y-1.5">
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {education[0].school}
                </h3>
                <p className="text-sm text-muted">{education[0].degree}</p>
                <p className="font-mono text-xs text-muted-2">
                  {education[0].period}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
