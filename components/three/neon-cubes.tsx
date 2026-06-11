"use client"

// "Cubos neon" — cubos wireframe aninhados girando com sin, aditivo + Bloom.
// Adaptado de bobbyroe/Spinning-Neon-Cubes p/ R3F + ciano (com EdgesGeometry +
// lineBasicMaterial no lugar do Line2). Tilt pelo ponteiro; estático sob
// reduced-motion. Pausa fora da viewport.

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

const COUNT = 16

function Cubes({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const refs = useRef<THREE.LineSegments[]>([])
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), [])
  const colors = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => new THREE.Color().setHSL(0.5 + (i / COUNT) * 0.05, 1, 0.5)),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const m = refs.current[i]
      if (!m) continue
      const offset = 1 - i * 0.04
      const r = reduce ? offset : Math.sin(offset + t * 0.25) * 2
      m.rotation.x = r
      m.rotation.y = r
    }
    const g = group.current
    if (g && !reduce) {
      g.rotation.y += (pointer.current.x * 0.4 - g.rotation.y) * 0.04
      g.rotation.x += (pointer.current.y * 0.3 - g.rotation.x) * 0.04
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: COUNT }, (_, i) => (
        <lineSegments
          key={i}
          geometry={edges}
          ref={(el) => {
            if (el) refs.current[i] = el
          }}
          scale={1 + i * 0.12}
        >
          <lineBasicMaterial
            color={colors[i]}
            transparent
            opacity={0.35}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      ))}
    </group>
  )
}

export function NeonCubes({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <color attach="background" args={["#04101f"]} />
        <Cubes pointer={pointer} reduce={reduce} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.0} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
