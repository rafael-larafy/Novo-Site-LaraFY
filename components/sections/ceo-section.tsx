"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {scrollViewport,scrollTransition,slideLeftVariants,slideRightVariants,fadeUpVariants, staggerDelay} from "@/lib/scroll-motion"
import WaldirImg from "../../lib/Waldir.png"


export function CeoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] pt-8 pb-14 lg:pt-0 lg:pb-0">
      <div className="absolute inset-0">
        <Image
          src="/images/AdobeStock_699471030.jpeg"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0066ff]/20 to-transparent" />
      </div>

              <div className="bg-[#0a1628] pt-16 pb-[0px]">
          <div className="mb-12 mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="text-[#77e4ff] text-sm leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(4) }}
            >
             O mercado tradicional de consultoria limita o seu ganho
            </motion.p>
            <motion.h3
              className="mt-4 text-1xl text-center font-extrabold text-[#00e5ff] lg:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(5) }}
            >
             Com tecnologia e método exclusivo,
              <br />
              a LaraFy potencializa o seu lucro.
            </motion.h3>
          </div>
        </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pb-1">
          <motion.div
            className="flex-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2
              data-gsap-title
              className="text-2x1 text-center lg:text-left font-black uppercase leading-tight text-[#00e5ff] lg:text-5xl text-balance"
            >
              “A linha tênue entre o erro e o acerto está em como foi analisado.”
            </h2>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-base sm:text-sm font-bold uppercase tracking-wider text-[#0a1628] glow-effect text-center lg:text-left"
            >
              Solicitar Diagnóstico Tributário Estratégico
            </a>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div className="relative flex items-end justify-center">
              <div
                data-gsap-tilt
                className="relative w-full max-w-[560px] aspect-square"
                style={{ perspective: "900px" }}
              >
                <div className="absolute inset-0  from-[#0a1628] via-transparent to-transparent z-10" />
                <div
                  data-gsap-tilt-inner
                  className="w-full h-full"
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                >
                  <Image
                    src={WaldirImg}
                    alt="Waldir de Lara - Founder e CEO da LaraFy"
                    width={560}
                    height={560}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
