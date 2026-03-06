"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import Background2 from "../../lib/Background 2.png"

export function ConfiancaSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#020c18]"
      style={{
        // Next/Image import gives { src, height, width }
        backgroundImage: `url(${(Background2 as any).src ?? Background2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#020c18]/95 via-[#020c18]/80 to-[#020c18]/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          {/* Left headline */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-black leading-tight tracking-tight text-[#00e5ff] max-w-xl">
              UMA DAS CONSULTORIAS
              <br />
              TRIBUTÁRIAS MAIS
              <br />
              TECNOLÓGICAS
              <br />
              (E HUMANAS) DO BRASIL.
            </h2>
          </div>

          {/* Right bullets */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl bg-[#020c18]/70 border border-[#063048] px-6 py-6 sm:px-8 sm:py-7 shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
              <p className="text-sm sm:text-base text-[#e2f4ff] leading-relaxed mb-4">
                A LaraFy combina escala tecnológica com cultura de excelência.
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#c5d9f3]">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00e5ff]" />
                  <span>+5 anos de mercado.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00e5ff]" />
                  <span>+100 colaboradores altamente especializados.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00e5ff]" />
                  <span>Tecnologia própria e exclusiva mais poderosa do mercado.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00e5ff]" />
                  <span>Reconhecida com selo GPTW (Great Place to Work).</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00e5ff]" />
                  <span>Cultura orientada a: Precisão, Ética e Resultado Sustentável.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom pill */}
        <div className="mt-10 flex justify-center">
          <motion.div
            className="inline-flex items-center justify-center rounded-full bg-[#00e5ff] px-6 sm:px-10 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#002335] shadow-[0_18px_40px_rgba(0,229,255,0.65)]"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(2) }}
          >
            E a CONFIANÇA que se conquista através da seriedade e eficiência.
          </motion.div>
        </div>
      </div>
    </section>
  )
}

