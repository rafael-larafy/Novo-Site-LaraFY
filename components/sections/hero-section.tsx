"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import { fadeUpVariants, scrollTransition } from "@/lib/scroll-motion"
import { onAppReady } from "@/lib/app-ready"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { MetaLabel, HudGrid, HudCorners } from "@/components/ui/editorial"

// Globo 3D (Three.js) sob demanda, fora do caminho crítico (LCP/TBT).
const EarthGlobe = dynamic(
  () => import("@/components/earth-globe").then((m) => ({ default: m.EarthGlobe })),
  { ssr: false, loading: () => <div className="h-full w-full" aria-hidden /> }
)

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const inc = target / 50
    let cur = 0
    const id = setInterval(() => {
      cur += inc
      setCount(cur >= target ? target : Math.floor(cur))
      if (cur >= target) clearInterval(id)
    }, 32)
    return () => clearInterval(id)
  }, [started, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const STATS = [
  { value: 5, suffix: "+", label: "Anos de mercado" },
  { value: 100, suffix: "+", label: "Especialistas" },
  { display: "2,1 bi", label: "Cenários no motor" },
] as const

export function HeroSection() {
  const [entered, setEntered] = useState(false)

  // Handoff do preloader: entrada do hero dispara quando o loader sobe.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true)
      return
    }
    const off = onAppReady(() => setEntered(true))
    const fallback = window.setTimeout(() => setEntered(true), 5000)
    return () => {
      off()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#04101f] text-white">
      <HudGrid />

      {/* Globo 3D — deslocado para a direita, sangrando a borda */}
      <div className="pointer-events-none absolute inset-y-0 right-[-22%] z-0 flex items-center justify-center lg:right-[-6%] lg:pointer-events-auto">
        <EarthGlobe className="h-[58vh] w-[58vh] max-h-[760px] max-w-[760px] opacity-60 lg:h-[80vh] lg:w-[80vh] lg:opacity-95" />
      </div>

      {/* Vinheta p/ legibilidade do texto à esquerda */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_70%_at_25%_50%,#04101f_35%,transparent_100%)]"
        aria-hidden
      />

      {/* Barra de metadados superior */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-28 lg:px-10 lg:pt-32">
        <MetaLabel className="text-white/80">Larafy°</MetaLabel>
        <MetaLabel className="hidden sm:block">Inteligência Tributária</MetaLabel>
        <MetaLabel>[ BR — 2026 ]</MetaLabel>
      </div>

      {/* Conteúdo principal */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100vh-13rem)] max-w-[1400px] flex-col justify-center px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate={entered ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[#00e5ff]" />
            <MetaLabel className="text-[#00e5ff]">01 — Decisão tributária estratégica</MetaLabel>
          </div>

          <h1 className="mt-7 font-display font-bold uppercase leading-[0.9] tracking-[-0.02em]">
            <SplitReveal
              as="span"
              type="words"
              className="block text-[clamp(2.75rem,9vw,9rem)] text-white"
            >
              Reduza impostos
            </SplitReveal>
            <span className="block text-[clamp(2.75rem,9vw,9rem)] text-[#00e5ff]">
              com zero risco.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 lg:text-lg">
            Milhões em lucro recuperado com precisão cirúrgica. Tecnologia exclusiva
            orientada à decisão tributária — não ao achismo.
          </p>

          <div className="pointer-events-auto mt-10">
            <CtaButton href="#contato" magneticStrength={0.4}>
              Quero um diagnóstico
            </CtaButton>
          </div>
        </motion.div>
      </div>

      {/* Faixa de métricas (rodapé do hero) */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-10 lg:px-10">
        <div className="grid grid-cols-1 gap-6 border-t hairline pt-6 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <span className="font-display text-3xl font-bold text-white lg:text-4xl">
                {"value" in s ? (
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                ) : (
                  s.display
                )}
              </span>
              <MetaLabel>{s.label}</MetaLabel>
            </div>
          ))}
        </div>
      </div>

      <HudCorners className="hidden lg:block" />
    </section>
  )
}
