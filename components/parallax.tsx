"use client"

import { useEffect, useState } from "react"

import { useScrollProgressVar } from "@/hooks/use-scroll-progress"
import { cn } from "@/lib/utils"

interface ParallaxProps {
  children: React.ReactNode
  
  amount?: number
  
  className?: string
}

export function Parallax({ children, amount = 60, className }: ParallaxProps) {
  const ref = useScrollProgressVar<HTMLDivElement>()
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className="absolute inset-0 will-change-transform"
        style={
          reduce
            ? { transform: "scale(1.2)" }
            : {
                transform: `translate3d(0, calc((var(--prg, 0) - 0.5) * ${amount}px), 0) scale(1.2)`,
              }
        }
      >
        {children}
      </div>
    </div>
  )
}
