"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/scroll-motion"
import { PainelLarafy } from "./painel-larafy"

export function TransparenciaSection() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-[#0a1628]">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-2 h-2 bg-[#00e5ff] rounded-full" />
        <div className="absolute top-20 right-40 w-1 h-1 bg-[#00e5ff] rounded-full" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[#00e5ff] rounded-full" />
        {[20, 35, 50, 65, 80].map((top, i) => (
          <div
            key={i}
            className="absolute bg-[#00e5ff]/20 rounded-full"
            style={{
              top: `${top}%`,
              right: `${5 + i * 8}%`,
              width: '1.5px',
              height: '1.5px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 mb-16 lg:mb-24">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Title */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2 className="mt-1 mb-1 text-2xl font-extrabold leading-tight text-[#00e5ff] lg:text-4xl text-balance max-w-xl">
              Transparência e Método:
              <br />
              um processo claro para ir
              <br />
              da estratégia à ação.
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <p className="text-white text-base lg:text-lg leading-relaxed max-w-md text-left">
              Nosso Planejamento Tributário não é um documento de gaveta. É um plano
              de ação completo e implementado com um processo claro, focado em
              resultado e com método validado:
            </p>
          </motion.div>
        </div>
      </div>

      {/* Painel interativo LaraFy dentro da mesma section */}
      <PainelLarafy />
    </section>
  )
}
