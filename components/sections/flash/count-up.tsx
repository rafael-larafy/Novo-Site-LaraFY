"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  /** Valor final a ser contado. */
  to: number
  prefix?: string
  suffix?: string
  /** Duração da animação em ms. */
  duration?: number
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Conta de 0 até `to` quando entra na viewport (uma vez). Usa tabular-nums para
 * evitar "pulo" de largura e respeita prefers-reduced-motion (mostra o final).
 */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setValue(to)
      return
    }

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || started.current) return
        started.current = true

        let start = 0
        const tick = (now: number) => {
          if (!start) start = now
          const progress = Math.min((now - start) / duration, 1)
          setValue(Math.round(easeOutCubic(progress) * to))
          if (progress < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.5 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  )
}
