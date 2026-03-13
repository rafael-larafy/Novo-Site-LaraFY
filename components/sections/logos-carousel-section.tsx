"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
} from "@/lib/scroll-motion"
import Image from "next/image"
import styles from "./logos-carousel-section.module.css"

const LOGOS = [
  { src: "/1bhH4F5IOXDtWdgplmK3aYv7A.png", alt: "Hedge Tax Consultoria Tributária" },
  { src: "/iju07z4UblNiFlAMY6nLEMkJTY.png", alt: "Planning" },
  { src: "/V9JhK28b3pDvQ0CCGD6CORGho.png", alt: "evox FISCAL" },
  { src: "/YCJlx2HqsRXmH9zcqvaanj9gU.png", alt: "IBPTOLA Business, Tax & Education" },
  { src: "/22pK2BzqFG2aQ72TkcJr2gZl6OM.webp", alt: "Marins Bertoldi" },
  { src: "/cShhepLkLpC5xavHlRoAeffEpDI.webp", alt: "AG tax" },
]

export function LogosCarouselSection() {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)

  return (
    <section className="relative py-14 lg:py-20 overflow-hidden bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          className="text-center text-lg sm:text-xl font-semibold text-[#c5d9f3] uppercase tracking-wider mb-10 lg:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={scrollTransition}
        >
          Parceiros e clientes
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className={styles.marquee}>
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <button
              key={`${logo.alt}-${i}`}
              type="button"
              onClick={() => setTappedIndex(tappedIndex === i ? null : i)}
              className={`flex-shrink-0 mx-4 lg:mx-12 flex items-center justify-center transition-all duration-300 min-w-[80px] lg:min-w-[160px] cursor-pointer bg-transparent border-0 p-0 ${
                tappedIndex === i ? "grayscale-0 opacity-100" : "grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={188}
                height={80}
                sizes="(max-width: 1024px) 80px, 160px"
                className="h-8 w-auto object-contain lg:h-14"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
