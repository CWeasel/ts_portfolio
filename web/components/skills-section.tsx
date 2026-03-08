import { SectionHeader } from "./section-header"
import { FadeIn } from "./fade-in"
import { getSkills } from "@/hooks/use-portfolio"

type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export async function SkillsSection() {
  let skillCategories = []

  try {
    const skills: Skill[] = await getSkills()

    // Transform backend data into skillCategories format
    skillCategories = Object.entries(
      skills.reduce(
        (acc: Record<string, Array<{ name: string; level: number }>>, skill: Skill) => {
          const category = skill.category || "Other"
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push({
            name: skill.name,
            level: (skill.proficiency || 0)
          })
          return acc
        },
        {} as Record<string, Array<{ name: string; level: number }>>
      )
    ).map(([category, categorySkills]) => ({
      category,
      skills: categorySkills,
    }))
  } catch (error) {
    console.error("Error fetching skills:", error)
    return (
      <section id="skills" className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="text-destructive">Error loading skills. Please try again later.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="03 / Skills"
            title="Technical proficiency"
            description="A structured overview. No inflated claims."
          />
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <FadeIn key={category.category} delay={i * 80}>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-primary">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary/60 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
