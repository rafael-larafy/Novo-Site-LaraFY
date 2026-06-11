"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Retorna um `ref` e um booleano `inView` que indica se o elemento está (perto
 * de) visível na viewport. Usado para PAUSAR animações caras (render loops de
 * WebGL) quando saem da tela — derruba o trabalho de main-thread/GPU e poupa
 * bateria no mobile.
 *
 * Começa `true` de propósito: evita um "buraco" no primeiro paint enquanto o
 * IntersectionObserver ainda não reportou. Em ambientes sem IO, fica sempre
 * visível (degrada para o comportamento atual).
 */
export function useInView<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
