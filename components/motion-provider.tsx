"use client"

import { MotionConfig } from "framer-motion"

/**
 * Aplica `reducedMotion="user"` a toda a árvore: quando o visitante liga
 * "reduzir movimento" no SO, o framer-motion neutraliza transform/scale/rotate
 * (mantendo opacidade) em todos os reveals — sem precisar gatear seção a seção.
 * WCAG 2.3.3. Para quem não tem a preferência ativa, nada muda.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
