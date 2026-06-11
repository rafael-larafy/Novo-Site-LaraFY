/**
 * Sinal global "app pronto" — o handoff entre o preloader e a entrada do hero.
 *
 * A LoadingScreen chama `markAppReady()` quando sobe; o hero (e o que mais
 * quiser) usa `onAppReady()` para disparar sua entrada coreografada EXATAMENTE
 * quando a tela de carregamento revela a página, em vez de animar escondido
 * embaixo do loader.
 *
 * `onAppReady` dispara na hora se o app já estiver pronto (cobre a corrida em
 * que o loader termina antes do assinante montar).
 */
const EVENT = "larafy:loaded"

type WindowWithFlag = Window & { __larafyReady?: boolean }

export function markAppReady(): void {
  if (typeof window === "undefined") return
  const w = window as WindowWithFlag
  if (w.__larafyReady) return
  w.__larafyReady = true
  window.dispatchEvent(new Event(EVENT))
}

export function onAppReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const w = window as WindowWithFlag
  if (w.__larafyReady) {
    cb()
    return () => {}
  }
  const handler = () => cb()
  window.addEventListener(EVENT, handler, { once: true })
  return () => window.removeEventListener(EVENT, handler)
}
