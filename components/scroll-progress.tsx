"use client"

import { useEffect, useRef } from "react"

/**
 * Barra fina de progresso de leitura no topo da página (padrão de award-site).
 * Lê a posição nativa de scroll (que o Lenis também atualiza, pois roda em
 * modo `root`), então funciona tanto com smooth-scroll quanto no fallback de
 * `prefers-reduced-motion`. Atualiza via rAF para não pesar no scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  )
}
