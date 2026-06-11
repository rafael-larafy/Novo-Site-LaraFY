"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { motion } from "framer-motion"
import { Landmark, Lock, Scale, ShieldCheck, type LucideIcon } from "lucide-react"

import { SplitReveal } from "@/components/split-reveal"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"

interface Selo {
  icon: LucideIcon
  label: string
}

const SELOS: Selo[] = [
  { icon: ShieldCheck, label: "Apólice R$ 10 mi" },
  { icon: Landmark, label: "Parceiro CRC-PR" },
  { icon: Lock, label: "Dados isolados · LGPD" },
  { icon: Scale, label: "Respaldo jurídico" },
]

export function FlashSeguranca() {
  return (
    <section
      id="seguranca"
      className="bg-white py-16 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:auto_600px]"
      aria-label="Blindagem e segurança"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="relative overflow-hidden rounded-[28px] bg-[#002e43] px-6 py-12 text-center shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] lg:p-16">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 24px, rgba(255,255,255,0.05) 24px 25px)",
              maskImage:
                "radial-gradient(circle at 50% 30%, black, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 30%, black, transparent 65%)",
            }}
          />

          <div className="relative">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
              className="inline-flex items-center justify-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white"
            >
              <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
              Blindagem
            </motion.p>

            <SplitReveal
              as="h2"
              type="words"
              className="mx-auto mt-4 max-w-[20ch] text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
            >
              A única consultoria com apólice de{" "}
              <span className="text-[#07e0ff]">R$ 10 milhões</span>. Que nunca
              precisou ser usada.
            </SplitReveal>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mx-auto mt-5 max-w-[54ch] leading-relaxed text-white/65"
            >
              A precisão é tão alta que o seguro é só uma camada extra. Seus
              dados ficam em ambiente isolado, tratados conforme a LGPD, e cada
              tese tem base legal e respaldo documental — sua decisão fica
              garantida por dado, por tese e por apólice.
            </motion.p>

            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {SELOS.map((selo, i) => {
                const Icon = selo.icon
                return (
                  <motion.li
                    key={selo.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white"
                  >
                    <Icon className="h-4 w-4 text-[#07e0ff]" aria-hidden />
                    {selo.label}
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
