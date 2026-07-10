import Image from "next/image";
import { useIntlayer } from "next-intlayer/server";
import { Reveal } from "./reveal";

export function Stack() {
  const { sections, stackGroups } = useIntlayer("site");

  return (
    <section id="stack" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            {sections.stack.title}
          </h2>
          <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
            {sections.stack.description}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {stackGroups.map(
            (
              group: {
                label: string;
                note: string;
                items: Array<{ name: string; slug: string }>;
              },
              i: number,
            ) => {
              const featured = group.label === "Backend";
              return (
                <Reveal
                  key={group.label}
                  delay={i * 0.06}
                  className={
                    featured || group.label === "Platform"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <div
                    className={`h-full rounded-2xl border border-line p-8 ${
                      featured ? "bg-surface" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className={`font-mono text-sm ${
                          featured ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {group.label}
                      </h3>
                      <p className="text-right font-mono text-xs text-muted-2">
                        {group.note}
                      </p>
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
                      {group.items.map(
                        (item: { name: string; slug: string }) => (
                          <li
                            key={item.slug}
                            className="flex items-center gap-2.5"
                          >
                            <Image
                              src={`https://cdn.simpleicons.org/${item.slug}/9ca3af`}
                              alt={item.name}
                              width={20}
                              height={20}
                              className="tech-logo"
                            />
                            <span className="text-sm text-muted">
                              {item.name}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </Reveal>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
