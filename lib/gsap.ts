// Registro central de GSAP — importe sempre daqui, nunca registre plugins ad-hoc.

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  // Desliga o lag smoothing para o ticker dirigir o Lenis de forma estável
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
