"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { useEffect, useRef, useState } from "react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

/**
 * Smooth scroll global com Lenis, dirigido pelo MESMO ticker do GSAP.
 *
 * Insight da arquitetura (mesma do lumena-partners.com): existe UM único
 * requestAnimationFrame. Com `autoRaf: false`, o Lenis NÃO roda seu próprio
 * loop; em vez disso o `gsap.ticker` chama `lenis.raf()` a cada frame. Isso
 * elimina o jitter de double-RAF e mantém ScrollTrigger e Lenis em sincronia.
 *
 * Respeita `prefers-reduced-motion`: quando ativo, cai para o scroll nativo
 * (não monta o Lenis).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<LenisRef>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false)
      return
    }

    // gsap.ticker entrega o tempo em segundos; lenis.raf espera milissegundos.
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Mantém o ScrollTrigger atualizado a cada scroll virtual do Lenis.
    const lenis = lenisRef.current?.lenis
    lenis?.on("scroll", ScrollTrigger.update)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(update)
      lenis?.off("scroll", ScrollTrigger.update)
    }
  }, [])

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1, // = lerp:.1 do Lumena
        smoothWheel: true,
        wheelMultiplier: 0.8, // = wheelMultiplier:.8 do Lumena
        autoRaf: false, // CRÍTICO: o RAF é entregue ao gsap.ticker
      }}
    >
      {children}
    </ReactLenis>
  )
}
