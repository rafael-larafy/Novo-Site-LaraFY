"use client"

import { useEffect, useRef, useState } from "react"

interface LazyBgVideoProps {
  src: string
  className?: string
  poster?: string
}

/**
 * Vídeo de fundo com carregamento PREGUIÇOSO. Um `<video autoPlay>` com `src`
 * direto força o navegador a baixar o arquivo inteiro no load da página, mesmo
 * fora da viewport — o que, com um vídeo pesado, destrói o LCP/TBT no mobile.
 *
 * Aqui o `src` só é definido quando a seção chega perto da viewport
 * (IntersectionObserver com margem), e o play dispara nesse momento. Antes
 * disso, `preload="none"` garante zero bytes baixados. Resultado: o vídeo sai
 * do caminho crítico do carregamento inicial.
 */
export function LazyBgVideo({ src, className, poster }: LazyBgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (load) ref.current?.play().catch(() => {})
  }, [load])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={load ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden
    />
  )
}
