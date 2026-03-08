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
      className="relative overflow-hidden border-y-2 border-[#0a1628]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px] lg:min-h-[650px]">
        {/* Left third: Waldir - Solid white */}
        <motion.div
          className="relative flex flex-col justify-end pt-24 lg:pt-32 pb-8 lg:pb-12 px-8 lg:px-12 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={slideLeftVariants}
          transition={scrollTransition}
        >
          {/* Yellow badge */}
          <div className="absolute bottom-14 lg:bottom-16 left-8 lg:left-12 w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center text-[#0a1628] font-bold text-sm z-10">
            1
          </div>

          <div className="relative flex items-end justify-center lg:justify-start translate-y-8 lg:translate-y-12">
            <div className="relative flex-shrink-0 w-[190px] lg:w-[500px]">
              <Image
                src="/images/Waldir Form.png"
                alt="Waldir de Lara - Founder & CEO"
                width={180}
                height={240}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </motion.div>

        {/* Center third: CTA - Gradient white to blue overlay over cityscape */}
        <motion.div
          className="relative flex flex-col justify-center p-8 lg:p-12 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          {/* Background: Empresario image with gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/Empresario de Costas.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-[#0a1628]/90"
              aria-hidden
            />
          </div>

          <div className="relative z-10 max-w-sm">
            <h2 className="text-2xl lg:text-3xl font-black text-[#0a1628] leading-tight">
              Tenha acesso direto a um estrategista sênior.
            </h2>
            <p className="text-base text-[#1f2e41] leading-relaxed mt-4">
              Sem intermédios, sem ruídos. Analisamos{" "}
              <span className="bg-[#facc15]/40 px-1 rounded">desafios</span> e
              construímos decisões junto com você.
            </p>
          </div>
        </motion.div>

        {/* Right third: Form - Empresario with dark overlay */}
        <motion.div
          className="relative flex flex-col justify-center p-8 lg:p-12 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={slideRightVariants}
          transition={scrollTransition}
        >
          {/* Background: Empresario + dark overlay + subtle pattern */}
          <div className="absolute inset-0">
            <Image
              src="/images/Empresario de Costas.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[#0a1628]/88"
              aria-hidden
            />
            {/* Subtle diagonal lines pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  white 20px,
                  white 21px
                )`,
              }}
              aria-hidden
            />
          </div>

          <div className="relative z-10">
            <form
              className="space-y-3 max-w-md mx-auto lg:mx-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Nome"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Cargo"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Faturamento Anual"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <textarea
                placeholder="Como podemos ajudar?"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm resize-none"
              />
              <motion.button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#00e5ff] text-white font-bold uppercase tracking-wider hover:bg-[#00cce6] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
