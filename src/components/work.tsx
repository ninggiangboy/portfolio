"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, sectionCopy } from "@/lib/data";
import { sendflowDiagram, sendflowDiagramMobile } from "@/lib/diagrams";
import { Reveal } from "./reveal";
import { SystemDiagram } from "./system-diagram";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            {sectionCopy.work.title}
          </h2>
          <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
            {sectionCopy.work.description}
          </p>
        </Reveal>

        <ul className="mt-12">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              as="li"
              delay={i * 0.08}
              className="group grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-6"
            >
              <div className="md:col-span-9">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 font-mono text-xs text-muted-2">
                  {project.kind}
                </p>
                <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
              <div className="flex items-start md:col-span-3 md:justify-end">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
                  >
                    Repository
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      aria-hidden
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted-2">
                    In progress
                  </span>
                )}
              </div>
              {project.diagram ? (
                <div className="md:col-span-12">
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8">
                    <p className="flex items-center gap-2 font-mono text-xs text-muted-2">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      System architecture
                    </p>
                    <div className="mt-6 md:hidden">
                      <SystemDiagram
                        nodes={sendflowDiagramMobile.nodes}
                        edges={sendflowDiagramMobile.edges}
                        viewBox={sendflowDiagramMobile.viewBox}
                        ariaLabel={`${project.name} system architecture diagram`}
                        nodeScale={1.18}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="mt-6 hidden md:block">
                      <SystemDiagram
                        nodes={sendflowDiagram.nodes}
                        edges={sendflowDiagram.edges}
                        viewBox={sendflowDiagram.viewBox}
                        ariaLabel={`${project.name} system architecture diagram`}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
