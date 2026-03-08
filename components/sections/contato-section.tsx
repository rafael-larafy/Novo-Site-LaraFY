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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1.2fr] min-h-[550px] lg:min-h-[580px]">
        {/* Left: Waldir - White background */}
        <motion.div
          className="relative flex flex-col justify-end items-end lg:items-end pb-6 lg:pb-8 pt-8 lg:pt-10 px-6 lg:px-10 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={slideLeftVariants}
          transition={scrollTransition}
        >
          <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center text-[#0a1628] font-bold text-sm z-10">
            1
          </div>
          <div className="relative w-[160px] lg:w-[220px]">
            <Image
              src="/images/Waldir Form.png"
              alt="Waldir de Lara - Founder & CEO"
              width={220}
              height={300}
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Center: CTA - Dark overlay */}
        <motion.div
          className="relative flex flex-col justify-center p-6 lg:p-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/Empresario de Costas.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[#0a1628]/75"
              aria-hidden
            />
          </div>
          <div className="relative z-10 max-w-[320px]">
            <h2 className="text-xl lg:text-2xl font-black text-white leading-tight">
              Tenha acesso direto a um estrategista sênior.
            </h2>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed mt-3">
              Sem intermédios, sem ruídos. Analisamos{" "}
              <span className="bg-[#facc15]/50 px-1 rounded">desafios</span> e
              construímos decisões junto com você.
            </p>
          </div>
        </motion.div>

        {/* Right: Form - Empresario with dark overlay */}
        <motion.div
          className="relative flex flex-col justify-center p-6 lg:p-10 overflow-hidden"
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

          <div className="relative z-10 w-full max-w-[380px]">
            <form
              className="space-y-2.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Nome"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Cargo"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Faturamento Anual"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full h-10 px-3 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
              />
              <textarea
                placeholder="Como podemos ajudar?"
                rows={3}
                className="w-full px-3 py-2.5 rounded-md border border-[#e5e7eb] bg-white text-[#0a1628] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm resize-none"
              />
              <motion.button
                type="submit"
                className="w-full h-11 rounded-md bg-[#00e5ff] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#00cce6] transition-colors"
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
