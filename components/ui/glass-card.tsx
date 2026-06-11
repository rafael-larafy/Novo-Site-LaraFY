import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function GlassCard({
  children,
  className,
  glow = "md",
}: {
  children: ReactNode
  className?: string
  glow?: "none" | "sm" | "md"
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#1e3a5f] bg-[#071a2e]/80 ring-1 ring-[#00e5ff]/20",
        glow === "md" && "shadow-[0_0_28px_rgba(0,229,255,0.12)]",
        glow === "sm" && "shadow-[0_0_18px_rgba(0,229,255,0.08)]",
        className
      )}
    >
      {children}
    </div>
  )
}
