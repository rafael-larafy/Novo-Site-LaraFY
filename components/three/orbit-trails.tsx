"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"
import { makeDotTexture } from "@/components/three/dot-texture"

const LAYERS = 26

function IcoLayer({ index, sprite, reduce }: { index: number; sprite: THREE.Texture; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const offset = index * 0.012

  const { positions, colors } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 4)
    const src = geo.attributes.position
    const positions = Float32Array.from(src.array as Float32Array)
    const colors = new Float32Array(src.count * 3)
    const c = new THREE.Color()
    const p = new THREE.Vector3()
    for (let i = 0; i < src.count; i++) {
      p.fromBufferAttribute(src, i)
      c.setHSL(0.5 + p.x * 0.03, 1.0, Math.min(0.6, 0.16 + index * 0.013))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geo.dispose()
    return { positions, colors }
  }, [index])

  useFrame((state) => {
    if (!ref.current || reduce) return
    const t = state.clock.elapsedTime * 0.2 + offset
    ref.current.rotation.x = t
    ref.current.rotation.y = t
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={sprite}
        size={0.012 + index * 0.0016}
        sizeAttenuation
        transparent
        alphaTest={0.02}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Orb({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const sprite = useMemo(makeDotTexture, [])

  useFrame(() => {
    const g = group.current
    if (!g || reduce) return
    const ty = pointer.current.x * 0.4
    const tx = pointer.current.y * 0.3
    g.rotation.y += (ty - g.rotation.y) * 0.05
    g.rotation.x += (tx - g.rotation.x) * 0.05
  })

  return (
    <group ref={group}>
      {Array.from({ length: LAYERS }, (_, i) => (
        <IcoLayer key={i} index={i} sprite={sprite} reduce={reduce} />
      ))}
    </group>
  )
}

export function OrbitTrails({ className }: { className?: string }) {
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
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <Orb pointer={pointer} reduce={reduce} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.1} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
