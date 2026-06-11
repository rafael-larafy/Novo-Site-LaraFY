"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  scaleVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { ConstellationField } from "@/components/constellation-field"
import { MetaLabel, HudGrid, HudCorners } from "@/components/ui/editorial"

export function DiagnosticoSection() {
  return (
    <section className="relative overflow-hidden bg-[#020a14] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        <motion.div
          className="relative mx-auto max-w-4xl border hairline bg-[#04101f]/60 p-8 text-center lg:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
        >
          <HudCorners />
          <ConstellationField
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-20"
            count={6}
            radius={36}
          />

          <div className="relative z-10">
            <MetaLabel className="text-[#00e5ff]">10 — Diagnóstico estratégico</MetaLabel>

            <SplitReveal
              as="h2"
              type="words"
              className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
            >
              Tributo não é despesa. É estratégia.
            </SplitReveal>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-white/60"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Solicite um diagnóstico e entenda, com profundidade, como sua empresa
              pode operar com mais eficiência, segurança e previsibilidade de caixa.
            </motion.p>

            {/* prompt de terminal */}
            <motion.div
              className="mt-10 inline-flex flex-col items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              <span className="font-mono text-sm text-[#5f86a6]">
                <span className="text-[#00e5ff]">&gt;</span> solicitar_diagnostico
                <span className="ml-1 inline-block h-4 w-2 translate-y-[3px] animate-pulse bg-[#00e5ff]" />
              </span>
              <CtaButton href="#contato" magneticStrength={0.4}>
                Solicitar diagnóstico estratégico
              </CtaButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
