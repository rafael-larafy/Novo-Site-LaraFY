"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  scaleVariants,
  slideLeftVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { ZeroShield } from "@/components/zero-shield"
import { MetaLabel, HudGrid, HudCorners } from "@/components/ui/editorial"

export function ZeroRiscoSection() {
  return (
    <section className="relative overflow-hidden bg-[#061425] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">06 — Garantia Larafy</MetaLabel>
          <MetaLabel className="hidden items-center gap-2 text-[#5f86a6] sm:inline-flex">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff]" />
            Garantia ativa
          </MetaLabel>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* esquerda — ZERO gigante vazado + cláusula */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <span className="text-outline pointer-events-none block font-display text-[clamp(5.5rem,20vw,15rem)] font-bold leading-[0.78] tracking-[-0.04em]">
              ZERO
            </span>
            <SplitReveal
              as="h2"
              type="words"
              className="font-display text-[clamp(1.4rem,3.5vw,2.75rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-white"
            >
              risco de investir sem retorno
            </SplitReveal>

            {/* cláusula tipo contrato */}
            <motion.div
              className="mt-10 max-w-lg border-l-2 border-[#00e5ff] bg-[#04101f]/60 p-6"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              <MetaLabel className="text-[#5f86a6]">Cláusula 01 — Garantia</MetaLabel>
              <p className="mt-3 text-lg leading-relaxed text-white lg:text-xl">
                Não encontramos oportunidades reais e seguras para o seu negócio?{" "}
                <span className="text-[#00e5ff]">Você não paga nada por isso.</span>
              </p>
            </motion.div>

            <motion.p
              className="mt-8 max-w-md font-display text-base font-bold uppercase leading-tight tracking-tight text-white/80"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Recuperar o passado é obrigação. Planejar o futuro é vantagem competitiva.
            </motion.p>

            <div className="mt-10">
              <CtaButton href="#contato">
                Simule os impactos da Reforma Tributária
              </CtaButton>
            </div>
          </motion.div>

          {/* direita — escudo em moldura HUD */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={scaleVariants}
            transition={scrollTransition}
          >
            <div className="relative mx-auto w-full max-w-[420px] border hairline p-8">
              <HudCorners />
              <ZeroShield />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
