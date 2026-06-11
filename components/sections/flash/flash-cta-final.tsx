"use client"

// COPY: números e claims pendentes de validação com a Larafy.
// TODO: integrar formulário de contato com CRM/endpoint real.

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"

import { CountUp } from "@/components/sections/flash/count-up"
import { SplitReveal } from "@/components/split-reveal"
import { scaleVariants, scrollTransition, scrollViewport } from "@/lib/scroll-motion"

const FIELD_CLASS =
  "w-full rounded-xl border border-[#002e43]/15 bg-[#eef3f6] px-4 py-3 text-sm font-medium text-[#002e43] placeholder:text-[#002e43]/40 transition-colors duration-200 focus:border-[#07e0ff] focus:bg-white focus:outline-none"

const LOGOS = [
  { src: "/Luson.png", alt: "Logotipo da Luson" },
  { src: "/Kapazi.png", alt: "Logotipo da Kapazi" },
  { src: "/Zanette.png", alt: "Logotipo da Zanette" },
]

export function FlashCtaFinal() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contato" className="bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
          className="relative grid items-center gap-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#013d57] to-[#002e43] p-7 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] lg:grid-cols-[1fr_0.9fr] lg:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(7,224,255,0.16),transparent_60%)]"
          />

          <div className="relative text-white">
            <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
              <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
              Diagnóstico de precisão
            </p>

            <SplitReveal
              as="h2"
              type="words"
              className="mt-4 text-[clamp(1.75rem,3.8vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
            >
              Descubra quanto sua empresa está deixando na mesa.
            </SplitReveal>

            <p className="mt-4 max-w-xl leading-relaxed text-white/65">
              5 anos de apuração analisados em 40 minutos. Sem custo, sem achismo, sem
              compromisso.
            </p>

            <div className="mt-7 flex flex-wrap gap-7">
              <div>
                <p className="text-2xl font-black tabular-nums text-[#07e0ff]">
                  <CountUp to={40} suffix=" min" />
                </p>
                <p className="text-xs text-white/60">para o diagnóstico</p>
              </div>
              <div>
                <p className="text-2xl font-black tabular-nums text-[#07e0ff]">
                  <CountUp to={300} prefix="+" />
                </p>
                <p className="text-xs text-white/60">empresas blindadas</p>
              </div>
              <div>
                <p className="text-2xl font-black tabular-nums text-[#07e0ff]">R$ 10 mi</p>
                <p className="text-xs text-white/60">de apólice</p>
              </div>
            </div>

            <p className="mt-8 text-[11px] uppercase tracking-[0.1em] text-white/45">
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

          <div className="relative rounded-3xl bg-white p-6 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] lg:p-8">
            {submitted ? (
              <div role="status" className="py-6">
                <div className="mx-auto grid h-[60px] w-[60px] place-items-center rounded-full bg-[#07e0ff]/15">
                  <Check className="h-7 w-7 text-[#002e43]" aria-hidden />
                </div>
                <h3 className="mt-4 text-center text-lg font-extrabold text-[#002e43]">
                  Recebemos sua solicitação!
                </h3>
                <p className="mt-2 text-center text-sm leading-relaxed text-[#002e43]/65">
                  Um especialista LaraFy responde em até 1 dia útil. (Demonstração — nenhum
                  dado foi enviado.)
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-4 text-lg font-extrabold text-[#002e43]">
                  Agende seu diagnóstico
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  <div className="mb-3">
                    <label
                      htmlFor="contato-nome"
                      className="mb-1 block text-xs font-bold text-[#002e43]"
                    >
                      Nome
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
                      type="text"
                      required
                      autoComplete="name"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="contato-empresa"
                      className="mb-1 block text-xs font-bold text-[#002e43]"
                    >
                      Empresa
                    </label>
                    <input
                      id="contato-empresa"
                      name="empresa"
                      type="text"
                      required
                      autoComplete="organization"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="contato-email"
                      className="mb-1 block text-xs font-bold text-[#002e43]"
                    >
                      E-mail corporativo
                    </label>
                    <input
                      id="contato-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="voce@empresa.com.br"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="contato-whatsapp"
                      className="mb-1 block text-xs font-bold text-[#002e43]"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="contato-whatsapp"
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
                    <label
                      htmlFor="contato-regime"
                      className="mb-1 block text-xs font-bold text-[#002e43]"
                    >
                      Regime tributário
                    </label>
                    <div className="relative">
                      <select
                        id="contato-regime"
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
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002e43]/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full justify-center rounded-full bg-[#07e0ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#002e43] transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-[0_14px_30px_-12px_rgba(7,224,255,0.45)] active:scale-[0.98]"
                  >
                    Agendar diagnóstico gratuito
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-relaxed text-[#002e43]/50">
                    Usamos seus dados apenas para retornar seu contato. Sem spam.{" "}
                    <a href="#" className="underline">
                      Política de Privacidade
                    </a>{" "}
                    — LGPD.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
