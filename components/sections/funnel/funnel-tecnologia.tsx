"use client"

// COPY: claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { Crosshair, ShieldCheck, Zap } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"
import { BaixaAutomatica } from "@/components/sections/funnel/baixa-automatica"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  slideRightVariants,
  staggerDelay,
} from "@/lib/scroll-motion"

const PILLARS = [
  {
    icon: Crosshair,
    title: "Precisão",
    text: "Dado real da sua operação, não estimativa de mercado.",
  },
  {
    icon: Zap,
    title: "Velocidade",
    text: "5 anos de apuração lidos e cruzados em 40 minutos.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    text: "Compliance e respaldo em cada tese, do crédito à decisão.",
  },
] as const

export function FunnelTecnologia() {
  return (
    <section
      id="tecnologia"
      className="relative overflow-hidden bg-[#061425] text-white"
    >
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">04 — Tecnologia / Método</MetaLabel>
          <MetaLabel className="hidden sm:block">O motor Larafy</MetaLabel>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ESQUERDA — copy + pilares */}
          <div>
            <SplitReveal
              as="h2"
              type="words"
              className="font-display text-[clamp(1.7rem,4vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
            >
              O motor que faz em 40 minutos o que levaria semanas.
            </SplitReveal>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-6 max-w-xl leading-relaxed text-white/65"
            >
              Somos a única consultoria tributária com tecnologia desenvolvida
              internamente: neuroautomação + IA, com mais de 1 bilhão de
              cenários. A máquina faz o braçal; nossos especialistas fazem a
              estratégia.
            </motion.p>

            <ul className="mt-10 space-y-7">
              {PILLARS.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                  className="flex gap-4"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#00e5ff]/12"
                    aria-hidden
                  >
                    <pillar.icon
                      className="h-5 w-5 text-[#00e5ff]"
                      strokeWidth={2.2}
                    />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {pillar.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(3) }}
              className="mt-8"
            >
              <CtaButton href="#contato">Ver o diagnóstico na prática</CtaButton>
            </motion.div>
          </div>

          {/* DIREITA — dashboard mock */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <BaixaAutomatica className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
