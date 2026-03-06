export const scrollViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -50px 0px",
} as const

export const scrollTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const

/** Variantes para fade + slide da esquerda */
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

/** Variantes para fade + slide da direita */
export const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

/** Variantes para fade + subir (fade up) */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

/** Variantes para fade + scale */
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

/** Helper para delay em stagger (em segundos) */
export function staggerDelay(index: number, step = 0.1) {
  return index * step
}
