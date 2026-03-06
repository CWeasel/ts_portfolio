import { SectionHeader } from "./section-header"
import { FadeIn } from "./fade-in"

const experiences = [
  {
    company: "Acme Corp",
    role: "Fullstack Developer",
    period: "2023 - Present",
    impact:
      "Designed and deployed internal tools that consolidated three legacy systems into a single platform, improving developer velocity.",
  },
  {
    company: "Buildware Inc",
    role: "Backend Developer",
    period: "2021 - 2023",
    impact:
      "Architected a microservice-based API layer serving 50k+ daily requests with 99.9% uptime using Python, FastAPI, and PostgreSQL.",
  },
  {
    company: "Launchpad Studio",
    role: "Junior Developer",
    period: "2019 - 2021",
    impact:
      "Built and maintained client-facing web applications using React and Django, contributing to 12 successful product launches.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="04 / Experience"
            title="Professional timeline"
            description="Where I've contributed and what I've built."
          />
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-border md:block" />

          <div className="space-y-8 md:space-y-0">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 100}>
                <div className="group relative md:flex md:gap-10 md:py-6">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-3 hidden md:block">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary/20" />
                  </div>

                  <div className="shrink-0 pb-2 md:w-40 md:pl-8 md:pb-0">
                    <p className="font-mono text-xs text-muted-foreground">
                      {exp.period}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-5 transition-all group-hover:border-primary/30 md:flex-1">
                    <div className="mb-2 flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.company}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.role}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {exp.impact}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
