"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  slideLeftVariants,
  scaleVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { CeoPortrait } from "@/components/ceo-portrait"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"

export function CeoSection() {
  return (
    <section className="relative overflow-hidden bg-[#050d18] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">03 — Tecnologia + humanidade</MetaLabel>
          <MetaLabel className="hidden sm:block">O diferencial</MetaLabel>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          
          <motion.div
            className="relative order-1 mx-auto w-full max-w-[360px]"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={scaleVariants}
            transition={scrollTransition}
          >
            <CeoPortrait />
          </motion.div>

          
          <motion.div
            className="order-2"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <span className="font-display text-7xl leading-none text-[#00e5ff]/40">“</span>
            <SplitReveal
              as="h2"
              type="words"
              className="-mt-6 font-display text-[2.75rem] font-bold uppercase leading-[1.02] tracking-[-0.01em] text-white text-balance"
            >
              A linha tênue entre o erro e o acerto está em como foi analisado.
            </SplitReveal>

            <motion.div
              className="mt-9 flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              <p className="max-w-lg text-white/60">
                Com tecnologia e método exclusivos, a Larafy transforma dado em decisão
                — e decisão em lucro.
              </p>
              <CtaButton href="#contato" wrapperClassName="self-start">
                Solicitar diagnóstico estratégico
              </CtaButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
