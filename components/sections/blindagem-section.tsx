"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { Search, FileText, Scale, Users } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Varredura Total",
    description:
      "Uma analise estrategica do historico tributario, que transforma dados em oportunidades e orienta decisoes com confianca.",
  },
  {
    icon: FileText,
    title: "Fundamentacao Tecnica",
    description: "Cada centavo recuperado possui lastro legal e documental.",
  },
  {
    icon: Scale,
    title: "Seguranca Juridica",
    description:
      "O Raio-X que encontra oportunidades de recuperacao administrativa e otimizacao de caixa que seu ERP ignora.",
  },
  {
    icon: Users,
    title: "A Inteligencia Humana",
    description:
      "A nossa equipe humana, altamente especializada, analisa dados, traca estrategias, valida a tatica e implementa acoes, 100% baseados em inteligencia e dados.",
  },
]

export function BlindagemSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#e8f4f8]">
      {/* Background network pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
          {[
            { x: 80, y: 120, lx: 320, ly: 80 },
            { x: 200, y: 450, lx: 480, ly: 320 },
            { x: 350, y: 60, lx: 120, ly: 280 },
            { x: 500, y: 300, lx: 740, ly: 150 },
            { x: 620, y: 520, lx: 400, ly: 400 },
            { x: 780, y: 90, lx: 960, ly: 250 },
            { x: 900, y: 380, lx: 650, ly: 500 },
            { x: 1050, y: 200, lx: 830, ly: 50 },
            { x: 150, y: 550, lx: 380, ly: 480 },
            { x: 1100, y: 500, lx: 920, ly: 560 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="3" fill="#0a1628" />
              <line x1={p.x} y1={p.y} x2={p.lx} y2={p.ly} stroke="#0a1628" strokeWidth="0.3" />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with shield */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-10 mb-16 text-center sm:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          {/* Shield icon */}
          <div className="relative flex-shrink-0 w-28 h-32 lg:w-36 lg:h-40 float-effect">
            <svg viewBox="0 0 80 96" fill="none" className="w-full h-full drop-shadow-xl">
              <path
                d="M40 4L8 20V48C8 72 40 92 40 92C40 92 72 72 72 48V20L40 4Z"
                fill="#0d1d33"
                stroke="#1e3a5f"
                strokeWidth="1.5"
              />
              <rect x="30" y="42" width="20" height="18" rx="3" fill="#1e3a5f" />
              <path
                d="M34 42V36C34 32 36 30 40 30C44 30 46 32 46 36V42"
                stroke="#8ba3c0"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="40" cy="51" r="2.5" fill="#8ba3c0" />
            </svg>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#e8a838] flex items-center justify-center shadow-lg">
              <span className="text-white text-sm lg:text-base font-extrabold">3</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-3x1 font-extrabold text-[#0a1628] lg:text-5xl text-balance max-w-3xl">
              Seu negócio blindado em todos os cenários possíveis.
            </h2>
            <p className="mt-3 text-base lg:text-lg text-[#4a6080] max-w-xl">
              Nossa atuação é desenhada para blindar o seu caixa, aliando:
            </p>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl bg-[#ffffff] p-6 shadow-lg shadow-[#0a1628]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#00e5ff]/10"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(i + 1) }}
            >
              {/* Icon */}
              <div className="-mt-10 mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00e5ff] text-[#0a1628] shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" strokeWidth={2} />
                </div>
              </div>

              <h3 className="text-center text-lg font-bold text-[#0a1628] mb-3">
                {feature.title}
              </h3>
              <p className="text-center text-sm text-[#4a6080] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
