// Registro central de GSAP + plugins. Importe SEMPRE daqui (nunca registre
// plugins ad-hoc em componentes) para evitar registros duplicados.
//
//   import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap"
//
// SplitText e ScrollTrigger são gratuitos desde o GSAP 3.13.

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  // Desliga o lag smoothing para o ticker dirigir o Lenis de forma estável
  // (loop único — ver components/smooth-scroll.tsx).
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
