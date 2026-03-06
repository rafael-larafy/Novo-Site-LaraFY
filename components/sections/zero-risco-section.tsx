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
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
          {/* Left - ZERO headline */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2 className="text-7xl font-black uppercase text-[#ffffff] leading-none lg:text-9xl tracking-tight">
              ZERO
            </h2>
            <p className="mt-4 text-2xl font-light italic text-[#ffffff] lg:text-4xl leading-tight">
              risco de investir
              <br />
              sem retorno
            </p>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            className="flex-1 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <p className="text-[#8ba3c0] text-base lg:text-lg leading-relaxed">
              Nosso modelo de remuneração é baseado no Êxito
              (Success Fee). Isso significa que nossos interesses
              estão 100% alinhados.
            </p>
            <p className="text-[#00e5ff] font-bold uppercase text-sm lg:text-base tracking-wide leading-snug">
              SE NÃO ENCONTRARMOS OPORTUNIDADES REAIS
              E SEGURAS, VOCÊ NÃO PAGA NADA.
            </p>
            <p className="text-[#8ba3c0] text-base lg:text-lg leading-relaxed">
              Nossos honorários são um percentual sobre valores
              recuperados e a economia tributária efetiva gerada.
              Não trabalhamos com promessas.
            </p>
            <p className="text-[#00e5ff] font-bold uppercase text-sm lg:text-base tracking-wide">
              TRABALHAMOS COM RESULTADO COMPROVADO.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(3) }}
        >
          <a
            href="#contato"
            className="inline-block rounded-full border-2 border-[#00e5ff]/40 bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#ffffff] transition-all duration-300 hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/70 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
          >
            Solicitar Diagnóstico Tributário Estratégico
          </a>
          <p className="mt-8 text-lg font-bold italic text-[#ffffff] lg:text-xl text-balance">
            Recuperar o passado é obrigação. Planejar o futuro é vantagem competitiva.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
