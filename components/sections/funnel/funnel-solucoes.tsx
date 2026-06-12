"use client"

// COPY: claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CircleDollarSign,
  Combine,
  FileSpreadsheet,
  Handshake,
  LineChart,
  Users,
  type LucideIcon,
} from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"

interface FeatureCard {
  id?: string
  icon: LucideIcon
  title: string
  text: string
  linkLabel: string
}

interface MiniCard {
  icon: LucideIcon
  title: string
  text: string
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: BarChart3,
    title: "Planejamento Tributário",
    text: "Redução da carga tributária e otimização da gestão fiscal da empresa.",
    linkLabel: "Conheça mais",
  },
  {
    icon: CircleDollarSign,
    title: "Recuperação de Créditos",
    text: "Identificação e restituição ou compensação de tributos pagos indevidamente ou a mais.",
    linkLabel: "Conheça mais",
  },
  {
    id: "reforma",
    icon: LineChart,
    title: "Estudo da Reforma Tributária",
    text: "Impactos relevantes no seu caixa durante a transição.",
    linkLabel: "Simular impacto",
  },
  {
    icon: Handshake,
    title: "Transação Tributária",
    text: "Negociação de dívida ativa na União.",
    linkLabel: "Conheça mais",
  },
]

const MINI_CARDS: MiniCard[] = [
  {
    icon: FileSpreadsheet,
    title: "Contabilidade Premium",
    text: "Especialistas em operações complexas no Lucro Real e Presumido.",
  },
  {
    icon: Combine,
    title: "M&A (Mergers and Acquisitions)",
    text: "Fusão, aquisição ou incorporação de empresas para expansão, reestruturação ou ganho de mercado.",
  },
  {
    icon: Building2,
    title: "Holding Patrimonial",
    text: "Proteção do seu CNPJ e CPF.",
  },
  {
    icon: Users,
    title: "Folha de Pagamento",
    text: "Levantamento de informações e processamento da folha até a apuração de encargos e envio das obrigações legais.",
  },
]

export function FunnelSolucoes() {
  return (
    <section
      id="solucoes"
      className="relative overflow-hidden bg-[#04101f] text-white"
    >
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">03 — Soluções</MetaLabel>
          <MetaLabel className="hidden sm:block">
            do crédito ao patrimônio
          </MetaLabel>
        </div>

        <div className="mt-10 max-w-[760px]">
          <SplitReveal
            as="h2"
            type="words"
            className="font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
          >
            A revolução tributária que o seu negócio merece
          </SplitReveal>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            className="mt-6 max-w-[560px] text-base leading-relaxed text-white/60"
          >
            Tudo o que uma empresa do Lucro Real precisa, sob um só teto, com a
            mesma precisão de dados.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                id={card.id}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                className="flex flex-col overflow-hidden rounded-2xl border hairline bg-[#061425]/60 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/35"
              >
                <div
                  className="relative grid h-[160px] place-items-center overflow-hidden"
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00e5ff]/20" />
                  <span className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00e5ff]/20" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[#00e5ff]/12">
                    <Icon
                      className="h-[30px] w-[30px] text-[#00e5ff]"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {card.text}
                  </p>
                  <a
                    href="#contato"
                    className="group/link mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#00e5ff]"
                  >
                    {card.linkLabel}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MINI_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                className="rounded-xl border hairline bg-[#061425]/40 p-5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/35"
              >
                <span
                  className="grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#00e5ff]/12"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-[#00e5ff]" strokeWidth={1.75} />
                </span>
                <h4 className="mt-3.5 text-sm font-bold text-white">
                  {card.title}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">
                  {card.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
