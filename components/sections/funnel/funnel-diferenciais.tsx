"use client"

// COPY: claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { BarChart3, Check, Clock, TrendingUp } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { HudGrid, MetaLabel } from "@/components/ui/editorial"
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
}

const CARDS: ImpactoCard[] = [
  {
    icon: TrendingUp,
    value: "R$ 4,2 mi",
    title: "Recuperados em uma indústria",
    description:
      "Em créditos de PIS/COFINS sobre insumos — sobre o dado, não sobre média.",
  },
  {
    icon: BarChart3,
    value: "18%",
    title: "De redução de carga",
    description:
      "Após o planejamento integrado em uma empresa de comércio do Lucro Real.",
  },
  {
    icon: Clock,
    value: "40 min",
    title: "Do upload ao primeiro insight",
    description:
      "O diagnóstico que outras consultorias levam semanas para entregar.",
  },
]

interface ComparativoRow {
  criterio: string
  tradicional: string
  larafy: string
}

const ROWS: ComparativoRow[] = [
  {
    criterio: "Base da análise",
    tradicional: "Experiência do consultor",
    larafy: "Dado real + 1 bi de cenários",
  },
  {
    criterio: "Tempo de diagnóstico",
    tradicional: "Semanas de trabalho manual",
    larafy: "40 minutos",
  },
  {
    criterio: "Especialização",
    tradicional: "Generalista",
    larafy: "Lucro Real e Presumido",
  },
  {
    criterio: "Segurança",
    tradicional: "Depende do profissional",
    larafy: "Apólice R$ 10 mi + CRC-PR",
  },
  {
    criterio: "Depois da entrega",
    tradicional: "Relacionamento de longa data",
    larafy: "Contabilidade premium contínua + monitoramento",
  },
]

export function FunnelDiferenciais() {
  return (
    <section
      id="impacto"
      className="relative overflow-hidden bg-[#04101f] text-white"
    >
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
          className="flex items-center justify-between border-t hairline pt-6"
        >
          <MetaLabel className="text-[#00e5ff]">05 — Diferenciais</MetaLabel>
          <MetaLabel className="hidden sm:block">o impacto da LaraFy</MetaLabel>
        </motion.div>

        
        <div className="mt-10 max-w-3xl">
          <SplitReveal
            as="h2"
            type="words"
            className="font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
          >
            Quem confia na LaraFy, vê resultado no caixa.
          </SplitReveal>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            Precisão que não fica no relatório — aparece no fluxo de caixa e na
            tranquilidade fiscal.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
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
                className="flex flex-col rounded-2xl border hairline bg-[#061425]/60 p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/35"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl bg-[#00e5ff]/12"
                  aria-hidden
                >
                  <Icon className="h-6 w-6 text-[#00e5ff]" strokeWidth={2.25} />
                </div>

                <p className="mt-5 font-display text-[2.3rem] font-bold leading-none tracking-[-0.03em] text-[#00e5ff] tabular-nums">
                  {card.value}
                </p>

                <h4 className="mt-3 text-base font-bold text-white">
                  {card.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {card.description}
                </p>
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
          className="mt-5 text-center text-xs text-white/60"
        >
          Valores ilustrativos para demonstração.
        </motion.p>

        
        <div className="mt-16 lg:mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
          >
            <MetaLabel className="text-[#00e5ff]">Por que a Larafy</MetaLabel>
            <SplitReveal
              as="h3"
              type="words"
              className="mt-4 max-w-5xl font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
            >
              Quantas oportunidades tributárias você perde sem olhar para os dados
            </SplitReveal>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            className="mt-10 overflow-hidden rounded-2xl border hairline"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  Comparativo entre consultoria tradicional e LaraFy
                </caption>
                <thead>
                  <tr className="border-b hairline">
                    <th
                      scope="col"
                      className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white/55"
                    >
                      Critério
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white/55"
                    >
                      Consultoria tradicional
                    </th>
                    <th
                      scope="col"
                      className="bg-[#00e5ff]/10 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#00e5ff]"
                    >
                      LaraFy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.criterio}
                      className="border-b hairline last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-left text-sm font-bold text-white"
                      >
                        {row.criterio}
                      </th>
                      <td className="px-5 py-4 text-sm text-white/55">
                        {row.tradicional}
                      </td>
                      <td className="bg-[#00e5ff]/10 px-5 py-4 text-sm font-bold text-white">
                        <span className="flex items-start gap-2">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#00e5ff]"
                            aria-hidden
                          />
                          {row.larafy}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            className="mt-8 text-center"
          >
            <CtaButton href="#contato">Agendar diagnóstico gratuito</CtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
