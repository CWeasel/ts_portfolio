"use client"

import { ArrowDown, Download } from "lucide-react"
import { NetworkGraph } from "./network-graph"
import { FadeIn } from "./fade-in"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <NetworkGraph />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-32 md:px-8">
        <FadeIn>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
            Software Engineer
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Your Name
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Backend / Fullstack Developer with an Architect&apos;s Mindset
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            I design and build systems that are structured, scalable, and
            intentional. From database schemas to deployment pipelines, every
            layer is considered.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              View Projects
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-muted-foreground hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" />
              Download CV
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <FadeIn delay={600}>
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to about section"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
