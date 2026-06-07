"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

type UnderlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

/**
 * Link com sublinhado DIRECIONAL: a linha cresce a partir do lado por onde o
 * cursor entra e recolhe em direção ao lado por onde ele sai (efeito `.aPer`
 * do lumena-partners.com). A direção é definida pela CSS var `--ul-origin`,
 * lida por `.underline-link::after` em globals.css.
 *
 *   <UnderlineLink href="/sobre">Sobre nós</UnderlineLink>
 */
export function UnderlineLink({ children, className, ...rest }: UnderlineLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const setOrigin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    // metade esquerda → origem "left"; metade direita → "right"
    el.style.setProperty(
      "--ul-origin",
      e.clientX - r.left < r.width / 2 ? "left" : "right"
    )
  }

  return (
    <a
      ref={ref}
      className={cn("underline-link", className)}
      onMouseEnter={setOrigin}
      onMouseLeave={setOrigin}
      {...rest}
    >
      {children}
    </a>
  )
}
