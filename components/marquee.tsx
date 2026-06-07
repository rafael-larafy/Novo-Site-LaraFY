"use client"

import { useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  /** Duração de um ciclo completo em segundos (↑ = mais lento). Default 30. */
  speed?: number
  className?: string
}

/**
 * Marquee horizontal infinito em GSAP, com a velocidade MODULADA pela
 * velocidade do scroll (sabor award-site do lumena-partners.com): ao rolar
 * rápido, o marquee acelera; parado, volta ao ritmo base.
 *
 * Renderiza o conteúdo duas vezes para um loop contínuo (`xPercent: -50`).
 * A segunda cópia é decorativa (aria-hidden, sem eventos). Respeita
 * `prefers-reduced-motion` (vira uma faixa estática, sem duplicar/animar).
 */
export function Marquee({ children, speed = 30, className }: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useGSAP(
    () => {
      if (!track.current) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      tween.current = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      })
      return () => {
        tween.current?.kill()
        tween.current = null
      }
    },
    { scope: track, dependencies: [speed] }
  )

  // Acelera conforme a velocidade do scroll do Lenis; em repouso volta a 1.
  useLenis((lenis) => {
    const t = tween.current
    if (!t || !lenis) return
    t.timeScale(1 + Math.min(Math.abs(lenis.velocity) * 0.3, 6))
  })

  if (reduce) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center", className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div
          className="flex shrink-0 items-center pointer-events-none"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
