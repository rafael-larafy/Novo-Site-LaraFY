"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { BarChart3, Clock, Layers, ShieldCheck, type LucideIcon } from "lucide-react"

import { CountUp } from "@/components/sections/flash/count-up"
import { fadeUpVariants, scrollTransition, scrollViewport, staggerDelay } from "@/lib/scroll-motion"

interface Stat {
  icon: LucideIcon
  value: ReactNode
  subline?: string
  label: string
}

const STATS: Stat[] = [
  {
    icon: Clock,
    value: <CountUp to={40} suffix=" min" />,
    label: "para analisar 5 anos de apuração",
  },
  {
    icon: Layers,
    value: "+1 bi",
    label: "cenários no motor de regras",
  },
  {
    icon: BarChart3,
    value: <CountUp to={300} prefix="+" />,
    label: "empresas high-ticket blindadas",
  },
  {
    icon: ShieldCheck,
    value: "R$ 10 mi",
    subline: "apólice nunca acionada",
    label: "de seguro de responsabilidade",
  },
]

export function FlashStatBand() {
  return (
    <section className="bg-white py-6 lg:py-10" aria-label="Larafy em números">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <ul className="grid grid-cols-2 gap-8 rounded-[28px] bg-[#002e43] p-8 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] lg:grid-cols-4 lg:p-12">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.li
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(i) }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-[#07e0ff]/15"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-[#07e0ff]" />
                </span>
                <p className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-black leading-none tracking-[-0.02em] text-white tabular-nums">
                  {stat.value}
                </p>
                {stat.subline && (
                  <p className="mt-1.5 text-xs font-bold text-[#07e0ff]">{stat.subline}</p>
                )}
                <p className="mt-2 text-sm text-white/65">{stat.label}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
