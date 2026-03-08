"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  scaleVariants,
} from "@/lib/scroll-motion"

function HexPattern({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 40, y: 50, lx: 150, ly: 120 },
    { x: 120, y: 200, lx: 280, ly: 80 },
    { x: 200, y: 30, lx: 100, ly: 250 },
    { x: 300, y: 150, lx: 350, ly: 270 },
    { x: 370, y: 80, lx: 200, ly: 180 },
    { x: 60, y: 270, lx: 320, ly: 220 },
    { x: 250, y: 250, lx: 80, ly: 100 },
    { x: 180, y: 140, lx: 290, ly: 190 },
  ]
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none">
      {nodes.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2" fill="currentColor" />
          <line
            x1={p.x}
            y1={p.y}
            x2={p.lx}
            y2={p.ly}
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </g>
      ))}
    </svg>
  )
}

export function DiagnosticoSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#0a1628]">
      {/* Background hexagonal pattern */}
      <div className="absolute inset-0 text-white/10">
        <HexPattern className="w-full h-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          className="relative rounded-[28px] overflow-hidden bg-white shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleVariants}
          transition={scrollTransition}
        >
          {/* Hex pattern inside card */}
          <div className="absolute inset-0 text-[#0a1628]/[0.06] pointer-events-none">
            <HexPattern className="w-full h-full" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left column - Headline (55-60%) */}
            <div className="flex-1 lg:flex-[1.2] p-10 lg:p-14 flex items-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.15] tracking-tight text-[#0a1628] uppercase">
                Tributo não é despesa.
                <br />
                É estratégia.
              </h2>
            </div>

            {/* Right column - Description + CTA (40-45%) */}
            <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-[#e5e7eb]">
              <p className="text-base lg:text-lg text-[#333333] leading-relaxed">
                Solicite um diagnóstico tributário estratégico e entenda, com
                profundidade, como sua empresa pode operar com mais eficiência,
                segurança e previsibilidade de caixa.
              </p>
              <a
                href="#contato"
                className="cta-button inline-block w-fit rounded-xl bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105"
              >
                Solicitar diagnóstico estratégico
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
