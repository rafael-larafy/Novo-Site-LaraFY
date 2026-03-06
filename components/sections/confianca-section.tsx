"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  slideLeftVariants,
  slideRightVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import Background2 from "../../lib/Background 2.png"

export function ConfiancaSection() {
  return (
    <section className="relative overflow-hidden bg-[#020c18]">
      <img
        src={typeof Background2 === "string" ? Background2 : (Background2 as { src?: string }).src ?? ""}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left headline */}
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-black leading-[1.15] tracking-tight text-[#00e5ff] max-w-xl uppercase">
              UMA DAS CONSULTORIAS
              <br />
              TRIBUTÁRIAS MAIS
              <br />
              TECNOLÓGICAS
              <br />
              (E HUMANAS) DO BRASIL.
            </h2>
          </motion.div>

          {/* Right bullets */}
          <motion.div
            className="w-full lg:w-1/2 pt-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <p className="text-sm sm:text-base text-[#e2f4ff] leading-relaxed mb-5">
              A LaraFy combina escala tecnológica com cultura de excelência.
            </p>
            <div className="space-y-2 text-sm sm:text-base text-[#c5d9f3]">
              <p>• +5 anos de mercado.</p>
              <p>• +100 colaboradores altamente especializados.</p>
              <p>• Tecnologia própria e exclusiva mais poderosa do mercado.</p>
              <p>• Reconhecida com selo GPTW (Great Place to Work).</p>
              <p>• Cultura orientada a: Precisão, Ética e Resultado Sustentável.</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom pill */}
        <motion.div
          className="mt-12 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(2) }}
        >
          <a
            href="#contato"
            className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 sm:px-12 py-3.5 sm:py-5 text-center text-lg sm:text-xl font-bold tracking-[0.02em] text-[#0a1628]"
          >
            E a CONFIANÇA que se conquista através da seriedade e eficiência:
          </a>
        </motion.div>
      </div>
    </section>
  )
}
