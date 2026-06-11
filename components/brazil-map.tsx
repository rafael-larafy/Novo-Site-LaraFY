"use client"

import { Suspense, useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { PresentationControls } from "@react-three/drei"
import { SVGLoader } from "three-stdlib"
import * as THREE from "three"

function Brazil({ reduce }: { reduce: boolean }) {
  const data = useLoader(SVGLoader, "/brazil.svg")

  const { geometry, scale } = useMemo(() => {
    const shapes: THREE.Shape[] = []
    for (const path of data.paths) {
      for (const shape of path.toShapes(true)) shapes.push(shape)
    }
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 120,
      bevelEnabled: true,
      bevelThickness: 16,
      bevelSize: 10,
      bevelSegments: 3,
      curveSegments: 12,
    })
    geo.center()
    geo.computeVertexNormals()

    const box = new THREE.Box3().setFromBufferAttribute(
      geo.attributes.position as THREE.BufferAttribute
    )
    const size = new THREE.Vector3()
    box.getSize(size)
    const s = 2.6 / Math.max(size.x, size.y)
    return { geometry: geo, scale: s }
  }, [data])

  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current || reduce) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <mesh ref={ref} geometry={geometry} scale={[scale, -scale, scale]}>
      <meshStandardMaterial
        color="#00e5ff"
        metalness={0.45}
        roughness={0.35}
        side={THREE.DoubleSide}
        emissive="#003a44"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}


export function BrazilMap({ className }: { className?: string }) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#0066ff" />
        <Suspense fallback={null}>
          <PresentationControls
            global
            polar={[-0.3, 0.3]}
            azimuth={[-0.6, 0.6]}
            speed={1.2}
          >
            <Brazil reduce={reduce} />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
