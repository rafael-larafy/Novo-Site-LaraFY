"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  scaleVariants,
} from "@/lib/scroll-motion"

export function ReformaCardSection() {
  return (
    <section className="relative py-16 lg:py-10 overflow-hidden bg-[#00e5ff]/10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 via-transparent to-[#0a1628]/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-stretch rounded-3xl overflow-hidden shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
        >
          <div className="relative flex-1 bg-[#ffffff] p-10 lg:p-14 flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                {[
                  { x: 40, y: 50, lx: 150, ly: 120 },
                  { x: 120, y: 200, lx: 280, ly: 80 },
                  { x: 200, y: 30, lx: 100, ly: 250 },
                  { x: 300, y: 150, lx: 350, ly: 270 },
                  { x: 370, y: 80, lx: 200, ly: 180 },
                  { x: 60, y: 270, lx: 320, ly: 220 },
                  { x: 250, y: 250, lx: 80, ly: 100 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="2" fill="#0a1628" />
                    <line x1={p.x} y1={p.y} x2={p.lx} y2={p.ly} stroke="#0a1628" strokeWidth="0.3" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="relative z-10">
              <h2
                data-gsap-title
                className="text-4xl font-black uppercase text-[#0a1628] lg:text-6xl leading-tight"
              >
                Reforma<br />Tributaria
              </h2>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#4a6080]">
                Autoridade de Futuro
              </p>
            </div>
          </div>

          <div className="flex-1 bg-[#0d1d33] p-10 lg:p-14 flex flex-col justify-center">
            <h3
              data-gsap-title
              className="text-2xl font-extrabold text-[#00e5ff] lg:text-3xl leading-tight text-balance"
            >
              A Reforma Tributária não é um evento isolado, é um processo.
            </h3>
            <div className="mt-6 space-y-4">
              <p className="text-[#ffffff] leading-relaxed">
              Há quem vai correr atrás do lucro e quem vai ficar observando a concorrência ganhar. De qual lado você quer estar?
              </p>
              <p><strong>Com a LaraFy, você recebe:</strong> </p>
              <ul className="space-y-2 text-[#8ba3c0]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#00e5ff]">&#8226;</span>
                  Simulações constantes de impacto (IVA Dual).
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#00e5ff]">&#8226;</span>
                  Ajustes estratégicos em tempo real.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#00e5ff]">&#8226;</span>
                  Proteção da margem e dos contratos.
                </li>
              </ul>
            </div>
            <p className="mt-8 text-xl font-bold uppercase text-[#00e5ff] tracking-wide leading-tight">
              Trabalhe com quem entende do cenário.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
