"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { SplitReveal } from "@/components/split-reveal"
import {
  fadeUpVariants,
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

const PARTNERS: { key: string; label: ReactNode }[] = [
  {
    key: "crc-pr",
    label: (
      <>
        Parceiro <b className="text-[#002e43]">CRC-PR</b>
      </>
    ),
  },
  { key: "advocacia", label: "Escritórios de advocacia" },
  { key: "contadores", label: "Rede de contadores" },
]

export function FlashLogos() {
  return (
    <section className="bg-[#eef3f6] py-16 [content-visibility:auto] [contain-intrinsic-size:auto_500px] lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="mb-10 text-center lg:mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
          >
            <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]">
              <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
              Confiança
            </p>
          </motion.div>
          <SplitReveal
            as="h2"
            type="words"
            className="mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            Empresas que confiam na nossa precisão.
          </SplitReveal>
        </div>

        <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {LOGOS.map((logo, i) => (
            <motion.li
              key={logo.src}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(i) }}
              className="group grid h-[78px] place-items-center rounded-2xl border border-[#002e43]/10 bg-white px-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-8 w-auto object-contain opacity-60 brightness-0 transition-opacity duration-200 group-hover:opacity-90"
              />
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(2) }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-[13px] text-[#002e43]/55">
            Parceiros institucionais:
          </span>
          {PARTNERS.map((partner) => (
            <span
              key={partner.key}
              className="inline-flex items-center gap-2 rounded-full border border-[#002e43]/10 bg-white px-4 py-2 text-[13px] font-semibold text-[#002e43]/65"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#07e0ff]" aria-hidden />
              {partner.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
