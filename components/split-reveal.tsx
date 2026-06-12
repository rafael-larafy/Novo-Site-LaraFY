"use client"

import { createElement, useRef } from "react"

import { gsap, SplitText, useGSAP } from "@/lib/gsap"

type SplitKind = "lines" | "words" | "chars"

interface SplitRevealProps {
  children: React.ReactNode
  
  as?: React.ElementType
  
  type?: SplitKind
  className?: string
  
  stagger?: number
  
  duration?: number
  
  start?: string
  
  replay?: boolean
}

export function SplitReveal({
  children,
  as: Tag = "h2",
  type = "lines",
  className,
  stagger,
  duration = 0.8,
  start = "top 85%",
  replay = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const defaultStagger =
        type === "chars" ? 0.03 : type === "words" ? 0.05 : 0.1

      const split = SplitText.create(el, {
        type,
        mask: type,
        autoSplit: true,
        onSplit: (self) => {
          const targets = self[type]
          return gsap.from(targets, {
            yPercent: 100,
            opacity: 0,
            duration,
            ease: "power3.out",
            stagger: stagger ?? defaultStagger,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: replay
                ? "play none none reverse"
                : "play none none none",
            },
          })
        },
      })

      return () => split.revert()
    },
    { scope: ref, dependencies: [] }
  )

  return createElement(Tag, { ref, className }, children)
}
