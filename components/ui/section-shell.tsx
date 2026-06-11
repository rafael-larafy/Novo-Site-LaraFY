import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { HudGrid } from "@/components/ui/editorial"

type Bg = "dark" | "navy" | "darker"

const BG: Record<Bg, string> = {
  dark: "bg-[#04101f]",
  navy: "bg-[#061425]",
  darker: "bg-[#020a14]",
}

/**
 * Casca padrão de seção: fundo navy profundo (A/B/darker) + grade HUD opcional
 * + container. Use `container={false}` para conteúdo full-bleed (ex.: marquee).
 * `diamond` mantido por compatibilidade — agora renderiza a grade HUD.
 */
export function SectionShell({
  id,
  bg = "dark",
  diamond = false,
  container = true,
  className,
  containerClassName,
  children,
}: {
  id?: string
  bg?: Bg
  diamond?: boolean
  container?: boolean
  className?: string
  containerClassName?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 lg:py-28", BG[bg], className)}>
      {diamond && <HudGrid />}
      {container ? (
        <div className={cn("relative z-10 mx-auto max-w-7xl px-6 lg:px-8", containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
