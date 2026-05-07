import * as React from "react"

interface AuthShellProps {
  title: string
  subtitle: string
  features?: string[]
  children: React.ReactNode
}

export function AuthShell({
  title,
  subtitle,
  features,
  children,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-3 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
            <p className="text-sm leading-relaxed text-foreground/80">
              {subtitle}
            </p>
          </div>
          {features && features.length > 0 ? (
            <ul className="space-y-1 text-left text-sm text-foreground/70">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="w-full rounded-3xl border border-border/70 bg-card/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
