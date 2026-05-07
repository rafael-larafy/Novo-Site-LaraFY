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
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="-400 0 2200 700" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <path d="M-800 120 H180 L220 80 H420 L460 80" stroke="#00e5ff" strokeWidth="1" />
          <path d="M-850 160 H140 L180 200 H350 L490 160 H520" stroke="#00e5ff" strokeWidth="1" />
          <path d="M-850 220 H100 L140 260 H300 L340 220 H480 L520 260 H600" stroke="#00e5ff" strokeWidth="0.8" />
          <path d="M-800 300 H200 L240 340 H400" stroke="#00e5ff" strokeWidth="1" />
          <path d="M-880 360 H160 L200 320 H360 L400 360 H550 L590 320 H700" stroke="#00e5ff" strokeWidth="0.8" />
          <path d="M-820 420 H120 L160 460 H320 L360 420 H500" stroke="#00e5ff" strokeWidth="1" />
          <path d="M-800 500 H80 L120 540 H280 L320 500 H460 L500 540 H620" stroke="#00e5ff" strokeWidth="0.8" />
          <path d="M-850 560 H200 L240 520 H380" stroke="#00e5ff" strokeWidth="0.6" />
          <path d="M-800 620 H140 L180 660 H340 L380 620 H520" stroke="#00e5ff" strokeWidth="0.6" />

          <path d="M2800 100 H1200 L1160 140 H1000 L960 100 H800" stroke="#00e5ff" strokeWidth="0.8" />
          <path d="M2950 200 H1250 L1210 240 H1050 L1010 200 H860" stroke="#00e5ff" strokeWidth="1" />
          <path d="M2950 320 H1180 L1140 280 H980 L940 320 H780" stroke="#00e5ff" strokeWidth="0.8" />
          <path d="M2980 440 H1220 L1180 480 H1020 L980 440 H820" stroke="#00e5ff" strokeWidth="1" />
          <path d="M2900 560 H1260 L1220 520 H1060 L1020 560 H880" stroke="#00e5ff" strokeWidth="0.6" />

          <circle cx="180" cy="120" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="460" cy="80" r="4" fill="#00e5ff" />
          <circle cx="350" cy="200" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="520" cy="160" r="3.5" fill="#00e5ff" />
          <circle cx="300" cy="260" r="2" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="600" cy="260" r="3" fill="#00e5ff" />
          <circle cx="400" cy="340" r="4" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="200" cy="300" r="2" fill="#00e5ff" />
          <circle cx="550" cy="360" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="700" cy="320" r="4" fill="#00e5ff" />
          <circle cx="320" cy="460" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="500" cy="420" r="3.5" fill="#00e5ff" />
          <circle cx="460" cy="540" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="620" cy="540" r="2" fill="#00e5ff" />
          <circle cx="380" cy="520" r="2" fill="#00e5ff" />
          <circle cx="520" cy="620" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />

          <circle cx="1200" cy="100" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="800" cy="100" r="4" fill="#00e5ff" />
          <circle cx="1050" cy="240" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="860" cy="200" r="3.5" fill="#00e5ff" />
          <circle cx="980" cy="280" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="780" cy="320" r="2" fill="#00e5ff" />
          <circle cx="1020" cy="480" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="820" cy="440" r="3.5" fill="#00e5ff" />
          <circle cx="1060" cy="520" r="2" fill="#00e5ff" />
          <circle cx="880" cy="560" r="3" fill="none" stroke="#00e5ff" strokeWidth="1" />

          <rect x="296" y="256" width="8" height="8" rx="1" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <rect x="546" y="356" width="8" height="8" rx="1" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <rect x="1046" y="236" width="8" height="8" rx="1" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <rect x="976" y="276" width="8" height="8" rx="1" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <rect x="456" cy="536" width="8" height="8" rx="1" fill="none" stroke="#00e5ff" strokeWidth="0.8" />

          <line x1="460" y1="80" x2="460" y2="50" stroke="#00e5ff" strokeWidth="0.6" />
          <circle cx="460" cy="46" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="700" y1="320" x2="700" y2="280" stroke="#00e5ff" strokeWidth="0.6" />
          <circle cx="700" cy="276" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="800" y1="100" x2="800" y2="60" stroke="#00e5ff" strokeWidth="0.6" />
          <circle cx="800" cy="56" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="820" y1="440" x2="820" y2="400" stroke="#00e5ff" strokeWidth="0.6" />
          <circle cx="820" cy="396" r="2.5" fill="none" stroke="#00e5ff" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h2
              data-gsap-title
              className="text-7xl font-black uppercase text-[#ffffff] leading-none lg:text-9xl tracking-tight"
            >
              ZERO
            </h2>
            <p
              data-gsap-title
              className="mt-4 text-2xl font-bold text-[#ffffff] lg:text-5xl leading-tight"
            >
              risco de investir<br />sem retorno
            </p>
          </motion.div>

          <motion.div
            className="flex-1 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <p className="text-[#ffffff] text-lg lg:text-4xl leading-relaxed text-left">
            Não encontramos oportunidades reais e seguras para o seu negócio? Você não paga nada por isso.
            </p>
          </motion.div>
        </div>

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
            className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-base sm:text-sm font-bold uppercase tracking-wider text-[#0a1628] glow-effect text-center lg:text-left"
          >
            Simule você mesmo os impactos da Reforma Tributária
          </a>
          <p className="mt-8 text-lg font-bold text-[#ffffff] lg:text-xl text-balance">
            Recuperar o passado é obrigação. Planejar o futuro é vantagem competitiva.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
