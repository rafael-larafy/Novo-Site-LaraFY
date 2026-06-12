"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  slideLeftVariants,
  slideRightVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"

const ENTREGAS = [
  "Simulações constantes de impacto (IVA Dual)",
  "Ajustes estratégicos em tempo real",
  "Proteção da margem e dos contratos",
]

const PERDAS = [
  "Observa a concorrência avançar",
  "Reage tarde a cada mudança",
  "Absorve o custo da Reforma",
]

export function ReformaCardSection() {
  return (
    <section className="relative overflow-hidden bg-[#04101f] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">07 — Autoridade de futuro</MetaLabel>
          <MetaLabel className="hidden sm:block">Reforma Tributária</MetaLabel>
        </div>

        <div className="mt-12 max-w-3xl">
          <SplitReveal
            as="h2"
            type="words"
            className="font-display text-[clamp(1.7rem,4vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
          >
            A Reforma não é um evento. É um processo.
          </SplitReveal>
          <motion.p
            className="mt-6 max-w-xl text-lg text-white/60"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
          >
            Há quem vai correr atrás do lucro e quem vai ficar observando. De qual
            lado você quer estar?
          </motion.p>
        </div>

        {/* a escolha binária */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border hairline lg:grid-cols-2">
          {/* lado que observa — apagado */}
          <motion.div
            className="bg-[#04101f] p-8 lg:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <MetaLabel className="text-[#5f86a6]">Sem método</MetaLabel>
            <h3 className="text-outline mt-4 font-display text-3xl font-bold uppercase leading-none lg:text-5xl">
              Quem observa
            </h3>
            <ul className="mt-8 space-y-4">
              {PERDAS.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 border-b border-white/5 pb-4 text-white/40"
                >
                  <span className="font-mono text-xs">✕</span>
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* lado que lidera — ciano */}
          <motion.div
            className="relative bg-[#061b2e] p-8 lg:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[#00e5ff]" />
            <MetaLabel className="text-[#00e5ff]">Com a Larafy</MetaLabel>
            <h3 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-white lg:text-5xl">
              Quem lidera
            </h3>
            <ul className="mt-8 space-y-4">
              {ENTREGAS.map((e) => (
                <li
                  key={e}
                  className="flex items-center gap-3 border-b border-[#00e5ff]/15 pb-4"
                >
                  <Check className="h-4 w-4 shrink-0 text-[#00e5ff]" strokeWidth={3} />
                  <span className="text-sm font-medium text-white/90">{e}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton href="#contato" magneticStrength={0.3}>
                Trabalhe com quem entende
              </CtaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
