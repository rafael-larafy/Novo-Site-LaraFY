"use client"

import { useEffect, useState } from "react"

import { useScrollProgressVar } from "@/hooks/use-scroll-progress"
import { cn } from "@/lib/utils"

interface ParallaxProps {
  children: React.ReactNode
  /** Curso vertical total em px ao longo da passagem pela viewport. Default 60. */
  amount?: number
  /** Classes do container de referência (deve ser um box posicionado, ex.: "absolute inset-0"). */
  className?: string
}

/**
 * Parallax vertical dirigido por scroll-progress → CSS var (padrão do Lumena).
 *
 * O container externo (referência) NÃO recebe transform — só mede o progresso e
 * escreve `--prg`. O filho interno lê `--prg` e translada. O `scale` esconde as
 * bordas durante o deslocamento. Respeita `prefers-reduced-motion` (fica estático).
 *
 *   <Parallax className="absolute inset-0" amount={90}>
 *     <Image src="..." fill className="object-cover" />
 *   </Parallax>
 */
export function Parallax({ children, amount = 60, className }: ParallaxProps) {
  const ref = useScrollProgressVar<HTMLDivElement>()
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className="absolute inset-0 will-change-transform"
        style={
          reduce
            ? { transform: "scale(1.2)" }
            : {
                transform: `translate3d(0, calc((var(--prg, 0) - 0.5) * ${amount}px), 0) scale(1.2)`,
              }
        }
      >
        {children}
      </div>
    </div>
  )
}
