"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Clock, TrendingUp } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"

interface ImpactoCard {
  icon: typeof TrendingUp
  value: string
  title: string
  description: string
  linkLabel: string
  linkAriaLabel: string
}

const CARDS: ImpactoCard[] = [
  {
    icon: TrendingUp,
    value: "R$ 4,2 mi",
    title: "Recuperados em uma indústria",
    description:
      "Em créditos de PIS/COFINS sobre insumos — sobre o dado, não sobre média.",
    linkLabel: "Ver case",
    linkAriaLabel:
      "Ver case: R$ 4,2 milhões recuperados em créditos de PIS/COFINS em uma indústria",
  },
  {
    icon: BarChart3,
    value: "18%",
    title: "De redução de carga",
    description:
      "Após o planejamento integrado em uma empresa de comércio do Lucro Real.",
    linkLabel: "Ver case",
    linkAriaLabel:
      "Ver case: 18% de redução de carga tributária em empresa de comércio do Lucro Real",
  },
  {
    icon: Clock,
    value: "40 min",
    title: "Do upload ao primeiro insight",
    description:
      "O diagnóstico que outras consultorias levam semanas para entregar.",
    linkLabel: "Como funciona",
    linkAriaLabel: "Como funciona o diagnóstico em 40 minutos",
  },
]

export function FlashImpacto() {
  return (
    <section id="impacto" className="bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
            className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]"
          >
            <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
            O impacto da LaraFy
          </motion.p>

          <SplitReveal
            as="h2"
            type="words"
            className="mt-4 text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            Quem confia na LaraFy, vê resultado no caixa.
          </SplitReveal>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            className="mx-auto mt-5 max-w-xl leading-relaxed text-[#002e43]/65"
          >
            Precisão que não fica no relatório — aparece no fluxo de caixa e na
            tranquilidade fiscal.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                className="flex flex-col rounded-[28px] border border-[#002e43]/10 bg-white p-7 shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)]"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07e0ff]/15"
                  aria-hidden
                >
                  <Icon className="h-6 w-6 text-[#002e43]" strokeWidth={2.25} />
                </div>

                <p className="mt-5 text-[2.3rem] font-black leading-none tracking-[-0.03em] text-[#002e43] tabular-nums">
                  {card.value}
                </p>

                <h3 className="mt-3 text-base font-extrabold text-[#002e43]">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#002e43]/60">
                  {card.description}
                </p>

                <a
                  href="#contato"
                  aria-label={card.linkAriaLabel}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-[#002e43]"
                >
                  {card.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </motion.article>
            )
          })}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(3) }}
          className="mt-6 text-center text-xs text-[#002e43]/45"
        >
          Valores ilustrativos para demonstração.
        </motion.p>
      </div>
    </section>
  )
}
