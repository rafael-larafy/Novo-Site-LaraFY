"use client"

import { motion } from "framer-motion"
import { Search, FileText, Scale, Users } from "lucide-react"
import { scrollViewport, scrollTransition, fadeUpVariants, staggerDelay } from "@/lib/scroll-motion"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassCard } from "@/components/ui/glass-card"
import { ShieldConstellation } from "@/components/shield-constellation"

const features = [
  {
    icon: Search,
    title: "Varredura Total",
    description:
      "Uma análise estratégica do seu histórico tributário, que transforma dados em oportunidades e orienta decisões com confiança.",
  },
  {
    icon: FileText,
    title: "Fundamentação Técnica",
    description: "Cada centavo recuperado possui lastro legal e documental.",
  },
  {
    icon: Scale,
    title: "Segurança Jurídica",
    description:
      "O raio-x que encontra oportunidades de recuperação administrativa e otimização de caixa que o seu ERP ignora.",
  },
  {
    icon: Users,
    title: "Inteligência Humana",
    description:
      "A nossa equipe humana, altamente especializada, analisa dados, traça estratégias, valida a tática e implementa ações, 100% baseados em inteligência e dados.",
  },
]

export function BlindagemSection() {
  return (
    <SectionShell bg="navy" diamond>
      <div className="relative mb-14 flex flex-col items-center">
        <ShieldConstellation className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <SectionHeading
          eyebrow="04 — Blindagem"
          eyebrowTone="cyan"
          title="O seu negócio é blindado em todos os cenários possíveis."
          align="center"
          className="relative"
          titleClassName="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(i + 1) }}
          >
            <GlassCard glow="sm" className="h-full p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#071a2e] shadow-[0_0_16px_rgba(0,229,255,0.22)] ring-1 ring-[#00e5ff]/35">
                <feature.icon className="h-6 w-6 text-[#9af2ff]" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold uppercase text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{feature.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
