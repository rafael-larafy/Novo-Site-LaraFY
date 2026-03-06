"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"

export function ZeroRiscoSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#061120]">
      {/* Background tech dots */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
          {[
            { x: 50, y: 80 }, { x: 130, y: 340 }, { x: 210, y: 150, lx: 50, ly: 80 },
            { x: 290, y: 480 }, { x: 370, y: 60 }, { x: 450, y: 290, lx: 290, ly: 480 },
            { x: 530, y: 520 }, { x: 610, y: 170 }, { x: 690, y: 400, lx: 530, ly: 520 },
            { x: 770, y: 50 }, { x: 850, y: 360 }, { x: 930, y: 210, lx: 770, ly: 50 },
            { x: 1010, y: 540 }, { x: 1090, y: 120 }, { x: 1150, y: 450, lx: 1010, ly: 540 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="1" fill="#00e5ff" />
              {p.lx !== undefined && (
                <line x1={p.x} y1={p.y} x2={p.lx} y2={p.ly} stroke="#00e5ff" strokeWidth="0.2" />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left - ZERO headline */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2 className="text-7xl font-black uppercase text-[#ffffff] leading-none lg:text-9xl">
              ZERO
            </h2>
            <p className="mt-4 text-2xl font-bold text-[#ffffff] lg:text-4xl leading-tight">
              risco de investir<br />sem retorno
            </p>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            className="flex-1 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <p className="text-[#8ba3c0] text-lg leading-relaxed">
              Nosso modelo de remuneracao e baseado no Exito
              (Success Fee). Isso significa que nossos interesses
              estao 100% alinhados.
            </p>
            <p className="text-[#00e5ff] font-bold uppercase text-lg tracking-wide">
              Se nao encontrarmos oportunidades reais e seguras, voce nao paga nada.
            </p>
            <p className="text-[#8ba3c0] text-lg leading-relaxed">
              Nossos honorarios sao um percentual sobre valores
              recuperados e a economia tributaria efetiva gerada.
              Nao trabalhamos com promessas.
            </p>
            <p className="text-[#00e5ff] font-bold uppercase text-lg tracking-wide">
              Trabalhamos com resultado comprovado.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(3) }}
        >
          <a
            href="#contato"
            className="cta-button inline-block rounded-full border-2 border-[#00e5ff]/30 bg-[#00e5ff] px-10 py-5 text-base font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
          >
            Solicitar Diagnostico Tributario Estrategico
          </a>
          <p className="mt-8 text-xl font-bold text-[#ffffff] lg:text-2xl text-balance">
            Recuperar o passado e obrigacao. Planejar o futuro e vantagem competitiva.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
