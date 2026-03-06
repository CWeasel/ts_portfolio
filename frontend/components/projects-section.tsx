import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "./section-header"
import { FadeIn } from "./fade-in"
import { getProjects } from "@/hooks/use-portfolio"
import { log } from "console";

type Project = {
  name: string;
  description: string;
  tags: string;
  link: string;
};

// const projects = [
//   {
//     name: "Infrastructure Dashboard",
//     description:
//       "Real-time monitoring dashboard for self-hosted infrastructure. Tracks container health, resource usage, and deployment status across multiple servers.",
//     tags: ["TypeScript", "Next.js", "Docker API", "PostgreSQL", "WebSocket"],
//     link: "#",
//   },
//   {
//     name: "Auth Gateway Service",
//     description:
//       "Centralized authentication and authorization service supporting JWT tokens, role-based access control, and session management for microservice architectures.",
//     tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
//     link: "#",
//   },
//   {
//     name: "Deployment Pipeline",
//     description:
//       "Automated CI/CD pipeline with zero-downtime deployments, database migration management, SSL provisioning, and health check monitoring.",
//     tags: ["Node.js", "Docker Compose", "Nginx", "Certbot", "GitHub Actions"],
//     link: "#",
//   },
// ]

export async function ProjectsSection() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
    log("Fetched projects:", projects);
  } catch (error) {
    log("Error fetching projects:", error);
  }
  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="02 / Projects"
            title="Selected work"
            description="Systems designed with structure and deployed with care."
          />
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 100}>
              <a
                href={project.link}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
