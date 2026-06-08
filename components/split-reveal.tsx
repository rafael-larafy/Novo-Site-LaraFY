"use client"

import { createElement, useRef } from "react"

import { gsap, SplitText, useGSAP } from "@/lib/gsap"

type SplitKind = "lines" | "words" | "chars"

interface SplitRevealProps {
  children: React.ReactNode
  /** Tag renderizada (h1, h2, p, span...). Default: h2 */
  as?: React.ElementType
  /** Granularidade do split. Default: "lines" (assinatura do Lumena) */
  type?: SplitKind
  className?: string
  /** Intervalo entre elementos (s). Default por tipo se omitido. */
  stagger?: number
  /** Duração de cada elemento (s). Default 0.8 */
  duration?: number
  /** start do ScrollTrigger. Default "top 85%" */
  start?: string
  /** Reverter a animação ao sair de vista. Default false (toca uma vez). */
  replay?: boolean
}

/**
 * Reveal de texto por linha/palavra/caractere com máscara — espelha o
 * `data-split` do lumena-partners.com, mas usando GSAP SplitText.
 *
 * Usa `autoSplit` (GSAP 3.13+), que re-divide o texto quando a fonte carrega
 * ou o container muda de largura — evita o bug clássico de quebra de linha
 * errada com web fonts. A animação vive em `onSplit` para ser recriada a cada
 * re-split. Respeita `prefers-reduced-motion`.
 *
 *   <SplitReveal as="h1" type="words" className="...">Reduza impostos</SplitReveal>
 */
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
            // ~ cubic-bezier(.55,0,.1,1) — a curva única do Lumena
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

  // Renderizado via createElement: a augmentação global de JSX do R3F
  // (@react-three/fiber) quebra a inferência de tag polimórfica em JSX.
  return createElement(Tag, { ref, className }, children)
}
