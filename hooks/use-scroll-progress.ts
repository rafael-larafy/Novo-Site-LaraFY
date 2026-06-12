"use client"

import { useEffect, useRef } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface UseScrollProgressVarOptions {
  
  varName?: string
}

export function useScrollProgressVar<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollProgressVarOptions = {}
) {
  const { varName = "--prg" } = options
  const ref = useRef<T>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty(varName, v.toFixed(4))
  })

  useEffect(() => {
    ref.current?.style.setProperty(varName, "0")
  }, [varName])

  return ref
}
