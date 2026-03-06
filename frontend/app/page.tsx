import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection /> */}
      </main>
      <Footer />
    </>
  )
}
