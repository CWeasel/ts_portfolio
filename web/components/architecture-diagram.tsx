"use client"

import { Globe, Server, Database, Container, ShieldCheck } from "lucide-react"

const layers = [
  {
    icon: Globe,
    label: "Client",
    detail: "HTTPS Request",
    color: "text-muted-foreground",
  },
  {
    icon: ShieldCheck,
    label: "SSL / Certbot",
    detail: "TLS Termination",
    color: "text-primary",
  },
  {
    icon: Server,
    label: "Nginx Reverse Proxy",
    detail: "Load Balancing & Routing",
    color: "text-primary",
  },
  {
    icon: Container,
    label: "Docker Container",
    detail: "Node.js / Next.js App",
    color: "text-primary",
  },
  {
    icon: Database,
    label: "PostgreSQL",
    detail: "Persistent Storage",
    color: "text-primary",
  },
]

export function ArchitectureDiagram() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Deployment Architecture
      </p>
      <div className="space-y-0">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div className="group flex items-center gap-4 rounded-md px-3 py-3 transition-colors hover:bg-secondary">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-secondary">
                <layer.icon className={`h-4 w-4 ${layer.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {layer.label}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {layer.detail}
                </p>
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="ml-[1.35rem] h-4 border-l border-dashed border-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
