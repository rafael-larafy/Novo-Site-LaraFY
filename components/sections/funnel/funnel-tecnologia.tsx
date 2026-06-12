"use client"

// COPY: claims pendentes de validação com a Larafy.

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"

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

interface Step {
  n: string
  title: string
  tagline: string
  text: string
  note?: string
}

const STEPS: Step[] = [
  {
    n: "Etapa 1",
    title: "Diagnóstico tributário estratégico",
    tagline: "Diagnóstico profundo. Custo zero.",
    text: "Cruzamos dados em um motor com mais de 2,1 bilhões de cenários tributários para gerar um diagnóstico prévio que orienta estrategicamente nossos especialistas.",
  },
  {
    n: "Etapa 2",
    title: "Apresentação das oportunidades",
    tagline: "Menos imposto. Mais caixa.",
    text: "Receba um estudo detalhado de oportunidades de recuperação tributária com um planejamento estratégico sob medida para reduzir os seus impostos.",
  },
  {
    n: "Etapa 3",
    title: "Execução orientada",
    tagline: "Sem ganho, sem remuneração.",
    text: "A LaraFy é remunerada somente quando a recuperação de créditos e o planejamento tributário geram impactos no caixa da sua empresa.",
  },
  {
    n: "Etapa 4",
    title: "Estruturação contábil",
    tagline: "Lucro com blindagem.",
    text: "Receba uma reestruturação contábil do seu negócio para garantir máxima segurança, conformidade e sustentabilidade dos resultados a longo prazo.",
    note: "Essa etapa é conduzida como um projeto independente, com contratação específica e honorários definidos conforme o nível de complexidade e os objetivos estratégicos traçados em conjunto com o cliente, sempre com foco em performance, segurança jurídica e eficiência tributária.",
  },
  {
    n: "Etapa 5",
    title: "Expansão e proteção patrimonial",
    tagline: "Patrimônio protegido. Crescimento planejado.",
    text: "Receba projetos de alto impacto e geração de patrimônio a longo prazo, como estruturação de holding patrimonial para proteção e eficiência fiscal, e transação tributária estratégica e negociação inteligente de débitos fiscais.",
  },
]

export function FunnelTecnologia() {
  const [open, setOpen] = useState<number | null>(0)

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

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SplitReveal
              as="h2"
              type="words"
              className="font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-white text-balance"
            >
              O método que supera todos os obstáculos tributários
            </SplitReveal>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-6 max-w-xl leading-relaxed text-white/65"
            >
              Da primeira análise à proteção do patrimônio, cada etapa é guiada por
              dado real — neuroautomação + IA fazem o braçal; nossos especialistas
              fazem a estratégia.
            </motion.p>

            <ul className="mt-10 space-y-3">
              {STEPS.map((step, i) => {
                const isOpen = open === i
                return (
                  <motion.li
                    key={step.n}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                    className={`overflow-hidden rounded-xl border bg-[#04101f]/60 transition-colors duration-300 ${
                      isOpen ? "border-[#00e5ff]/40" : "hairline"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#0a1f33]/40"
                    >
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#00e5ff]">
                        {step.n}
                      </span>
                      <span className="flex-1 text-[15px] font-bold leading-snug text-white">
                        {step.title}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-[#00e5ff] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <p className="text-sm font-semibold text-[#00e5ff]">
                              {step.tagline}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-white/65">
                              {step.text}
                            </p>
                            {step.note && (
                              <p className="mt-3 border-t hairline pt-3 text-xs leading-relaxed text-white/45">
                                * {step.note}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
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
            className="lg:sticky lg:top-28"
          >
            <BaixaAutomatica className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
