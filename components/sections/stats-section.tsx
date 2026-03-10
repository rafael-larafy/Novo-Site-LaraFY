"use client"

import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { useEffect, useState, useRef } from "react"
import BrasilImg from "../../lib/Brasil.png"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [hasStarted, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsSection() {
  return (
    <section
      className="relative py-20 overflow-hidden bg-[#0a1628]"
    >
      <div className="absolute inset-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0066ff]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* Stat 1 */}
          <motion.div
            className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(1) }}
          >
            <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
              +<AnimatedCounter target={5} />
            </span>
            <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
              Anos de<br />Mercado
            </span>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(2) }}
          >
            <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
              +<AnimatedCounter target={100} />
            </span>
            <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
              Especialistas
            </span>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            className="flex-1 flex items-center justify-center gap-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
            transition={{ ...scrollTransition, delay: staggerDelay(3) }}
          >
            {/* Brazil map icon */}
            <img src={BrasilImg.src || BrasilImg} alt="Mapa do Brasil" className="w-30 h-auto lg:w-20" />
            <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
              Atuação<br />Nacional
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
