"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { ConstellationField } from "@/components/constellation-field"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"

function Metric({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col justify-between border hairline bg-[#061425]/50 p-6 lg:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUpVariants}
      transition={{ ...scrollTransition, delay: staggerDelay(delay) }}
    >
      <MetaLabel className="text-[#5f86a6]">{label}</MetaLabel>
      <span className="mt-6 font-display text-5xl font-bold leading-none text-[#00e5ff] lg:text-6xl">
        {value}
      </span>
    </motion.div>
  )
}

export function ConfiancaSection() {
  return (
    <section id="confianca" className="relative overflow-hidden bg-[#04101f] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">08 — Quem cuida do seu dinheiro</MetaLabel>
          <MetaLabel className="hidden sm:block">Track record</MetaLabel>
        </div>

        
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[minmax(150px,1fr)]">
          
          <motion.div
            className="relative col-span-2 overflow-hidden border hairline bg-[#061425]/60 p-8 lg:row-span-2 lg:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
          >
            <ConstellationField
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-30"
              count={6}
              radius={34}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <SplitReveal
                as="h2"
                type="words"
                className="font-display text-2xl font-bold uppercase leading-[1.02] tracking-[-0.01em] text-white text-balance sm:text-3xl lg:text-4xl"
              >
                Uma das consultorias mais tecnológicas (e humanas) do Brasil.
              </SplitReveal>
              <p className="text-white/55">
                Escala tecnológica com cultura de excelência.
              </p>
            </div>
          </motion.div>

          <Metric value="+5" label="Anos de mercado" delay={1} />
          <Metric value="+100" label="Especialistas" delay={2} />

          
          <motion.div
            className="flex flex-col justify-between border hairline bg-[#061425]/50 p-6 lg:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(3) }}
          >
            <MetaLabel className="text-[#00e5ff]">Certificada</MetaLabel>
            <div className="mt-6">
              <span className="font-display text-3xl font-bold text-white lg:text-4xl">GPTW</span>
              <p className="mt-1 text-xs text-white/50">Great Place to Work</p>
            </div>
          </motion.div>

          
          <motion.div
            className="flex flex-col justify-center border hairline bg-[#061425]/50 p-6 lg:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(4) }}
          >
            <MetaLabel className="text-[#5f86a6]">Plataforma</MetaLabel>
            <p className="mt-3 font-display text-base font-bold uppercase leading-tight text-white">
              Tecnologia própria e exclusiva, a mais poderosa do mercado.
            </p>
          </motion.div>

          
          <motion.div
            className="col-span-2 flex flex-col justify-center border hairline bg-[#061425]/50 p-6 lg:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(5) }}
          >
            <MetaLabel className="text-[#5f86a6]">Cultura</MetaLabel>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-xl font-bold uppercase text-white lg:text-2xl">
              <span>Precisão</span>
              <span className="text-[#00e5ff]">/</span>
              <span>Ética</span>
              <span className="text-[#00e5ff]">/</span>
              <span>Resultado</span>
            </div>
          </motion.div>

          
          <motion.div
            className="col-span-2 flex flex-col items-start justify-center gap-5 border hairline bg-[#061b2e] p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(6) }}
          >
            <p className="max-w-xs font-display text-base font-bold uppercase leading-tight text-white">
              Confiança se conquista com seriedade e eficiência.
            </p>
            <CtaButton href="#contato" magneticStrength={0.3}>
              Fale com a Larafy
            </CtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
