"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/scroll-motion"
import WaldirImg from "../../lib/Waldir.png"

export function CeoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] pt-10 pb-16 lg:pt-16 lg:pb-32">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0066ff]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2 className="text-3xl font-black uppercase leading-tight text-[#00e5ff] lg:text-5xl text-balance">
            “A linha tênue entre o erro e o acerto está em como foi analisado.”
            </h2>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628]"
            >
              Solicitar Diagnostico Tributario Estrategico
            </a>
          </motion.div>

          {/* Right - CEO */}
          <motion.div
            className="flex-1 relative"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div className="relative flex items-end justify-center">
              <div className="relative w-full max-w-[560px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                <img
                  src={WaldirImg.src || WaldirImg}
                  alt="Waldir de Lara - Founder e CEO da LaraFy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
