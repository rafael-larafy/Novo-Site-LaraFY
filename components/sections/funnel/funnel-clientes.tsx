"use client"

// COPY: claims pendentes de validação com a Larafy.

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Marquee } from "@/components/marquee"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"
import { SplitReveal } from "@/components/split-reveal"
import {
  fadeUpVariants,
  scaleVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"

interface Logo {
  src: string
  alt: string
}

const LOGOS: Logo[] = [
  { src: "/Luson.png", alt: "Luson" },
  { src: "/Pinfer.png", alt: "Pinfer" },
  { src: "/Zanette.png", alt: "Zanette" },
  { src: "/Calcario.png", alt: "Calcário" },
  { src: "/Kapazi.png", alt: "Kapazi" },
  { src: "/CargoSoft.png", alt: "Cargo Soft" },
]

// Duas linhas com empresas DISTINTAS (sem repetição entre as linhas).
const ROW1: Logo[] = LOGOS.slice(0, 3)
const ROW2: Logo[] = LOGOS.slice(3)

const PARTNERS: { key: string; label: ReactNode }[] = [
  {
    key: "crc-pr",
    label: (
      <>
        Parceiro <b className="text-white">CRC-PR</b>
      </>
    ),
  },
  { key: "advocacia", label: "Escritórios de advocacia" },
  { key: "contadores", label: "Rede de contadores" },
]

export function FunnelClientes() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-[#061425] text-white"
      aria-label="Clientes e depoimentos"
    >
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">06 — Clientes e Depoimentos</MetaLabel>
          <MetaLabel className="hidden sm:block">Confiança</MetaLabel>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center lg:mt-12">
          <SplitReveal
            as="h2"
            type="words"
            className="font-display text-[clamp(1.7rem,4vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
          >
            Empresas que confiam na nossa precisão.
          </SplitReveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
          className="mt-12 space-y-8 lg:mt-14"
        >
          <Marquee speed={36} direction="left" className="lfy-fade-x">
            {[...ROW1, ...ROW1].map((logo, i) => (
              <Image
                key={`r1-${logo.src}-${i}`}
                src={logo.src}
                alt={i < ROW1.length ? logo.alt : ""}
                width={300}
                height={112}
                className="mx-10 h-20 w-auto shrink-0 object-contain sm:mx-12 lg:h-28"
              />
            ))}
          </Marquee>
          <Marquee speed={36} direction="right" className="lfy-fade-x">
            {[...ROW2, ...ROW2].map((logo, i) => (
              <Image
                key={`r2-${logo.src}-${i}`}
                src={logo.src}
                alt={i < ROW2.length ? logo.alt : ""}
                width={300}
                height={112}
                className="mx-10 h-20 w-auto shrink-0 object-contain sm:mx-12 lg:h-28"
              />
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(2) }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {PARTNERS.map((partner) => (
            <span
              key={partner.key}
              className="inline-flex items-center gap-2 rounded-full border hairline bg-[#04101f]/60 px-4 py-2 text-[13px] text-white/65"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" aria-hidden />
              {partner.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
          className="mt-14 grid overflow-hidden rounded-2xl border hairline bg-[#04101f] lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="relative min-h-[300px]">
            <Image
              src="/images/Empresario de Costas.jpg"
              alt="Executivo de indústria cliente da Larafy"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-[#04101f]/70 mix-blend-multiply" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,rgba(0,229,255,0.16),transparent_60%)]"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <div>
              <MetaLabel className="text-[#00e5ff]">Créditos recuperados</MetaLabel>
              <p className="mt-2 font-display text-[clamp(2.2rem,4vw,3rem)] font-bold tabular-nums tracking-[-0.03em] text-[#00e5ff]">
                R$ 4,2 milhões
              </p>
            </div>
            <figure className="space-y-4">
              <blockquote className="text-lg leading-relaxed text-white/90">
                “O número veio do nosso próprio dado, não de um chute de mercado. Recuperamos o que
                era nosso e migramos toda a contabilidade depois disso.”
              </blockquote>
              <figcaption className="text-sm text-white/60">
                <b className="text-white">Diretor Financeiro</b> · Indústria · Lucro Real
              </figcaption>
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
