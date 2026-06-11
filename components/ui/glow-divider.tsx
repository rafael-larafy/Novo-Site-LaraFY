import { cn } from "@/lib/utils"

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto h-px w-full max-w-7xl", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00e5ff]/15 to-transparent blur-[2px]" />
    </div>
  )
}
