"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { Plus } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
} from "@/lib/scroll-motion"

const FAQS: { q: string; a: string }[] = [
  {
    q: "Como vocês analisam 5 anos em 40 minutos?",
    a: "Nossa tecnologia própria lê SPED, NF-e, folha e obrigações acessórias e cruza tudo com um motor de mais de 1 bilhão de cenários tributários. O que tomaria semanas de planilha vira minutos — e a equipe foca na análise estratégica.",
  },
  {
    q: "Para quem é a LaraFy?",
    a: "Para empresas do Lucro Real e Presumido, de médio e grande porte. Somos especialistas justamente no regime mais complexo do Brasil — onde a precisão faz mais diferença.",
  },
  {
    q: "Vocês só recuperam crédito?",
    a: "Não. Entregamos recuperação de créditos, planejamento tributário, estudo da reforma, contabilidade premium, folha, holding patrimonial e M&A — toda a blindagem fiscal sob um só teto.",
  },
  {
    q: "Meus dados fiscais ficam seguros?",
    a: "Sim. Seus dados são tratados em ambiente isolado, conforme a LGPD, usados exclusivamente para a análise contratada — e cada tese aplicada tem base legal documentada.",
  },
  {
    q: "O que é a apólice de R$ 10 milhões?",
    a: "Um seguro de responsabilidade que cobre eventuais erros na execução do trabalho. Nunca foi acionada — é uma camada extra de segurança sobre uma precisão que já nasce do dado.",
  },
]

/**
 * Seção de FAQ do design Flash.
 * Usa <details>/<summary> nativos (acessível sem JS e indexável) com o
 * atributo `name` compartilhado — o navegador mantém apenas um item aberto
 * por vez. JSON-LD FAQPage espelha exatamente o texto visível.
 */
export function FlashFaq() {
  return (
    <section
      id="faq"
      className="bg-[#eef3f6] py-16 [content-visibility:auto] [contain-intrinsic-size:auto_800px] lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="mb-10 text-center lg:mb-14">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
            className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]"
          >
            <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
            Dúvidas frequentes
          </motion.p>
          <SplitReveal
            as="h2"
            type="words"
            className="mt-4 text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            Ficou com alguma dúvida?
          </SplitReveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
          className="mx-auto max-w-[820px]"
        >
          {FAQS.map((faq, index) => (
            <details
              key={faq.q}
              name="faq-larafy"
              open={index === 0}
              className="group mb-3 overflow-hidden rounded-2xl border border-[#002e43]/10 bg-white open:shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold text-[#002e43] [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#07e0ff] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  <Plus className="h-4 w-4 text-[#002e43]" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-[#002e43]/65">
                {faq.a}
              </p>
            </details>
          ))}
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  )
}
