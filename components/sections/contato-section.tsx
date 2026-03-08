"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
} from "@/lib/scroll-motion"
import Image from "next/image"

export function ContatoSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden min-h-[600px] lg:min-h-[620px]"
    >
      {/* Única imagem de background */}
      <div className="absolute inset-0">
        <Image
          src="/images/Empresario de Costas.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 p-10 lg:p-16 bg-[#0a1628]/85 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          {/* CTA text */}
          <div className="flex-1 max-w-[340px] order-2 lg:order-1">
            <h2 className="text-xl lg:text-2xl font-black text-white leading-tight">
              Tenha acesso direto a um estrategista sênior.
            </h2>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed mt-3">
              Sem intermédios, sem ruídos. Analisamos{" "}
              <span className="bg-[#facc15]/50 px-1 rounded">desafios</span> e
              construímos decisões junto com você.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 w-full max-w-[380px] order-1 lg:order-2">
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
