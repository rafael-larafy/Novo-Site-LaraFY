import * as THREE from "three"

/** Sprite radial branco p/ pontos redondos com borda suave (gerado em runtime, sem asset). */
export function makeDotTexture(): THREE.CanvasTexture {
  const s = 64
  const cv = document.createElement("canvas")
  cv.width = cv.height = s
  const ctx = cv.getContext("2d")!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.45, "rgba(255,255,255,0.8)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(cv)
  tex.needsUpdate = true
  return tex
}
