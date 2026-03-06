import { SectionHeader } from "./section-header"
import { FadeIn } from "./fade-in"
import { ArchitectureDiagram } from "./architecture-diagram"

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="01 / About"
            title="Building with intention"
            description="A generalist by nature, an engineer by trade."
          />
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn delay={100}>
            <div className="space-y-5 leading-relaxed text-muted-foreground">
              <p>
                I started as a generalist who loved understanding how things
                work. That curiosity led me through Python with Flask and
                Django, into frontend work with React, and eventually to
                building fullstack applications with Next.js.
              </p>
              <p>
                What I find most rewarding is not just writing code, but
                designing how systems fit together. I think in layers:
                from database schemas and API contracts to deployment
                pipelines and reverse proxy configurations.
              </p>
              <p>
                I self-host my projects using Docker, configure reverse
                proxies with Nginx, manage SSL with Certbot, and run
                PostgreSQL databases. Every deployment decision is
                intentional.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <ArchitectureDiagram />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
