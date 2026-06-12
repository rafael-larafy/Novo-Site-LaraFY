"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

const N = 700
const PALETTE = ["#00e5ff", "#22d3ee", "#0a7ea4", "#0891b2", "#063b52"]

function Corridor({ reduce }: { reduce: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const camera = useThree((s) => s.camera)
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1), [])
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), [])

  const items = useMemo(
    () =>
      Array.from({ length: N }, () => ({
        x: Math.round(Math.random() * 30) - 15.5,
        y: Math.round(Math.random()) * 4 - 2, // piso (-2) ou teto (2)
        z: Math.random() * -80 - 0.5,
        color: new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]),
      })),
    []
  )

  useEffect(() => {
    const m = mesh.current
    if (!m) return
    for (let i = 0; i < N; i++) {
      const it = items[i]
      dummy.position.set(it.x, it.y, it.z)
      dummy.rotation.set(-Math.PI / 2, 0, 0)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, it.color)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [items, dummy])

  useFrame((_, delta) => {
    const m = mesh.current
    if (!m || reduce) return
    const d = Math.min(delta, 0.05)
    for (let i = 0; i < N; i++) {
      const it = items[i]
      it.z += 7 * d
      if (it.z > 4) it.z = -80
      dummy.position.set(it.x, it.y, it.z)
      dummy.rotation.set(-Math.PI / 2, 0, 0)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
    camera.rotation.z += 0.0004
  })

  return <instancedMesh ref={mesh} args={[geo, mat, N]} />
}

export function DataCorridor({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false
  const { ref, inView } = useInView<HTMLDivElement>("160px")
  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <color attach="background" args={["#020a14"]} />
        <fogExp2 attach="fog" args={["#020a14", 0.026]} />
        <Corridor reduce={reduce} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.1} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
