"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import Image from "next/image"
import { motion } from "framer-motion"

import { SplitReveal } from "@/components/split-reveal"
import { fadeUpVariants, scaleVariants, scrollTransition, scrollViewport } from "@/lib/scroll-motion"

export function FlashCase() {
  return (
    <section
      id="case"
      className="bg-white py-16 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:auto_600px]"
      aria-labelledby="case-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="mb-10 max-w-[640px]">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={scrollTransition}
            className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]"
          >
            <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
            Case de sucesso
          </motion.p>
          <SplitReveal
            as="h2"
            type="words"
            className="mt-4 text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#002e43]"
          >
            A precisão LaraFy fazendo diferença no caixa.
          </SplitReveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
          className="grid overflow-hidden rounded-[28px] bg-[#002e43] shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="relative min-h-[320px]">
            <Image
              src="/images/Empresario de Costas.jpg"
              alt="Executivo de uma indústria cliente da Larafy"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-[#002e43]/70 mix-blend-multiply" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,rgba(7,224,255,0.16),transparent_60%)]"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center gap-6 p-8 text-white lg:p-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">
                Créditos recuperados
              </p>
              <p className="mt-2 text-[clamp(2.2rem,4vw,3rem)] font-black tabular-nums tracking-[-0.03em] text-[#07e0ff]">
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
