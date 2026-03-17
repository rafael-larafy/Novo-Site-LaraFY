"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import PessoaImg from "../../lib/Pessoa-preocupada.png"

const tags = [
  "ANALISES PONTUAIS",
  "AMOSTRAGENS",
  "CRUZAMENTOS MANUAIS",
  "TESES GENERICAS",
  "PLANILHAS",
]

export function ReformaTributariaSection() {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden bg-[#0d1d33]">
        <div className="relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEwwIDMwTDMwIDYwTDYwIDMwTDMwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGU1ZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] bg-repeat" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
              <motion.div
                className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <div className="relative w-64 h-80 lg:w-140 lg:h-98 rounded-xl overflow-hidden bg-[]">
                  <Image
                    src={PessoaImg}
                    alt="Pessoa preocupada"
                    width={560}
                    height={392}
                    sizes="(max-width: 1024px) 256px, 560px"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d33] via-transparent to-transparent" />
                </div>
              </motion.div>

              <div className="flex-1 space-y-6 w-full text-center lg:text-left">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={slideRightVariants}
                  transition={scrollTransition}
                >
                  <h2 className="text-2xl font-extrabold leading-tight text-[#ffffff] lg:text-5xl text-balance">
                  Está com medo de perder dinheiro com a Reforma Tributária?
                  </h2>
                </motion.div>

                <motion.div
                  className="max-w-lg mx-auto lg:mx-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                >
                  <p className="text-[#ffffff] leading-tight">
                  Se o seu projeto tributário te entrega somente:
                  </p>
                  <p className="mt-4 text-[#ffffff] leading-tight hidden md:block">
                    Análises Pontuais • Amostragens • Cruzamentos manuais • Teses genéricas • Planilhas.
                  </p>
                </motion.div>

                <div className="flex flex-col">
                  <motion.div
                    className="mt-6 rounded-2xl border border-[#1e3a5f] bg-[#0a1628]/60 p-4 sm:p-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] order-1 lg:order-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(3) }}
                  >
                    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffffff]">
                      Como geralmente funcionam os projetos tradicionais:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {tags.map((tag, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTappedIndex(tappedIndex === i ? null : i)}
                          className={`flex items-center justify-center rounded-lg border px-4 py-2 sm:px-5 sm:py-3 text-center text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ffffff] transition-all duration-300 hover:border-[#00e5ff]/60 hover:bg-[#132a45] hover:shadow-[0_0_18px_rgba(0,229,255,0.28)] ${
                            tag === "PLANILHAS" ? "sm:col-span-2" : ""
                          } ${
                            tappedIndex === i
                              ? "border-[#00e5ff]/60 bg-[#132a45] shadow-[0_0_18px_rgba(0,229,255,0.28)]"
                              : "border-[#1e3a5f] bg-[#0d1d33]"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  <p className="mt-4 text-[#ffffff] leading-tight order-2 lg:order-1 lg:mt-6">
                    Esteja pronto para a Reforma Tributária engolir o seu negócio.
                  </p>
                </div>
            </div>
          </div>
        </div>
        </div>

        <div className="bg-[#0a1628] pt-16 pb-[0px]">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="text-[#77e4ff] text-sm leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(4) }}
            >
             O mercado tradicional de consultoria limita o seu ganho
            </motion.p>
            <motion.h3
              className="mt-4 text-1xl text-center font-extrabold text-[#00e5ff] lg:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(5) }}
            >
             Com tecnologia e método exclusivo,
              <br />
              a LaraFy potencializa o seu lucro.
            </motion.h3>
          </div>
        </div>
    </section>
  )
}
