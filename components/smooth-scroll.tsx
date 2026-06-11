"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { useEffect, useRef, useState } from "react"

import { gsap, ScrollTrigger } from "@/lib/gsap"


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

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

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
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        autoRaf: false, // CRÍTICO: o RAF é entregue ao gsap.ticker
      }}
    >
      {children}
    </ReactLenis>
  )
}
