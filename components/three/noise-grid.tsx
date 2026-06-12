"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js"
import { useInView } from "@/hooks/use-in-view"

const SEG = 48 // resolução da malha (SEG+1 ao quadrado pontos)
const SIZE = 16 // tamanho do plano em unidades de mundo
const NSCALE = 0.16 // frequência do ruído
const ZSCALE = 1.35 // amplitude do relevo
const SPEED = 0.14 // velocidade da animação
const TILT = -0.5 // inclinação base do plano (rad)

function makeDotTexture() {
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

function Grid({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const noise = useMemo(() => new ImprovedNoise(), [])
  const low = useMemo(() => new THREE.Color(0.0, 0.12, 0.2), [])
  const high = useMemo(() => new THREE.Color(0.1, 0.95, 1.0), [])
  const tmp = useMemo(() => new THREE.Color(), [])
  const sprite = useMemo(makeDotTexture, [])

  const { geometry, base } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG)
    const count = geo.attributes.position.count
    const base = Float32Array.from(geo.attributes.position.array as Float32Array)
    const colors = new Float32Array(count * 3)
    const pos = geo.attributes.position
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const x = base[i * 3]
      const y = base[i * 3 + 1]
      const n = noise.noise(x * NSCALE, y * NSCALE, 0)
      pos.array[i * 3 + 2] = n * ZSCALE
      c.copy(low).lerp(high, THREE.MathUtils.clamp(n * 1.5 + 0.35, 0, 1))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    pos.needsUpdate = true
    return { geometry: geo, base }
  }, [noise, low, high])

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = reduce ? 0 : state.clock.elapsedTime * SPEED
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute
    const col = pts.geometry.attributes.color as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3]
      const y = base[i * 3 + 1]
      const n = noise.noise(x * NSCALE, y * NSCALE, t)
      pos.array[i * 3 + 2] = n * ZSCALE
      tmp.copy(low).lerp(high, THREE.MathUtils.clamp(n * 1.5 + 0.35, 0, 1))
      col.array[i * 3] = tmp.r
      col.array[i * 3 + 1] = tmp.g
      col.array[i * 3 + 2] = tmp.b
    }
    pos.needsUpdate = true
    col.needsUpdate = true

    if (reduce) return
    const tx = TILT + pointer.current.y * 0.12
    const ty = pointer.current.x * 0.22
    pts.rotation.x += (tx - pts.rotation.x) * 0.05
    pts.rotation.y += (ty - pts.rotation.y) * 0.05
  })

  return (
    <points ref={ref} geometry={geometry} rotation={[TILT, 0, 0]}>
      <pointsMaterial
        vertexColors
        map={sprite}
        size={0.1}
        sizeAttenuation
        transparent
        depthWrite={false}
        alphaTest={0.02}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function NoiseGrid({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false
  const { ref, inView } = useInView<HTMLDivElement>("160px")
  const pointer = useRef({ x: 0, y: 0 })

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  return (
    <div ref={ref} className={className} onPointerMove={onPointerMove} aria-hidden>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.2, 7.5], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <Grid pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  )
}
