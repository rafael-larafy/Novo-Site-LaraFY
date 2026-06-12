"use client"

import type { ElementType, ReactNode } from "react"
import { motion } from "framer-motion"
import { SplitReveal } from "@/components/split-reveal"
import { scrollViewport, scrollTransition, fadeUpVariants, staggerDelay } from "@/lib/scroll-motion"
import { TITLE_CLASS } from "@/components/ui/editorial"
import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  tone = "hud",
  className,
}: {
  children: ReactNode
  tone?: "hud" | "cyan"
  className?: string
}) {
  return (
    <motion.p
      className={cn(
        "font-mono text-[11px] uppercase leading-none tracking-[0.18em]",
        tone === "cyan" ? "text-[#00e5ff]" : "text-[#5f86a6]",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUpVariants}
      transition={scrollTransition}
    >
      {children}
    </motion.p>
  )
}

/**
 * Cabeçalho de seção padrão: eyebrow + título (SplitReveal palavra a palavra) +
 * lead opcional. Assinatura tipográfica única da home.
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone = "hud",
  title,
  as = "h2",
  lead,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode
  eyebrowTone?: "hud" | "cyan"
  title: string
  as?: ElementType
  lead?: ReactNode
  align?: "left" | "center"
  className?: string
  titleClassName?: string
}) {
  return (
    <div className={cn("space-y-4", align === "center" ? "text-center" : "text-center lg:text-left", className)}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <SplitReveal
        as={as}
        type="words"
        className={cn(TITLE_CLASS, "text-white", titleClassName)}
      >
        {title}
      </SplitReveal>
      {lead && (
        <motion.p
          className={cn("text-base text-white/70 sm:text-lg", align === "center" ? "mx-auto max-w-2xl" : "max-w-xl")}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUpVariants}
          transition={{ ...scrollTransition, delay: staggerDelay(2) }}
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}
