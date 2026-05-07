"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
      "Uma análise estratégica do seu histórico tributário, que transforma dados em oportunidades e orienta decisões com confiança.",
  },
  {
    icon: FileText,
    title: "Fundamentação Técnica",
    description: "Cada centavo recuperado possui lastro legal e documental.",
  },
  {
    icon: Scale,
    title: "Segurança Jurídica",
    description:
      "O raio-x que encontra oportunidades de recuperação administrativa e otimização de caixa que o seu ERP ignora.",
  },
  {
    icon: Users,
    title: "Inteligência Humana",
    description:
      "A nossa equipe humana, altamente especializada, analisa dados, traça estratégias, valida a tática e implementa ações, 100% baseados em inteligência e dados.",
  },
]

export function BlindagemSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#e8f4f8]">
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
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-10 mb-16 text-center sm:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          <div className="relative flex-shrink-0 w-28 h-28 lg:w-36 lg:h-36 float-effect">
            <Image src="/security.png" alt="Segurança" width={144} height={144} sizes="(max-width: 1024px) 112px, 144px" className="w-full h-full object-contain drop-shadow-xl" loading="lazy" />
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h2
              data-gsap-title
              className="text-3x1 font-extrabold text-[#0a1628] lg:text-5xl text-balance max-w-3xl"
            >
              O seu negócio é blindado em todos os cenários possíveis.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              data-gsap-tilt
              className="group relative rounded-2xl bg-[#ffffff] p-6 shadow-lg shadow-[#0a1628]/5 transition-all duration-500 hover:shadow-xl hover:shadow-[#00e5ff]/15"
              style={{ perspective: "800px" }}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(i + 1) }}
            >
              <div
                data-gsap-tilt-inner
                className="relative"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
