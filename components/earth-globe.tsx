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
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Centro aproximado do Brasil — o globo sempre repousa nesta orientação.
const BRAZIL_LAT = -14
const BRAZIL_LON = -52

// Converte lat/lon (graus) na rotação Euler (ordem XYZ) que deixa esse ponto
// de frente para a câmera, assumindo uma SphereGeometry com mapa
// equirretangular padrão (centro da textura = meridiano 0).
function latLonToRotation(latDeg: number, lonDeg: number) {
  const theta = THREE.MathUtils.degToRad(90 - latDeg) // ângulo polar a partir do norte
  const phi = ((lonDeg + 180) / 360) * Math.PI * 2
  const x = -Math.cos(phi) * Math.sin(theta)
  const y = Math.cos(theta)
  const z = Math.sin(phi) * Math.sin(theta)
  // rotação Y leva a longitude para a frente; rotação X centraliza a latitude
  return { x: Math.atan2(y, Math.hypot(x, z)), y: -Math.atan2(x, z) }
}

const TARGET = latLonToRotation(BRAZIL_LAT, BRAZIL_LON)

// Só precisamos do mapa de cor (detalhe interno) e do mapa especular, que serve
// de máscara terra/oceano (oceano = branco). Texturas de bobbyroe/threejs-earth.
const TEXTURES = [
  "/textures/earth/00_earthmap1k.jpg",
  "/textures/earth/02_earthspec1k.jpg",
]

// Brilho atmosférico (Fresnel) — porte do getFresnelMat.js do mesmo repositório.
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

// Material holográfico: continentes brilhando em ciano, costas acesas e oceano
// transparente. Usa o mapa especular como máscara terra/oceano (oceano = branco)
// e o mapa de cor real só para dar variação interna sutil ("dots" de néon).
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

        // oceano = branco no specMap → terra = 1.0
        float landAt(vec2 uv) { return 1.0 - texture2D(specMap, uv).r; }

        void main() {
          float land = landAt(vUv);
          float landMask = smoothstep(0.35, 0.55, land);

          // detecção de costa (diferença com os 4 vizinhos)
          float e = 0.0;
          e += abs(landAt(vUv + vec2(texel, 0.0)) - land);
          e += abs(landAt(vUv - vec2(texel, 0.0)) - land);
          e += abs(landAt(vUv + vec2(0.0, texel)) - land);
          e += abs(landAt(vUv - vec2(0.0, texel)) - land);
          float coast = clamp(e * 2.5, 0.0, 1.0);

          // variação interna a partir do mapa real (luminância)
          vec3 cm = texture2D(colorMap, vUv).rgb;
          float detail = dot(cm, vec3(0.299, 0.587, 0.114));

          // borda do globo (fresnel) reforça o contorno
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

function Earth({
  groupRef,
  draggingRef,
}: {
  groupRef: RefObject<THREE.Group | null>
  draggingRef: RefObject<boolean>
}) {
  const [colorMap, specMap] = useLoader(THREE.TextureLoader, TEXTURES)
  const fresnelMat = useFresnelMaterial()

  // wrap horizontal para a amostragem de costa não cortar na emenda da textura
  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace
    colorMap.wrapS = THREE.RepeatWrapping
    specMap.wrapS = THREE.RepeatWrapping
  }, [colorMap, specMap])

  const hologramMat = useHologramMaterial(colorMap, specMap)

  // Estado inicial: Brasil de frente.
  useEffect(() => {
    groupRef.current?.rotation.set(TARGET.x, TARGET.y, 0)
  }, [groupRef])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g || draggingRef.current) return
    // sem arrastar → retorna suavemente para o Brasil (caminho mais curto em Y)
    const t = Math.min(1, delta * 3)
    let dy = TARGET.y - g.rotation.y
    dy = Math.atan2(Math.sin(dy), Math.cos(dy))
    g.rotation.y += dy * t
    g.rotation.x += (TARGET.x - g.rotation.x) * t
  })

  return (
    <group ref={groupRef}>
      {/* grade digital sutil ao fundo */}
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
      {/* continentes holográficos */}
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <primitive object={hologramMat} attach="material" />
      </mesh>
      {/* atmosfera */}
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
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3.5], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Earth groupRef={groupRef} draggingRef={draggingRef} />
          </Suspense>
        </Canvas>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[#0e2942] bg-[#0a1628] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-white">
              A Larafy atende o Brasil inteiro
            </DialogTitle>
            <DialogDescription className="text-[#00e5ff]">
              Inteligência tributária de norte a sul, sem fronteiras.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm leading-relaxed text-white/75">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
