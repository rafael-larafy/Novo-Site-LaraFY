"use client"

import * as React from "react"

import { Magnetic } from "@/components/magnetic"
import { cn } from "@/lib/utils"

/**
 * Estilo base da pílula CTA (ciano + texto navy + microfeedback via `.cta-button`).
 * Exportado para que elementos que não podem ser um `<a>` (ex.: `<button type="submit">`)
 * reusem o mesmo visual em vez de duplicar os tokens.
 */
export const ctaPillClass =
  "cta-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#04101f]"

const BASE = ctaPillClass

type CtaButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
  /** Classe da camada externa (wrapper Magnetic) — use p/ margens e alinhamento. */
  wrapperClassName?: string
  /** Intensidade do efeito magnético (0–1). Default 0.35. */
  magneticStrength?: number
  /** Mostra a seta animada à direita. Default true. */
  withArrow?: boolean
}

/**
 * CTA canônico do site: pílula ciano com microfeedback completo —
 * hover (escala + glow), clique (encolhe), brilho que varre (sheen), seta que
 * avança e atração magnética ao cursor. Centraliza o estilo antes duplicado em
 * ~12 lugares. O cursor customizado já cresce sobre ele (é um `<a>`);
 * `data-cursor="cta"` deixa a intenção explícita.
 *
 *   <CtaButton href="#contato">Quero um diagnóstico</CtaButton>
 */
export function CtaButton({
  children,
  className,
  wrapperClassName,
  magneticStrength = 0.35,
  withArrow = true,
  ...rest
}: CtaButtonProps) {
  return (
    <Magnetic strength={magneticStrength} className={wrapperClassName}>
      <a data-cursor="cta" className={cn(BASE, className)} {...rest}>
        <span className="relative z-10 inline-flex items-center gap-2 text-balance">
          {children}
          {withArrow && (
            <svg
              className="cta-arrow h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          )}
        </span>
        <span aria-hidden className="cta-sheen" />
      </a>
    </Magnetic>
  )
}
