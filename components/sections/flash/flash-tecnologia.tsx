"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion, useReducedMotion } from "framer-motion"
import { Crosshair, ShieldCheck, Zap } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
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

export function FlashTecnologia() {
  const reduce = useReducedMotion()

  return (
    <section id="tecnologia" className="bg-[#002e43] py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
                <span
                  className="h-[3px] w-6 rounded-full bg-[#07e0ff]"
                  aria-hidden
                />
                Conheça a tecnologia
              </p>
            </motion.div>

            <SplitReveal
              as="h2"
              type="words"
              className="mt-5 text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
            >
              O motor que faz em 40 minutos o que levaria semanas.
            </SplitReveal>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-5 max-w-xl leading-relaxed text-white/65"
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#07e0ff]"
                    aria-hidden
                  >
                    <pillar.icon
                      className="h-5 w-5 text-[#002e43]"
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
            className="rounded-[28px] bg-white p-6 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#002e43]/55">
                Motor de regras · Larafy
              </p>
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full border border-[#002e43]/20" />
                <span className="h-2.5 w-2.5 rounded-full border border-[#002e43]/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#07e0ff]" />
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
                      ? "bg-gradient-to-t from-[#07e0ff] to-[#07e0ff]/40"
                      : "bg-[#e4edf1]"
                  }`}
                />
              ))}
            </div>

            <dl>
              {DATA_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-[#002e43]/10 py-2.5 text-sm last:border-b-0"
                >
                  <dt className="text-[#002e43]/60">{row.label}</dt>
                  <dd className="font-extrabold tabular-nums text-[#002e43]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
