"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
} from "@/lib/scroll-motion"

export function MetodoSection() {
  return (
    <section className="relative py-12 bg-[#061120]">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          <h2 className="text-2xl font-extrabold text-[#00e5ff] lg:text-4xl">
            Entenda nosso metodo
          </h2>
          <a
            href="#metodo"
            className="cta-button rounded-full bg-[#00e5ff] px-10 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]"
          >
            O METODO
          </a>
        </motion.div>
      </div>
    </section>
  )
}
