"use client"

import { motion } from "framer-motion"
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
  return (
    <section className="relative overflow-hidden bg-[#0d1d33]">
        {/* Top part - lighter */}
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEwwIDMwTDMwIDYwTDYwIDMwTDMwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGU1ZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] bg-repeat" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
              {/* Left - person image area */}
              <motion.div
                className="flex-shrink-0"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <div className="relative w-64 h-80 lg:w-140 lg:h-98 rounded-xl overflow-hidden bg-[]">
                  <img
                    src={typeof PessoaImg === "string" ? PessoaImg : (PessoaImg as { src?: string }).src ?? ""}
                    alt="Pessoa preocupada"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d33] via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Right content */}
              <div className="flex-1 space-y-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={slideRightVariants}
                  transition={scrollTransition}
                >
                  <h2 className="text-3xl font-extrabold leading-tight text-[#ffffff] lg:text-5xl text-balance">
                    A Reforma Tributaria tem tirado o seu sono?
                  </h2>
                </motion.div>

                <motion.div
                  className="max-w-lg"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                >
                  <p className="text-[#8ba3c0] leading-relaxed">
                    O Brasil esta entre os paises mais complexos do mundo para fazer negocios,
                    e a transicao da Reforma Tributaria tem agravado esse cenario.
                  </p>
                  <p className="mt-4 text-[#8ba3c0] leading-relaxed">
                    Se voce pensa em fazer uma consultoria tributaria para se adequar, e importante
                    frisar que a maioria desses projetos segue o mesmo padrao:
                  </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                  className="mt-6 rounded-2xl border border-[#1e3a5f] bg-[#0a1628]/60 p-4 sm:p-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(3) }}
                >
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8ba3c0]">
                    Como geralmente funcionam os projetos tradicionais:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {tags.map((tag, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-full border border-[#1e3a5f] bg-[#0d1d33] px-4 py-2 sm:px-5 sm:py-3 text-center text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ffffff] transition-all duration-300 hover:border-[#00e5ff]/60 hover:bg-[#132a45] hover:shadow-[0_0_18px_rgba(0,229,255,0.28)] ${
                          tag === "PLANILHAS" ? "sm:col-span-2" : ""
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
              </motion.div>
            </div>
          </div>
        </div>
        </div>

        {/* Bottom dark band */}
        <div className="bg-[#0a1628] pt-16 pb-[0px]">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="text-[#8ba3c0] text-sm leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(4) }}
            >
              O mercado tradicional de consultoria opera de forma limitada
              diante dessa complexidade tributaria.
            </motion.p>
            <motion.h3
              className="mt-4 text-2xl font-extrabold text-[#00e5ff] lg:text-4xl text-balance"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(5) }}
            >
              Nos operamos com inteligencia,
              <br />
              tecnologia e precisao cirurgica.
            </motion.h3>
          </div>
        </div>
    </section>
  )
}
