"use client"

import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: React.ReactNode
  /** Fração do deslocamento do cursor aplicada ao elemento. Default 0.4. */
  strength?: number
  className?: string
}

/**
 * Wrapper "magnético": o filho é puxado suavemente em direção ao cursor
 * (padrão de award-site, presente no lumena-partners.com). Usa `gsap.quickTo`
 * para updates de alta frequência sem criar tweens a cada mousemove.
 *
 * Só ativa em ponteiro fino (mouse) e respeita `prefers-reduced-motion`.
 *
 *   <Magnetic><a className="cta-button">Quero diagnóstico</a></Magnetic>
 */
export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      if (window.matchMedia("(pointer: coarse)").matches) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3.out" })
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3.out" })
    },
    { scope: ref }
  )

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!xTo.current || !yTo.current || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    xTo.current((e.clientX - (r.left + r.width / 2)) * strength)
    yTo.current((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onLeave = () => {
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  )
}
