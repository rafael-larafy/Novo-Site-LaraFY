"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

type UnderlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

export function UnderlineLink({ children, className, ...rest }: UnderlineLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const setOrigin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
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
