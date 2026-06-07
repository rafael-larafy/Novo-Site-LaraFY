"use client"

import { useEffect, useRef } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface UseScrollProgressVarOptions {
  /** Nome da CSS var escrita no elemento. Default "--prg" (= o do Lumena). */
  varName?: string
}

/**
 * Escreve o progresso de scroll [0..1] numa CSS custom property do elemento
 * referenciado — espelhando a arquitetura do lumena-partners.com, onde o JS
 * só atualiza `--prg` e o CSS decide o que fazer (transform / opacity / clip).
 *
 * O progresso é medido enquanto o elemento atravessa a viewport
 * (offset start-end → end-start). Anexe o ref ao elemento de REFERÊNCIA (que
 * NÃO recebe transform) e leia a var num filho, para evitar feedback de medição.
 *
 *   const ref = useScrollProgressVar()
 *   <section ref={ref}>
 *     <div style={{ transform: "translateY(calc(var(--prg) * -40px))" }} />
 *   </section>
 */
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
