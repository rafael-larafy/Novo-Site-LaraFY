"use client"

import { useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

function Tunnel({ reduce }: { reduce: boolean }) {
  const camera = useThree((s) => s.camera)

  const { edges, boxes, curve, boxEdges } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const N = 8
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * 3 + (Math.random() - 0.5) * 2,
          Math.sin(a * 1.3) * 2.4 + (Math.random() - 0.5) * 2,
          Math.sin(a) * 3 + (Math.random() - 0.5) * 2
        )
      )
    }
    const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5)
    const tube = new THREE.TubeGeometry(curve, 200, 0.62, 14, true)
    const edges = new THREE.EdgesGeometry(tube, 0.2)
    tube.dispose()
    const boxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.13, 0.13, 0.13), 0.2)
    const boxes = Array.from({ length: 40 }, (_, i) => {
      const p = i / 40
      const pos = curve.getPointAt(p)
      return {
        pos: [pos.x, pos.y, pos.z] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        color: new THREE.Color().setHSL(0.52 - p * 0.12, 1, 0.5),
      }
    })
    return { edges, boxes, curve, boxEdges }
  }, [])

  useFrame((state) => {
    const loop = 20
    const p = reduce ? 0 : (state.clock.elapsedTime % loop) / loop
    camera.position.copy(curve.getPointAt(p))
    camera.lookAt(curve.getPointAt((p + 0.02) % 1))
  })

  return (
    <group>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00e5ff" toneMapped={false} transparent opacity={0.85} />
      </lineSegments>
      {boxes.map((b, i) => (
        <lineSegments key={i} geometry={boxEdges} position={b.pos} rotation={b.rot}>
          <lineBasicMaterial color={b.color} toneMapped={false} />
        </lineSegments>
      ))}
    </group>
  )
}

export function Wormhole({ className }: { className?: string }) {
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
        <fogExp2 attach="fog" args={["#020a14", 0.16]} />
        <Tunnel reduce={reduce} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
