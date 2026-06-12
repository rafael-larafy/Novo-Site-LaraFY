"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Building2,
  CircleDollarSign,
  FileSpreadsheet,
  LineChart,
  Users,
  type LucideIcon,
} from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
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
    icon: CircleDollarSign,
    title: "Recuperação de Créditos",
    text: "Auditamos 5 anos de apuração e transformamos créditos legítimos em caixa — só o que a lei e o dado garantem.",
    linkLabel: "Conheça mais",
  },
  {
    icon: BarChart3,
    title: "Planejamento Tributário",
    text: "Pague o justo, nem um real a mais. Reduzimos a carga sobre a operação real, com previsibilidade.",
    linkLabel: "Conheça mais",
  },
  {
    id: "reforma",
    icon: LineChart,
    title: "Reforma Tributária",
    text: "Simulador que projeta o impacto sobre os seus dados reais, ano a ano da transição. Estudo concreto, não achismo.",
    linkLabel: "Simular impacto",
  },
]

const MINI_CARDS: MiniCard[] = [
  {
    icon: FileSpreadsheet,
    title: "Contabilidade Premium",
    text: "Especialista no Lucro Real.",
  },
  {
    icon: Users,
    title: "Folha de Pagamento",
    text: "Precisão rubrica a rubrica.",
  },
  {
    icon: Building2,
    title: "Holding Patrimonial",
    text: "Proteção e sucessão com dado.",
  },
  {
    icon: ArrowLeftRight,
    title: "M&A",
    text: "Due diligence fiscal de precisão.",
  },
]

export function FlashSolucoes() {
  return (
    <section id="solucoes" className="bg-[#eef3f6] py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
            className="inline-flex items-center justify-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]"
          >
            <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
            Conheça nossas soluções
          </motion.p>
          <SplitReveal
            as="h2"
            type="words"
            className="mt-4 text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            Blindagem completa, do crédito ao patrimônio.
          </SplitReveal>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            className="mt-4 leading-relaxed text-[#002e43]/65"
          >
            Tudo o que uma empresa do Lucro Real precisa, sob um só teto, com a
            mesma precisão de dados.
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
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
                className="flex flex-col overflow-hidden rounded-[28px] border border-[#002e43]/10 bg-white shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)]"
              >
                <div
                  className="relative grid h-[188px] place-items-center overflow-hidden bg-gradient-to-br from-[#002e43] to-[#013d57]"
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07e0ff]/25" />
                  <span className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07e0ff]/25" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-[20px] bg-[#07e0ff] shadow-[0_12px_30px_-8px_rgba(7,224,255,0.45)]">
                    <Icon className="h-8 w-8 text-[#002e43]" strokeWidth={2} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="text-xl font-extrabold text-[#002e43]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#002e43]/65">
                    {card.text}
                  </p>
                  <a
                    href="#contato"
                    className="group/link mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-[#002e43]"
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
                className="rounded-2xl border border-[#002e43]/10 bg-white p-5 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)]"
              >
                <span
                  className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-[#07e0ff]/15"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-[#002e43]" strokeWidth={2} />
                </span>
                <h4 className="mt-3.5 font-bold text-[#002e43]">{card.title}</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-[#002e43]/60">
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
