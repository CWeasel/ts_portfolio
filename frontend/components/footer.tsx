import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          Designed and built with intention.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
