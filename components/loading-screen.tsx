"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLenis } from "lenis/react"

import { EASE_SIGNATURE } from "@/lib/ease"
import { markAppReady } from "@/lib/app-ready"

/**
 * Tela de loading inicial (preloader). Cobre a viewport no primeiro carregamento,
 * mostra um slot central (onde entrará um elemento 3D depois), logo e progresso.
 * Trava o scroll enquanto visível (Lenis + fallback nativo) e sai deslizando pra
 * cima quando o `window.load` dispara (com tempo mínimo p/ não piscar).
 * Respeita prefers-reduced-motion. Mostra só no load inicial (não em navegação SPA).
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [reduce, setReduce] = useState(false)
  const lenis = useLenis()

  // trava o scroll enquanto a tela está visível
  useEffect(() => {
    if (visible) {
      lenis?.stop()
      document.documentElement.style.overflow = "hidden"
      window.scrollTo(0, 0)
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ""
      markAppReady()
    }
  }, [visible, lenis])

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

    let ready = document.readyState === "complete"
    const onLoad = () => {
      ready = true
    }
    if (!ready) window.addEventListener("load", onLoad)
    // segurança: nunca prende por mais de 6s
    const safety = window.setTimeout(() => {
      ready = true
    }, 6000)

    const start = performance.now()
    const MIN_MS = 1500
    let cur = 0
    let raf = 0

    const loop = () => {
      const elapsed = performance.now() - start
      // até carregar + tempo mínimo, segura em 92%; depois completa
      const cap = ready && elapsed > MIN_MS ? 100 : 92
      cur = Math.min(cap, cur + (cap - cur) * 0.05 + 0.22)
      setProgress(cur)
      if (cur >= 99.9) {
        setProgress(100)
        window.setTimeout(() => setVisible(false), 300)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
      window.clearTimeout(safety)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a1628]"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE_SIGNATURE }}
        >
          {/* logo (versão clara: branca + ciano, já visível no fundo escuro) */}
          <Image
            src="/images/larafy-logo-light.svg"
            alt="LaraFy"
            width={306}
            height={66}
            priority
            className="h-10 w-auto lg:h-12"
          />

          {/* progresso */}
          <div className="mt-12 w-56 lg:w-72">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[#00e5ff]">
              <span>Carregando</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <div
                className="h-full bg-[#00e5ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
