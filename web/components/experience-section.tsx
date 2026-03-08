import { SectionHeader } from "./section-header"
import { FadeIn } from "./fade-in"
import { getExperiences } from "@/hooks/use-portfolio"
import { log } from "console";

type Experience = {
  id:string;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

export async function ExperienceSection() {
  let experiences: Experience[] = [];
  try {
    experiences = await getExperiences<Experience>();
  } catch (error) {
    log("Error fetching projects:", error);
  }
  
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
                      {exp.start_date} - {exp.end_date ?? "Present"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-5 transition-all group-hover:border-primary/30 md:flex-1">
                    <div className="mb-2 flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.company}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.title}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
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
