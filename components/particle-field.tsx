"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useLenis } from "lenis/react"
import * as THREE from "three"

type Pointer = { x: number; y: number }
type Scroll = { progress: number; velocity: number }

function ParticleCloud({
  pointer,
  scroll,
  reduce,
  count = 2600,
}: {
  pointer: React.RefObject<Pointer>
  scroll: React.RefObject<Scroll>
  reduce: boolean
  count?: number
}) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count])

  useFrame((state) => {
    const pts = ref.current
    if (!pts || reduce) return
    const t = state.clock.elapsedTime

    const targetX = pointer.current.x * 0.8
    const targetY = pointer.current.y * 0.5 - scroll.current.progress * 4
    pts.position.x += (targetX - pts.position.x) * 0.05
    pts.position.y += (targetY - pts.position.y) * 0.05

    const tiltX = Math.sin(t * 0.15) * 0.04 + pointer.current.y * 0.1
    const tiltY = Math.cos(t * 0.12) * 0.04 + pointer.current.x * 0.1
    pts.rotation.x += (tiltX - pts.rotation.x) * 0.04
    pts.rotation.y += (tiltY - pts.rotation.y) * 0.04
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export function ParticleField({ className }: { className?: string }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 })
  const scroll = useRef<Scroll>({ progress: 0, velocity: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    const el = wrapRef.current
    const io = el
      ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
          rootMargin: "120px",
        })
      : null
    if (el && io) io.observe(el)

    return () => {
      window.removeEventListener("pointermove", onMove)
      io?.disconnect()
    }
  }, [])

  useLenis((lenis) => {
    scroll.current.progress = lenis.progress ?? 0
    scroll.current.velocity = lenis.velocity ?? 0
  })

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !inView ? "demand" : "always"}
      >
        <ParticleCloud pointer={pointer} scroll={scroll} reduce={reduce} />
      </Canvas>
    </div>
  )
}
