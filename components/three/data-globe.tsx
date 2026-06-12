"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js"
import { useInView } from "@/hooks/use-in-view"
import { makeDotTexture } from "@/components/three/dot-texture"

const DETAIL = 22
const RADIUS = 1.5
const AMP = 0.12
const SCALE = 1.1

function Globe({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const points = useRef<THREE.Points>(null)
  const group = useRef<THREE.Group>(null)
  const noise = useMemo(() => new ImprovedNoise(), [])
  const sprite = useMemo(makeDotTexture, [])
  const low = useMemo(() => new THREE.Color(0.0, 0.18, 0.3), [])
  const high = useMemo(() => new THREE.Color(0.25, 0.95, 1.0), [])
  const tmp = useMemo(() => new THREE.Color(), [])

  const { geometry, base, count } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(RADIUS, DETAIL)
    const src = geo.attributes.position
    const base = Float32Array.from(src.array as Float32Array)
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(src.count * 3), 3))
    return { geometry: geo, base, count: src.count }
  }, [])

  useFrame((state, delta) => {
    const pts = points.current
    if (!pts) return
    const t = reduce ? 0 : state.clock.elapsedTime * 0.15
    const pos = pts.geometry.attributes.position
    const col = pts.geometry.attributes.color
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const bx = base[ix]
      const by = base[ix + 1]
      const bz = base[ix + 2]
      const n = noise.noise(bx * SCALE, by * SCALE, bz * SCALE + t)
      const disp = 1 + n * AMP
      pos.array[ix] = bx * disp
      pos.array[ix + 1] = by * disp
      pos.array[ix + 2] = bz * disp
      tmp.copy(low).lerp(high, THREE.MathUtils.clamp(n * 1.4 + 0.4, 0, 1))
      col.array[ix] = tmp.r
      col.array[ix + 1] = tmp.g
      col.array[ix + 2] = tmp.b
    }
    pos.needsUpdate = true
    col.needsUpdate = true

    const g = group.current
    if (g) {
      if (reduce) {
        g.rotation.set(0, 0, 0)
      } else {
        g.rotation.y += delta * 0.08 + pointer.current.x * 0.002
        const tx = pointer.current.y * 0.3
        g.rotation.x += (tx - g.rotation.x) * 0.04
      }
    }
  })

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          vertexColors
          map={sprite}
          size={0.035}
          sizeAttenuation
          transparent
          depthWrite={false}
          alphaTest={0.02}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.99, 2]} />
        <meshBasicMaterial color="#0a3a52" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

export function DataGlobe({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <Globe pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  )
}
