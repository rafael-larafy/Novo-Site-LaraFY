"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  slideRightVariants,
  scaleVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { SplitReveal } from "@/components/split-reveal"
import { BrokenNetwork } from "@/components/broken-network"
import { MetaLabel, HudGrid, HudCorners } from "@/components/ui/editorial"

const ENTREGAVEIS = [
  "Análises pontuais",
  "Amostragens",
  "Cruzamentos manuais",
  "Teses genéricas",
  "Planilhas",
]

export function ReformaTributariaSection() {
  return (
    <section className="relative overflow-hidden bg-[#04101f] text-white">
      <HudGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* cabeçalho com índice */}
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">02 — O problema</MetaLabel>
          <MetaLabel className="hidden sm:block">O jeito tradicional</MetaLabel>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* ESQUERDA — headline + readout */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={slideRightVariants}
              transition={scrollTransition}
            >
              <SplitReveal
                as="h2"
                className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
              >
                Medo de perder dinheiro com a Reforma Tributária?
              </SplitReveal>
            </motion.div>

            <motion.p
              className="mt-7 max-w-md text-white/55"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Se o seu projeto tributário ainda te entrega apenas isto:
            </motion.p>

            {/* readout estilo terminal dos entregáveis fracos */}
            <motion.ol
              className="mt-8 max-w-md"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              {ENTREGAVEIS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-t hairline py-4 last:border-b"
                >
                  <span className="font-mono text-xs text-[#00e5ff]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-medium uppercase tracking-wide text-white/90">
                    {item}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5d5d]" />
                    <MetaLabel className="text-[#ff8a8a]">Limitado</MetaLabel>
                  </span>
                </li>
              ))}
            </motion.ol>

            <motion.p
              className="mt-8 max-w-md text-lg font-semibold text-white"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(3) }}
            >
              …prepare-se para a{" "}
              <span className="text-[#00e5ff]">Reforma Tributária</span> engolir o seu
              negócio.
            </motion.p>
          </div>

          {/* DIREITA — rede quebrada em moldura HUD */}
          <motion.div
            className="relative self-center"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={scaleVariants}
            transition={scrollTransition}
          >
            <div className="relative mx-auto w-full max-w-[480px] border hairline p-5">
              <HudCorners />
              <BrokenNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
