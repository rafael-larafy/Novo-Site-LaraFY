"use client"

// COPY: claims pendentes de validação com a Larafy.

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"

import { CountUp } from "@/components/sections/flash/count-up"
import { ctaPillClass } from "@/components/ui/cta-button"
import { SplitReveal } from "@/components/split-reveal"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"
import { GlassCard } from "@/components/ui/glass-card"
import { scaleVariants, scrollTransition, scrollViewport } from "@/lib/scroll-motion"

const FIELD_CLASS =
  "w-full rounded-xl border border-[#1e3a5f] bg-[#04101f] px-4 py-3 text-sm font-medium text-white placeholder:text-white/35 transition-colors duration-200 focus:border-[#00e5ff] focus:outline-none"

const LABEL_CLASS = "mb-1 block text-xs font-bold text-white/80"

const LOGOS = [
  { src: "/Luson.png", alt: "Logotipo da Luson" },
  { src: "/Kapazi.png", alt: "Logotipo da Kapazi" },
  { src: "/Zanette.png", alt: "Logotipo da Zanette" },
]

export function FunnelForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contato" className="relative overflow-hidden bg-[#061425] text-white">
      <HudGrid />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center justify-between border-t hairline pt-6">
          <MetaLabel className="text-[#00e5ff]">02 — Diagnóstico de precisão</MetaLabel>
          <MetaLabel className="hidden sm:block">Agende em 40 minutos</MetaLabel>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* ESQUERDA — texto */}
          <div>
            <SplitReveal
              as="h2"
              type="words"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-balance text-white"
            >
              Descubra quanto sua empresa está deixando na mesa.
            </SplitReveal>

            <p className="mt-6 max-w-xl leading-relaxed text-white/65">
              5 anos de apuração analisados em 40 minutos. Sem custo, sem achismo, sem
              compromisso.
            </p>

            <div className="mt-9 flex flex-wrap gap-7">
              <div>
                <p className="font-display text-2xl font-bold tabular-nums text-[#00e5ff]">
                  <CountUp to={40} suffix=" min" />
                </p>
                <p className="text-xs text-white/60">para o diagnóstico</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tabular-nums text-[#00e5ff]">
                  <CountUp to={300} prefix="+" />
                </p>
                <p className="text-xs text-white/60">empresas blindadas</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tabular-nums text-[#00e5ff]">
                  R$ 10 mi
                </p>
                <p className="text-xs text-white/60">de apólice</p>
              </div>
            </div>

            <p className="mt-10 text-[11px] uppercase tracking-[0.1em] text-white/45">
              Empresas que já confiam
            </p>
            <div className="mt-3 flex items-center gap-5">
              {LOGOS.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={96}
                  height={32}
                  className="h-6 w-auto object-contain opacity-50 brightness-0 invert"
                />
              ))}
            </div>
          </div>

          {/* DIREITA — form card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={scaleVariants}
            transition={scrollTransition}
          >
            <GlassCard glow="md" className="p-6 lg:p-8">
              {submitted ? (
                <div role="status" className="py-6">
                  <div className="mx-auto grid h-[60px] w-[60px] place-items-center rounded-full bg-[#00e5ff]/15">
                    <Check className="h-7 w-7 text-[#00e5ff]" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-center font-display text-lg font-bold text-white">
                    Recebemos sua solicitação!
                  </h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-white/65">
                    Um especialista LaraFy responde em até 1 dia útil. (Demonstração — nenhum
                    dado foi enviado.)
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="mb-4 font-display text-lg font-bold text-white">
                    Agende seu diagnóstico
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                      // TODO: integrar com CRM/endpoint real.
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="funnel-nome" className={LABEL_CLASS}>
                        Nome
                      </label>
                      <input
                        id="funnel-nome"
                        name="nome"
                        type="text"
                        required
                        autoComplete="name"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="funnel-empresa" className={LABEL_CLASS}>
                        Empresa
                      </label>
                      <input
                        id="funnel-empresa"
                        name="empresa"
                        type="text"
                        required
                        autoComplete="organization"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="funnel-email" className={LABEL_CLASS}>
                        E-mail corporativo
                      </label>
                      <input
                        id="funnel-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="voce@empresa.com.br"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="funnel-whatsapp" className={LABEL_CLASS}>
                        WhatsApp
                      </label>
                      <input
                        id="funnel-whatsapp"
                        name="whatsapp"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="(41) 99999-9999"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="funnel-regime" className={LABEL_CLASS}>
                        Regime tributário
                      </label>
                      <div className="relative">
                        <select
                          id="funnel-regime"
                          name="regime"
                          required
                          defaultValue=""
                          className={`${FIELD_CLASS} appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            Selecione o regime
                          </option>
                          <option value="lucro-real">Lucro Real</option>
                          <option value="lucro-presumido">Lucro Presumido</option>
                          <option value="simples-nacional">Simples Nacional</option>
                          <option value="nao-sei">Não sei informar</option>
                        </select>
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
                        />
                      </div>
                    </div>

                    <button type="submit" className={`${ctaPillClass} mt-1 w-full`}>
                      Agendar diagnóstico gratuito
                    </button>

                    <p className="mt-3 text-center text-[11px] leading-relaxed text-white/60">
                      Usamos seus dados apenas para retornar seu contato. Sem spam.{" "}
                      {/* TODO: apontar para a rota real da Política de Privacidade quando existir. */}
                      <a href="/politica-de-privacidade" className="underline">
                        Política de Privacidade
                      </a>{" "}
                      — LGPD.
                    </p>
                  </form>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
