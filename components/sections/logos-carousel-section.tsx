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
  { src: "/Luson.png", alt: "Luson" },
  { src: "/Pinfer.png", alt: "Pinfer" },
  { src: "/Zanette.png", alt: "Zanette" },
  { src: "/Calcario.png", alt: "Calcario" },
  { src: "/Kapazi.png", alt: "Kapazi" },
  { src: "/CargoSoft.png", alt: "Cargo Soft" },
]

export function LogosCarouselSection() {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)

  return (
    <section className="relative py-10 lg:pb-10 pt-10 overflow-hidden bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-bold text-[#ffffff] tracking-wider mb-10 lg:mb-0 mt-10"
          initial="hidden"
          whileInView="visible"
          style={{ '--font-montserrat': 'var(--font-montserrat)' } as React.CSSProperties}
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
                className="h-8 w-auto object-contain lg:h-80 brightness-0 invert"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
