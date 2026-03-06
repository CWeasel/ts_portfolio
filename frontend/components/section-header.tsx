interface SectionHeaderProps {
  label: string
  title: string
  description?: string
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
        {label}
      </p>
      <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
