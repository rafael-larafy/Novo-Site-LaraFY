"use client"

// "Cristais ramificando" — caixas crescem do centro ao longo de trajetórias
// aleatórias, pulsando de escala (sin). Adaptado de bobbyroe/crystal-branching p/
// R3F + ciano, via InstancedMesh (1 draw call). Gira devagar + tilt pelo ponteiro;
// sob reduced-motion fica estático. Pausa fora da viewport.

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

type Box = { pos: THREE.Vector3; quat: THREE.Quaternion; size: number; index: number; color: THREE.Color }

function Crystal({ pointer, reduce }: { pointer: React.RefObject<{ x: number; y: number }>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geo = useMemo(() => new THREE.BoxGeometry(0.34, 0.34, 0.34), [])
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 0.4,
        emissive: new THREE.Color("#00343f"),
        emissiveIntensity: 0.5,
      }),
    []
  )

  const boxes = useMemo<Box[]>(() => {
    const arr: Box[] = []
    const e = new THREE.Euler()
    const push = (pos: THREE.Vector3, size: number, index: number, light: number) => {
      e.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
      arr.push({
        pos,
        quat: new THREE.Quaternion().setFromEuler(e),
        size,
        index,
        color: new THREE.Color().setHSL(0.5, 1, light),
      })
    }
    push(new THREE.Vector3(), 1.3, 0, 0.6) // núcleo
    const numBranches = 20
    for (let b = 0; b < numBranches; b++) {
      const traj = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
      const num = 11
      for (let i = 0; i < num; i++) {
        push(traj.clone().multiplyScalar((i + 1) * 0.25 + 0.25), 1 - i / num, i + 1, 0.16 + i * 0.04)
      }
    }
    return arr
  }, [])

  useEffect(() => {
    const m = mesh.current
    if (!m) return
    for (let i = 0; i < boxes.length; i++) m.setColorAt(i, boxes[i].color)
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [boxes])

  useFrame((state) => {
    const m = mesh.current
    if (!m) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < boxes.length; i++) {
      const bx = boxes[i]
      const s = reduce ? bx.size * 0.55 : Math.abs(Math.sin(t * 0.5 + bx.index * 0.12)) * bx.size
      dummy.position.copy(bx.pos)
      dummy.quaternion.copy(bx.quat)
      dummy.scale.setScalar(Math.max(0.001, s * 0.34))
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
    const g = group.current
    if (g && !reduce) {
      g.rotation.x = t * 0.05
      g.rotation.y = t * 0.08 + pointer.current.x * 0.4
    }
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 4]} intensity={30} color="#00e5ff" distance={20} />
      <pointLight position={[-3, -2, 2]} intensity={14} color="#0a7ea4" distance={18} />
      <instancedMesh ref={mesh} args={[geo, mat, boxes.length]} />
    </group>
  )
}

export function CrystalBranching({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <Crystal pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  )
}
