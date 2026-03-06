"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  scaleVariants,
} from "@/lib/scroll-motion"

export function DiferencialSection() {
  return (
    <section className="relative py-12 overflow-hidden bg-[#e8f4f8]">
      {/* Background network pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
          {[
            { x: 20, y: 80, lx: 0, ly: 0 },
            { x: 85, y: 140, lx: 20, ly: 80 },
            { x: 155, y: 40, lx: 85, ly: 140 },
            { x: 230, y: 170, lx: 155, ly: 40 },
            { x: 310, y: 60, lx: 230, ly: 170 },
            { x: 400, y: 120, lx: 310, ly: 60 },
            { x: 480, y: 30, lx: 400, ly: 120 },
            { x: 560, y: 150, lx: 480, ly: 30 },
            { x: 650, y: 90, lx: 560, ly: 150 },
            { x: 740, y: 180, lx: 650, ly: 90 },
            { x: 830, y: 50, lx: 740, ly: 180 },
            { x: 920, y: 130, lx: 830, ly: 50 },
            { x: 1010, y: 70, lx: 920, ly: 130 },
            { x: 1100, y: 160, lx: 1010, ly: 70 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="2" fill="#0a1628" />
              {i > 0 && (
                <line x1={p.x} y1={p.y} x2={p.lx} y2={p.ly} stroke="#0a1628" strokeWidth="0.5" />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
        >
          {/* Left - Title */}
          <div className="bg-[#0d1d33] px-10 py-8 flex items-center justify-center lg:min-w-[280px]">
            <h2 className="text-3xl font-extrabold text-[#00e5ff] lg:text-4xl">
              O Diferencial
            </h2>
          </div>

          {/* Right - Description */}
          <div className="bg-[#00e5ff] px-10 py-8 flex items-center flex-1">
            <p className="text-base text-[#0a1628] leading-relaxed lg:text-lg">
              Entregamos as oportunidades de recuperacao e de seguranca juridica a
              longo prazo, mas, principalmente, entregamos a paz de espirito de que a
              operacao esta 100% adequada.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
