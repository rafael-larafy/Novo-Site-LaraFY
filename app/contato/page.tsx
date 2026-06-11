"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContatoSection } from "@/components/sections/contato-section"
import {scrollViewport,scrollTransition,fadeUpVariants,staggerDelay,} from "@/lib/scroll-motion"
import { Analytics } from "@vercel/analytics/next"

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section className="relative bg-[#0a1628] pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Contato
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Fale com um{" "}
              <span className="text-[#00e5ff]">estrategista sênior</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Sem intermédios, sem ruídos. Analisamos desafios e construímos
              decisões junto com você.
            </motion.p>
          </div>
        </section>

        <ContatoSection />
      </main>
      <Analytics/>
      <Footer />
    </>
  )
}
