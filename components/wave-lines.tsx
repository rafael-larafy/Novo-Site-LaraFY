"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import * as THREE from "three"

import { useInView } from "@/hooks/use-in-view"

/**
 * "Wave lines" — réplica da técnica de Animated Line Art do bobbyroe
 * (github.com/bobbyroe/Animated-Line-Art), adaptada à marca Larafy:
 * várias linhas (MeshLine) empilhadas em PROFUNDIDADE, cada uma uma senoide
 * viajante com defasagem → fita 3D fluida; AdditiveBlending + Bloom = glow.
 * Cor ciano (em vez do roxo original), fundo navy opaco, parallax do mouse.
 * Respeita prefers-reduced-motion.
 */

extend({ MeshLineGeometry, MeshLineMaterial })

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
  }
}

const NUM_LINES = 40
const NUM_POINTS = 20
const WIDTH = 60
const WAVE_LENGTH = 0.02
const AMPLITUDE = 30
const SPEED = 10

type Pointer = { x: number; y: number }

function WaveLine({ index, reduce }: { index: number; reduce: boolean }) {
  const geomRef = useRef<MeshLineGeometry>(null)
  const { size } = useThree()

  const points = useMemo(() => {
    const step = WIDTH / (NUM_POINTS - 1)
    const arr: number[] = []
    for (let j = 0; j < NUM_POINTS; j++) {
      arr.push(-WIDTH / 2 + j * step, Math.sin(j * 0.075), 0)
    }
    return arr
  }, [])

  useEffect(() => {
    geomRef.current?.setPoints(points, () => 1)
  }, [points])

  useFrame((state) => {
    const g = geomRef.current
    if (!g) return
    const t = (reduce ? 0 : state.clock.elapsedTime) * SPEED
    const offset = index * 10
    for (let p = 0; p < points.length; p += 3) {
      points[p + 1] = Math.sin((p - t + offset) * WAVE_LENGTH) * AMPLITUDE
    }
    g.setPoints(points, () => 1)
  })

  const color = useMemo(() => {
    const hue = 0.5 + (index / NUM_LINES) * 0.12 // ciano → azul
    return new THREE.Color().setHSL(hue, 1, 0.55)
  }, [index])

  return (
    <mesh position={[0, index * 0.08, index * -0.3]}>
      <meshLineGeometry ref={geomRef} />
      <meshLineMaterial
        args={[
          {
            color,
            lineWidth: 0.05,
            sizeAttenuation: 1,
            resolution: new THREE.Vector2(size.width, size.height),
          },
        ]}
        transparent
        depthTest={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function Lines({
  pointer,
  reduce,
}: {
  pointer: React.RefObject<Pointer>
  reduce: boolean
}) {
  const group = useRef<THREE.Group>(null)
  useFrame(() => {
    const grp = group.current
    if (!grp) return
    // inclinação base (mostra a profundidade) + parallax do mouse
    const tx = -0.5 + pointer.current.y * 0.12
    const ty = pointer.current.x * 0.18
    grp.rotation.x += (tx - grp.rotation.x) * 0.05
    grp.rotation.y += (ty - grp.rotation.y) * 0.05
  })
  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {Array.from({ length: NUM_LINES }).map((_, i) => (
        <WaveLine key={i} index={i} reduce={reduce} />
      ))}
    </group>
  )
}

export function WaveLines({ className }: { className?: string }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 })
  const [reduce, setReduce] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>("100px")

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView ? (reduce ? "demand" : "always") : "never"}
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true }}
      >
        {/* fundo navy opaco (combina com a seção; bloom funciona em cena opaca) */}
        <color attach="background" args={["#0a1628"]} />
        <Lines pointer={pointer} reduce={reduce} />
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={1.1}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.5}
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
