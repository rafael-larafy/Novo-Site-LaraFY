"use client"

// COPY: números e claims pendentes de validação com a Larafy.

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { CtaButton } from "@/components/ui/cta-button"
import { onAppReady } from "@/lib/app-ready"
import {
  fadeUpVariants,
  scrollTransition,
  slideRightVariants,
} from "@/lib/scroll-motion"


const DOC_WIDTHS = ["92%", "64%", "85%", "57%", "78%", "95%", "61%", "73%"] as const


const HIT_SEQUENCE: ReadonlyArray<readonly [number, number, number]> = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 7],
  [0, 2, 6],
]

const TRUST_ITEMS = [
  "+300 clientes high-ticket",
  "+20 anos de experiência",
  "Apólice de R$ 10 mi",
  "Parceiro CRC-PR",
] as const

export function FlashHero() {
  const reduce = useReducedMotion()

  // Entrada coreografada: espera o preloader (onAppReady) — com reduced-motion
  // entra na hora; fallback de 5s caso o sinal nunca dispare.
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    if (reduce) {
      setEntered(true)
      return
    }
    const off = onAppReady(() => setEntered(true))
    const fallback = window.setTimeout(() => setEntered(true), 5000)
    return () => {
      off()
      window.clearTimeout(fallback)
    }
  }, [reduce])

  const [hitIndex, setHitIndex] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setHitIndex((i) => (i + 1) % HIT_SEQUENCE.length)
    }, 1100)
    return () => window.clearInterval(id)
  }, [reduce])
  const hits = reduce ? HIT_SEQUENCE[0] : HIT_SEQUENCE[hitIndex]

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-32 lg:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[12vw] -top-[20vw] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(7,224,255,0.14),transparent)]" />
        <div className="absolute -bottom-[16vw] -left-[14vw] h-[48vw] w-[48vw] rounded-full bg-[radial-gradient(closest-side,#eef3f6,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <motion.div
            initial="hidden"
            animate={entered ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={scrollTransition}
          >
            <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#002e43]">
              <span className="h-[3px] w-6 rounded-full bg-[#07e0ff]" aria-hidden />
              Consultoria tributária de alta performance
            </p>

            <h1 className="mt-5 text-[clamp(2.3rem,5.2vw,4.1rem)] font-black tracking-[-0.03em] leading-[1.07] text-[#002e43]">
              Menos imposto, mais caixa e{" "}
              <span className="relative whitespace-nowrap">
                segurança fiscal
                <span
                  className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] rounded bg-[#07e0ff]/85"
                  aria-hidden
                />
              </span>{" "}
              de verdade.
            </h1>

            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-[#002e43]/65 sm:text-lg">
              A LaraFy recupera créditos, reduz a carga tributária e blinda
              empresas do Lucro Real com tecnologia própria —{" "}
              <strong className="font-semibold text-[#002e43]">
                5 anos de apuração analisados em 40 minutos
              </strong>
              , sem achismo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton href="#contato">Agendar diagnóstico gratuito</CtaButton>
              <a
                href="#tecnologia"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#002e43]/15 px-7 py-3.5 text-sm font-bold text-[#002e43] transition-colors duration-200 hover:border-[#002e43]"
              >
                Ver a tecnologia
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-semibold text-[#002e43]/65">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#07e0ff]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={entered ? "visible" : "hidden"}
            variants={slideRightVariants}
            transition={{ ...scrollTransition, delay: 0.15 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-5 left-0 z-10 whitespace-nowrap rounded-2xl bg-[#002e43] px-4 py-3 text-white shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] sm:-left-6"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <small className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#07e0ff]">
                Créditos
              </small>
              <span className="text-lg font-extrabold tabular-nums">
                R$ 2,48 mi
              </span>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 right-0 z-10 whitespace-nowrap rounded-2xl bg-[#07e0ff] px-4 py-3 text-[#002e43] shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] sm:-right-4"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <small className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#002e43]/70">
                Cenários
              </small>
              <span className="text-lg font-extrabold tabular-nums">
                +1 bilhão
              </span>
            </motion.div>

            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-[28px] border border-[#002e43]/10 bg-white p-6 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-[#002e43]">
                    Diagnóstico LaraFy
                  </p>
                  <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#002e43]">
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#07e0ff]"
                      aria-hidden
                      animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    Processando
                  </p>
                </div>

                <div
                  aria-hidden
                  className="relative mt-5 overflow-hidden rounded-2xl bg-[#eef3f6] p-4"
                >
                  <div className="flex flex-col gap-3">
                    {DOC_WIDTHS.map((width, i) => {
                      const hit = hits.includes(i)
                      const hitClass = hit
                        ? "bg-[#07e0ff] shadow-[0_0_10px_rgba(7,224,255,0.5)]"
                        : "bg-[#002e43]/10"
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[14px_1fr_46px] items-center gap-2.5"
                        >
                          <span
                            className={`h-3.5 w-3.5 rounded transition-[background-color,box-shadow] duration-300 ease-out ${hitClass}`}
                          />
                          <span
                            className="h-[7px] rounded bg-[#002e43]/10"
                            style={{ width }}
                          />
                          <span
                            className={`h-2 rounded transition-[background-color,box-shadow] duration-300 ease-out ${hitClass}`}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 h-[2px] rounded-full bg-[#07e0ff] shadow-[0_0_16px_3px_rgba(7,224,255,0.45)]"
                    style={{ top: reduce ? "50%" : "8%" }}
                    animate={reduce ? undefined : { top: ["8%", "88%", "8%"] }}
                    transition={
                      reduce
                        ? undefined
                        : {
                            duration: 4.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#002e43]/55">
                      Período analisado
                    </p>
                    <p className="mt-1 text-2xl font-black tabular-nums text-[#002e43]">
                      5 anos
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#002e43]/55">
                      Tempo
                    </p>
                    <p className="mt-1 text-2xl font-black tabular-nums text-[#002e43]">
                      40 min
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
