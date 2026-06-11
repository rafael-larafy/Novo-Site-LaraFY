"use client"

// COPY: claims pendentes de validação com a Larafy.

import { motion, useReducedMotion } from "framer-motion"
import { Crosshair, ShieldCheck, Zap } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"
import { GlassCard } from "@/components/ui/glass-card"
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

const BAR_HEIGHTS = [32, 50, 40, 84, 56, 72, 46, 94] as const
const HIGHLIGHT_BARS = new Set([3, 5, 7])

const DATA_ROWS = [
  { label: "Créditos identificados", value: "R$ 2.480.910" },
  { label: "Teses na camada legal", value: "12" },
  { label: "Cenários avaliados", value: "1,04 bi" },
  { label: "Tempo de processamento", value: "00:39:12" },
] as const

export function FunnelTecnologia() {
  const reduce = useReducedMotion()

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

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* ESQUERDA — copy + pilares */}
          <div>
            <SplitReveal
              as="h2"
              type="words"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
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
            <GlassCard glow="md" className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <MetaLabel>Motor de regras · Larafy</MetaLabel>
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full border border-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full border border-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00e5ff]" />
                </div>
              </div>

              <div className="mb-4 flex h-[130px] items-end gap-2" aria-hidden>
                {BAR_HEIGHTS.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.06,
                      ease: "easeOut",
                    }}
                    style={{ originY: 1, height: `${height}%` }}
                    className={`flex-1 rounded-t-md ${
                      HIGHLIGHT_BARS.has(i)
                        ? "bg-gradient-to-t from-[#00e5ff] to-[#00e5ff]/40"
                        : "bg-[#0d2a44]"
                    }`}
                  />
                ))}
              </div>

              <dl>
                {DATA_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b hairline py-2.5 text-sm last:border-b-0"
                  >
                    <dt className="text-white/55">{row.label}</dt>
                    <dd className="font-bold tabular-nums text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
