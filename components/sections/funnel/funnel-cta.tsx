"use client"

// COPY: claims pendentes de validação com a Larafy (R$10mi, +300, 40min etc.).
// Esta é a seção de FECHAMENTO do funil. O CTA aponta para #contato — ou seja,
// leva o visitante DE VOLTA ao formulário (FunnelForm, que tem id="contato").

import { motion } from "framer-motion"

import { ConstellationField } from "@/components/constellation-field"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { HudCorners, HudGrid, MetaLabel } from "@/components/ui/editorial"
import { scaleVariants, scrollTransition, scrollViewport } from "@/lib/scroll-motion"

export function FunnelCta() {
  return (
    <section className="relative overflow-hidden bg-[#020a14] py-24 text-white lg:py-32">
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
          className="relative mx-auto max-w-4xl rounded-2xl border hairline bg-[#04101f]/60 p-8 text-center lg:p-16"
        >
          <HudCorners />

          <ConstellationField
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-20"
            count={6}
            radius={36}
          />

          <div className="relative z-10">
            <MetaLabel className="text-[#00e5ff]">07 — Comece agora</MetaLabel>

            <SplitReveal
              as="h2"
              type="words"
              className="mt-6 text-balance font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white"
            >
              Tributo não é despesa. É estratégia.
            </SplitReveal>

            <p className="mx-auto mt-6 max-w-xl text-white/60">
              Solicite seu diagnóstico e veja, com dados reais, quanto sua empresa
              pode recuperar e economizar.
            </p>

            <p
              className="mx-auto mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-white/55"
              aria-hidden
            >
              <span className="text-[#00e5ff]">&gt;</span>
              agendar_diagnostico
              <span className="inline-block h-4 w-2 animate-pulse bg-[#00e5ff]" />
            </p>

            <div className="mt-10 flex justify-center">
              <CtaButton href="#contato" magneticStrength={0.4}>
                Agendar diagnóstico gratuito
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
