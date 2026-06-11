import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type NodeState = "active" | "muted" | "orphan"

export function NodeBadge({
  icon: Icon,
  label,
  state = "active",
  className,
}: {
  icon: LucideIcon
  label: string
  state?: NodeState
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071a2e]/80 ring-1",
          state === "active" && "shadow-[0_0_16px_rgba(0,229,255,0.22)] ring-[#00e5ff]/35",
          state === "muted" && "ring-[#5f86a6]/30",
          state === "orphan" && "border border-dashed border-[#1f6f8f]/50 ring-0"
        )}
      >
        <Icon className={cn("h-5 w-5", state === "active" ? "text-[#9af2ff]" : "text-[#5f86a6]")} aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          state === "active" ? "text-white/90" : "text-white/60"
        )}
      >
        {label}
      </span>
    </span>
  )
}
