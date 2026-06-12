import { cn } from "@/lib/utils"

export const TITLE_CLASS =
  "font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance"

/**
 * Primitivas da direção de arte "terminal de inteligência" (redesign):
 * metadados em monospace, grade de HUD e marcas de canto tipo visor.
 */

/** Rótulo de metadados — monospace, uppercase, tracking largo. */
export function MetaLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn("meta-label text-[#5f86a6]", className)}>{children}</span>
}

/** Grade fina de HUD ao fundo (usar dentro de um container `relative`). */
export function HudGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("hud-grid pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden
    />
  )
}

/** Marcas de canto tipo visor/HUD em torno de um bloco. */
export function HudCorners({ className }: { className?: string }) {
  const corners = [
    "left-0 top-0 border-l border-t",
    "right-0 top-0 border-r border-t",
    "left-0 bottom-0 border-l border-b",
    "right-0 bottom-0 border-r border-b",
  ]
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden>
      {corners.map((p, i) => (
        <span key={i} className={cn("absolute h-4 w-4 border-[#00e5ff]/50", p)} />
      ))}
    </div>
  )
}
