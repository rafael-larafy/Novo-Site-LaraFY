"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js"
import { useInView } from "@/hooks/use-in-view"
import { makeDotTexture } from "@/components/three/dot-texture"

const COUNT = 1500
const BOUND = 7
const SCALE = 0.17
const FORCE = 1.1
const DAMP = 0.86
const MAXLIFE = 6

function Flow({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const noise = useMemo(() => new ImprovedNoise(), [])
  const sprite = useMemo(makeDotTexture, [])
  const high = useMemo(() => new THREE.Color(0.2, 0.95, 1.0), [])

  const { geometry, sim } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    const life = new Float32Array(COUNT)
    const maxLife = new Float32Array(COUNT)
    const spawn = (i: number) => {
      positions[i * 3] = (Math.random() * 2 - 1) * BOUND
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUND * 0.6
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUND * 0.5
      vel[i * 3] = vel[i * 3 + 1] = vel[i * 3 + 2] = 0
      maxLife[i] = (0.5 + Math.random() * 0.5) * MAXLIFE
      life[i] = maxLife[i] * Math.random()
    }
    for (let i = 0; i < COUNT; i++) spawn(i)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return { geometry: geo, sim: { positions, colors, vel, life, maxLife, spawn } }
  }, [])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    const d = Math.min(delta, 0.05)
    const t = reduce ? 0 : state.clock.elapsedTime * 0.06
    const { positions, colors, vel, life, maxLife, spawn } = sim

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      let x = positions[ix]
      let y = positions[ix + 1]
      let z = positions[ix + 2]

      const a = noise.noise(x * SCALE, y * SCALE, z * SCALE + t) * Math.PI * 4
      const b = noise.noise(x * SCALE + 50, y * SCALE + 50, z * SCALE - t) * Math.PI * 2
      const dx = Math.cos(a) * Math.sin(b)
      const dy = Math.sin(a) * Math.sin(b)
      const dz = Math.cos(b)

      vel[ix] = vel[ix] * DAMP + dx * FORCE * d
      vel[ix + 1] = vel[ix + 1] * DAMP + dy * FORCE * d
      vel[ix + 2] = vel[ix + 2] * DAMP + dz * FORCE * d
      x += vel[ix]
      y += vel[ix + 1]
      z += vel[ix + 2]

      let l = life[i] - d
      if (l <= 0 || Math.abs(x) > BOUND * 1.3 || Math.abs(y) > BOUND || Math.abs(z) > BOUND) {
        spawn(i)
      } else {
        positions[ix] = x
        positions[ix + 1] = y
        positions[ix + 2] = z
        life[i] = l
      }

      const bri = Math.sin(Math.PI * (1 - life[i] / maxLife[i]))
      colors[ix] = high.r * bri
      colors[ix + 1] = high.g * bri
      colors[ix + 2] = high.b * bri
    }

    pts.geometry.attributes.position.needsUpdate = true
    pts.geometry.attributes.color.needsUpdate = true

    if (!reduce) {
      const ty = pointer.current.x * 0.18
      const tx = pointer.current.y * 0.12
      pts.rotation.y += (ty - pts.rotation.y) * 0.04
      pts.rotation.x += (tx - pts.rotation.x) * 0.04
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        vertexColors
        map={sprite}
        size={0.085}
        sizeAttenuation
        transparent
        depthWrite={false}
        alphaTest={0.02}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function CurlFlow({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <Flow pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  )
}
