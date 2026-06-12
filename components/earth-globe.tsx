"use client"

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import * as THREE from "three"
import { BrazilDetail } from "@/components/brazil-detail"
import { useInView } from "@/hooks/use-in-view"

const BRAZIL_LAT = -14
const BRAZIL_LON = -52

function latLonToRotation(latDeg: number, lonDeg: number) {
  const theta = THREE.MathUtils.degToRad(90 - latDeg) // ângulo polar a partir do norte
  const phi = ((lonDeg + 180) / 360) * Math.PI * 2
  const x = -Math.cos(phi) * Math.sin(theta)
  const y = Math.cos(theta)
  const z = Math.sin(phi) * Math.sin(theta)
  return { x: Math.atan2(y, Math.hypot(x, z)), y: -Math.atan2(x, z) }
}

const TARGET = latLonToRotation(BRAZIL_LAT, BRAZIL_LON)

const TEXTURES = [
  "/textures/earth/00_earthmap1k.jpg",
  "/textures/earth/02_earthspec1k.jpg",
]

function useFresnelMaterial(rimHex = 0x00e5ff, facingHex = 0x001725) {
  return useMemo(() => {
    const uniforms = {
      color1: { value: new THREE.Color(rimHex) },
      color2: { value: new THREE.Color(facingHex) },
      fresnelBias: { value: 0.1 },
      fresnelScale: { value: 1.0 },
      fresnelPower: { value: 3.4 },
    }
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        uniform float fresnelBias;
        uniform float fresnelScale;
        uniform float fresnelPower;
        varying float vReflectionFactor;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
          vec3 I = worldPosition.xyz - cameraPosition;
          vReflectionFactor = fresnelBias + fresnelScale * pow(1.0 + dot(normalize(I), worldNormal), fresnelPower);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 color1;
        uniform vec3 color2;
        varying float vReflectionFactor;
        void main() {
          float f = clamp(vReflectionFactor, 0.0, 1.0);
          gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
  }, [rimHex, facingHex])
}

function useHologramMaterial(colorMap: THREE.Texture, specMap: THREE.Texture) {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorMap: { value: colorMap },
        specMap: { value: specMap },
        landColor: { value: new THREE.Color(0x00cffa) },
        coastColor: { value: new THREE.Color(0x9af2ff) },
        texel: { value: 1 / 1024 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vNormal = mat3(modelMatrix) * normal;
          vViewDir = cameraPosition - worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D colorMap;
        uniform sampler2D specMap;
        uniform vec3 landColor;
        uniform vec3 coastColor;
        uniform float texel;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        float landAt(vec2 uv) { return 1.0 - texture2D(specMap, uv).r; }

        void main() {
          float land = landAt(vUv);
          float landMask = smoothstep(0.35, 0.55, land);

          float e = 0.0;
          e += abs(landAt(vUv + vec2(texel, 0.0)) - land);
          e += abs(landAt(vUv - vec2(texel, 0.0)) - land);
          e += abs(landAt(vUv + vec2(0.0, texel)) - land);
          e += abs(landAt(vUv - vec2(0.0, texel)) - land);
          float coast = clamp(e * 2.5, 0.0, 1.0);

          vec3 cm = texture2D(colorMap, vUv).rgb;
          float detail = dot(cm, vec3(0.299, 0.587, 0.114));

          float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.0);

          vec3 col = mix(landColor * (0.45 + 0.75 * detail), coastColor, coast);
          col += landColor * fres * 0.3;

          float intensity = landMask * (0.5 + 0.5 * detail) + coast * 0.9 + fres * 0.18;
          intensity = clamp(intensity, 0.0, 1.0);

          gl_FragColor = vec4(col, intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [colorMap, specMap])
}

const NODE_COUNT = 45 // pontos na superfície
const ARC_COUNT = 20 // arcos simultâneos
const ARC_SEG = 150 // suavidade de cada arco
const NODE_R = 1.001 // raio dos pontos

type Arc = {
  line: THREE.Line
  geo: THREE.BufferGeometry
  mat: THREE.LineBasicMaterial
  positions: Float32Array
  t: number
  dur: number
}

function randomSpherePoint(r: number) {
  const theta = 2 * Math.PI * Math.random()
  const phi = Math.acos(2 * Math.random() - 1)
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function makeDotTexture() {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.3, "rgba(154,242,255,0.9)")
  g.addColorStop(1, "rgba(0,229,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function setArc(arc: Arc, nodes: THREE.Vector3[]) {
  let ia = (Math.random() * nodes.length) | 0
  let ib = (Math.random() * nodes.length) | 0
  while (ib === ia) ib = (Math.random() * nodes.length) | 0
  const a = nodes[ia]
  const b = nodes[ib]
  const dist = a.distanceTo(b)
  const mid = a
    .clone()
    .add(b)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(NODE_R + dist * 0.35)
  const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(ARC_SEG)
  for (let i = 0; i < pts.length; i++) {
    arc.positions[i * 3] = pts[i].x
    arc.positions[i * 3 + 1] = pts[i].y
    arc.positions[i * 3 + 2] = pts[i].z
  }
  arc.geo.attributes.position.needsUpdate = true
  arc.geo.setDrawRange(0, 0)
  arc.t = 0
  arc.dur = 5 + Math.random() * 5
}

function Connections() {
  const built = useMemo(() => {
    const group = new THREE.Group()
    const nodes = Array.from({ length: NODE_COUNT }, () => randomSpherePoint(NODE_R))

    const npos = new Float32Array(NODE_COUNT * 3)
    nodes.forEach((n, i) => {
      npos[i * 3] = n.x
      npos[i * 3 + 1] = n.y
      npos[i * 3 + 2] = n.z
    })
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(npos, 3))
    const dotTex = makeDotTexture()
    const nodeMat = new THREE.PointsMaterial({
      size: 0.09,
      map: dotTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(nodeGeo, nodeMat)
    points.frustumCulled = false
    group.add(points)

    const arcs: Arc[] = []
    for (let i = 0; i < ARC_COUNT; i++) {
      const positions = new Float32Array((ARC_SEG + 1) * 3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(geo, mat)
      line.frustumCulled = false
      const arc: Arc = { line, geo, mat, positions, t: 0, dur: 1 }
      setArc(arc, nodes)
      arc.t = Math.random() // espalha as fases iniciais
      arcs.push(arc)
      group.add(line)
    }

    return { group, arcs, nodes, dotTex, nodeGeo, nodeMat }
  }, [])

  useFrame((_, delta) => {
    for (const arc of built.arcs) {
      arc.t += delta / arc.dur
      if (arc.t >= 1) {
        setArc(arc, built.nodes)
        continue
      }
      const t = arc.t
      const draw = Math.min(t / 0.35, 1) // desenha nos primeiros 35%
      arc.geo.setDrawRange(0, Math.max(2, Math.floor(draw * ARC_SEG) + 1))
      let op = 1
      if (t < 0.1) op = t / 0.1
      else if (t > 0.75) op = Math.max(0, 1 - (t - 0.75) / 0.25)
      arc.mat.opacity = op
    }
  })

  useEffect(() => {
    return () => {
      built.dotTex.dispose()
      built.nodeGeo.dispose()
      built.nodeMat.dispose()
      built.arcs.forEach((a) => {
        a.geo.dispose()
        a.mat.dispose()
      })
    }
  }, [built])

  return <primitive object={built.group} />
}

function Earth({
  groupRef,
  draggingRef,
  openRef,
}: {
  groupRef: RefObject<THREE.Group | null>
  draggingRef: RefObject<boolean>
  openRef: RefObject<boolean>
}) {
  const [colorMap, specMap] = useLoader(THREE.TextureLoader, TEXTURES)
  const fresnelMat = useFresnelMaterial()
  const camera = useThree((s) => s.camera)
  const diveRef = useRef(0)

  // wrap horizontal para a amostragem de costa não cortar na emenda da textura
  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace
    colorMap.wrapS = THREE.RepeatWrapping
    specMap.wrapS = THREE.RepeatWrapping
  }, [colorMap, specMap])

  const hologramMat = useHologramMaterial(colorMap, specMap)

  useEffect(() => {
    groupRef.current?.rotation.set(TARGET.x, TARGET.y, 0)
  }, [groupRef])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (g && !draggingRef.current) {
      const t = Math.min(1, delta * 3)
      let dy = TARGET.y - g.rotation.y
      dy = Math.atan2(Math.sin(dy), Math.cos(dy))
      g.rotation.y += dy * t
      g.rotation.x += (TARGET.x - g.rotation.x) * t
    }
    // mergulho da câmera em direção ao Brasil quando o overlay abre
    const target = openRef.current ? 1 : 0
    diveRef.current += (target - diveRef.current) * Math.min(1, delta * 3.5)
    camera.position.z = 3.5 - diveRef.current * 2.4
  })

  return (
    <group ref={groupRef}>
      
      <mesh scale={0.997}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshBasicMaterial
          color="#0e4763"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <primitive object={hologramMat} attach="material" />
      </mesh>
      
      <Connections />
      
      <mesh scale={1.015}>
        <sphereGeometry args={[1, 96, 96]} />
        <primitive object={fresnelMat} attach="material" />
      </mesh>
    </group>
  )
}

/**
 * Globo terrestre 3D interativo, estilizado como holograma néon (adaptação de
 * bobbyroe/threejs-earth para R3F). Arraste para girar; ao soltar, ele sempre
 * retorna voltado para o Brasil. Clique (sem arrastar) abre um pop-up sobre a
 * atuação nacional da Larafy. Respeita prefers-reduced-motion.
 */
export function EarthGlobe({ className }: { className?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const draggingRef = useRef(false)
  const lastRef = useRef({ x: 0, y: 0 })
  const downRef = useRef({ x: 0, y: 0 })
  const movedRef = useRef(false)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const { ref: viewRef, inView } = useInView<HTMLDivElement>("150px")

  // espelha `open` num ref para o loop de animação (mergulho da câmera) ler
  useEffect(() => {
    openRef.current = open
  }, [open])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    movedRef.current = false
    lastRef.current = { x: e.clientX, y: e.clientY }
    downRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = groupRef.current
    if (!draggingRef.current || !g) return
    const dx = e.clientX - lastRef.current.x
    const dy = e.clientY - lastRef.current.y
    lastRef.current = { x: e.clientX, y: e.clientY }
    if (Math.hypot(e.clientX - downRef.current.x, e.clientY - downRef.current.y) > 5) {
      movedRef.current = true
    }
    g.rotation.y += dx * 0.006
    g.rotation.x = THREE.MathUtils.clamp(
      g.rotation.x + dy * 0.006,
      TARGET.x - 0.7,
      TARGET.x + 0.7
    )
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    // mouse parado entre o down e o up = clique → abre o pop-up
    if (!movedRef.current) setOpen(true)
  }

  return (
    <>
      <div
        ref={viewRef}
        className={`${className ?? ""} touch-none cursor-grab active:cursor-grabbing`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        role="button"
        tabIndex={0}
        aria-label="Globo interativo — clique para saber como a Larafy atende o Brasil inteiro"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            opacity: open ? 0 : 1,
            scale: open ? 1.25 : 1,
            filter: open ? "blur(8px)" : "blur(0px)",
          }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          <Canvas
            frameloop={inView ? "always" : "never"}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 3.5], fov: 35 }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              <Earth groupRef={groupRef} draggingRef={draggingRef} openRef={openRef} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      <BrazilDetail open={open} onClose={() => setOpen(false)} />
    </>
  )
}
