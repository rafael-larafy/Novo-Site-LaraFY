"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

const FILL = 0.265 // 26,5%

function Gauge({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const arc = useRef<THREE.Mesh>(null)
  const orbit = useRef<THREE.Group>(null)

  const dots = useMemo(
    () => Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2 * FILL),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const g = group.current
    if (g) {
      if (reduce) {
        g.rotation.set(0, 0, 0)
      } else {
        const tx = pointer.current.y * 0.25
        const ty = pointer.current.x * 0.35
        g.rotation.x += (tx - g.rotation.x) * 0.05
        g.rotation.y += (ty - g.rotation.y) * 0.05
      }
    }
    if (arc.current && !reduce) {
      const mat = arc.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.6 + Math.sin(t * 1.6) * 0.18
    }
    if (orbit.current && !reduce) orbit.current.rotation.z = t * 0.25
  })

  return (
    <group ref={group}>
      
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.06, 16, 120]} />
        <meshStandardMaterial color="#16314c" roughness={0.7} metalness={0.2} />
      </mesh>

      
      <mesh ref={arc} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.13, 20, 120, Math.PI * 2 * FILL]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.65} roughness={0.25} metalness={0.3} />
      </mesh>

      
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.78, 0.012, 8, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.35} transparent opacity={0.5} />
      </mesh>

      
      <group ref={orbit} rotation={[0, 0, Math.PI / 2]}>
        {dots.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 2.2, Math.sin(a) * 2.2, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#9af2ff" emissive="#9af2ff" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function IvaGauge({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 8]} intensity={0.7} />
        <pointLight position={[0, 0, 5]} intensity={22} color="#00e5ff" distance={14} />
        <Gauge pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  )
}
