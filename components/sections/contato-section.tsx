"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
} from "@/lib/scroll-motion"
import Image from "next/image"

export function ContatoSection() {
  return (
    <section
      id="contato"
      className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Background: Empresario de Costas */}
      <div className="absolute inset-0">
        <Image
          src="/images/Empresario de Costas.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-[#0a1628]/85"
          aria-hidden
        />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          {/* Left: Waldir Form image + text */}
          <motion.div
            className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-6 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            {/* Waldir image */}
            <div className="relative w-full max-w-[280px] lg:max-w-[320px] flex-shrink-0">
              <Image
                src="/images/Waldir Form.png"
                alt="Waldir de Lara - Founder & CEO"
                width={320}
                height={420}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>

            {/* Text block - Waldir info */}
            <div className="lg:flex-1 space-y-4 lg:space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Waldir de Lara
                </h3>
                <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-wider mt-1">
                  Founder & CEO
                </p>
                <p className="text-[#c5d9f3] text-sm lg:text-base mt-2 max-w-xs">
                  Empresário, contador e a maior mente tributária do Brasil
                </p>
              </div>

              {/* CTA text */}
              <div className="space-y-3">
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-black text-white leading-tight max-w-md">
                  Tenha acesso direto a um estrategista sênior.
                </h2>
                <p className="text-[#c5d9f3] text-sm lg:text-base leading-relaxed max-w-md">
                  Sem intermediários, sem ruídos. Analisamos desafios e construímos
                  decisões junto com você.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-[420px]"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl">
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Cargo"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Faturamento Anual"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp"
                  className="w-full h-12 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all"
                />
                <textarea
                  placeholder="Como podemos ajudar?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent transition-all resize-none"
                />
                <motion.button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#00e5ff] text-white font-bold uppercase tracking-wider hover:bg-[#00cce6] transition-colors cta-button"
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
