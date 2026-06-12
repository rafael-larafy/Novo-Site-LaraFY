"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"

interface ComparativoRow {
  criterio: string
  tradicional: string
  larafy: string
}

const ROWS: ComparativoRow[] = [
  {
    criterio: "Base da análise",
    tradicional: "Experiência do consultor",
    larafy: "Dado real da empresa + 1 bi de cenários",
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
    tradicional: "Relacionamento próximo de longa data",
    larafy: "Contabilidade premium contínua + monitoramento",
  },
]

export function FlashComparativo() {
  return (
    <section className="bg-[#eef3f6] py-16 [content-visibility:auto] [contain-intrinsic-size:auto_700px] lg:py-28">
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
            Por que a LaraFy
          </motion.p>
          <SplitReveal
            as="h2"
            type="words"
            className="mt-4 text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            O que muda quando a análise nasce de dado.
          </SplitReveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
          className="mt-12 overflow-hidden rounded-[28px] border border-[#002e43]/10 bg-white shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Comparativo entre consultoria tradicional e LaraFy
              </caption>
              <thead>
                <tr className="border-b border-[#002e43]/10">
                  <th
                    scope="col"
                    className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#002e43]/65"
                  >
                    Critério
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#002e43]/65"
                  >
                    Consultoria tradicional
                  </th>
                  <th
                    scope="col"
                    className="bg-[#002e43] px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#07e0ff]"
                  >
                    LaraFy
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.criterio}
                    className="border-b border-[#002e43]/10 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-left text-sm font-bold text-[#002e43]"
                    >
                      {row.criterio}
                    </th>
                    <td className="px-5 py-4 text-sm text-[#002e43]/55">
                      {row.tradicional}
                    </td>
                    <td className="bg-[#002e43] px-5 py-4 text-sm font-bold text-white">
                      <span className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#07e0ff]"
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
          transition={{ ...scrollTransition, delay: staggerDelay(1) }}
          className="mt-8 text-center"
        >
          <CtaButton href="#contato">Agendar diagnóstico gratuito</CtaButton>
        </motion.div>
      </div>
    </section>
  )
}
