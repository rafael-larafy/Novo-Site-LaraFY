"use client"

// Testbed de animações 3D (R3F) — galeria para comparar candidatas ao vivo.
// Cada seção ocupa a tela; canvases fora da viewport pausam o render loop.
// Adaptações de demos do github.com/bobbyroe para o nosso dark + ciano.

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const NoiseGrid = dynamic(
  () => import("@/components/three/noise-grid").then((m) => ({ default: m.NoiseGrid })),
  { ssr: false, loading: () => null }
)
const OrbitTrails = dynamic(
  () => import("@/components/three/orbit-trails").then((m) => ({ default: m.OrbitTrails })),
  { ssr: false, loading: () => null }
)
const CurlFlow = dynamic(
  () => import("@/components/three/curl-flow").then((m) => ({ default: m.CurlFlow })),
  { ssr: false, loading: () => null }
)
const DataGlobe = dynamic(
  () => import("@/components/three/data-globe").then((m) => ({ default: m.DataGlobe })),
  { ssr: false, loading: () => null }
)
const Wormhole = dynamic(
  () => import("@/components/three/wormhole").then((m) => ({ default: m.Wormhole })),
  { ssr: false, loading: () => null }
)
const CrystalBranching = dynamic(
  () => import("@/components/three/crystal-branching").then((m) => ({ default: m.CrystalBranching })),
  { ssr: false, loading: () => null }
)
const DataCorridor = dynamic(
  () => import("@/components/three/data-corridor").then((m) => ({ default: m.DataCorridor })),
  { ssr: false, loading: () => null }
)
const NeonCubes = dynamic(
  () => import("@/components/three/neon-cubes").then((m) => ({ default: m.NeonCubes })),
  { ssr: false, loading: () => null }
)

type Anim = {
  id: string
  n: string
  name: string
  tag: string
  desc: string
  Comp: React.ComponentType<{ className?: string }>
  inUse?: boolean
}

const ANIMS: Anim[] = [
  {
    id: "noise-grid",
    n: "01",
    name: "Noise Grid",
    tag: "Superfície viva de dados",
    desc: "Malha de pontos ondulando por ruído de Perlin, navy → ciano. Inclina com o cursor.",
    Comp: NoiseGrid,
    inUse: true,
  },
  {
    id: "orbit-trails",
    n: "02",
    name: "Orbit Trails",
    tag: "Cenários orbitando um núcleo",
    desc: "Camadas de pontos girando com bloom/glow. Candidato ao bloco “+2,1 bilhões de cenários”.",
    Comp: OrbitTrails,
  },
  {
    id: "curl-flow",
    n: "03",
    name: "Curl Flow",
    tag: "Inteligência em movimento",
    desc: "Partículas advectadas por um campo de ruído 3D, com fade contínuo. Candidato a fundo de hero/CTA.",
    Comp: CurlFlow,
  },
  {
    id: "data-globe",
    n: "04",
    name: "Data Globe",
    tag: "Planeta de dados",
    desc: "Globo de pontos com relevo procedural (sem texturas). Candidato a “Atuação Nacional”.",
    Comp: DataGlobe,
  },
  {
    id: "wormhole",
    n: "05",
    name: "Wormhole",
    tag: "Túnel de dados",
    desc: "Voo por um túnel wireframe (spline + bloom), com caixas flutuando. Dramático — candidato a hero ou transição.",
    Comp: Wormhole,
  },
  {
    id: "crystal",
    n: "06",
    name: "Crystal Branching",
    tag: "Cristais ramificando",
    desc: "Estrutura de cristais crescendo e pulsando do centro. Abstrato premium — candidato a um bloco de destaque.",
    Comp: CrystalBranching,
  },
  {
    id: "corridor",
    n: "07",
    name: "Data Corridor",
    tag: "Corredor de dados",
    desc: "Campo de painéis voando em direção à câmera, com fog e bloom. Sensação de movimento — candidato a fundo de hero.",
    Comp: DataCorridor,
  },
  {
    id: "neon-cubes",
    n: "08",
    name: "Neon Cubes",
    tag: "Cubos neon",
    desc: "Cubos wireframe aninhados girando com glow aditivo. HUD geométrico — candidato a acento de seção.",
    Comp: NeonCubes,
  },
]

export default function TesteAnimacoes() {
  return (
    <main className="relative bg-[#04101f] text-white">
      {/* top bar */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#04101f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#00e5ff]">
              Larafy
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 sm:inline">
              Testbed de animações
            </span>
          </div>
          <nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 md:flex">
            {ANIMS.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="transition-colors hover:text-[#00e5ff]">
                {a.n} · {a.name}
              </a>
            ))}
          </nav>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-[border-color,color] hover:border-[#00e5ff]/50 hover:text-[#00e5ff]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Home
          </Link>
        </div>
      </div>

      {/* intro */}
      <section className="relative flex min-h-[42vh] flex-col items-center justify-center px-6 pt-24 pb-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00e5ff]">
          Comparar animações
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-balance">
          Qual animação fica no site?
        </h1>
        <p className="mt-4 max-w-xl text-white/55">
          Role para comparar as candidatas. <span className="text-white/80">Mova o mouse</span> — todas
          reagem ao cursor. Cada uma pode entrar como fundo de uma seção específica.
        </p>
      </section>

      {/* galeria */}
      {ANIMS.map((a) => {
        const Comp = a.Comp
        return (
          <section
            key={a.id}
            id={a.id}
            className="relative h-[88vh] w-full overflow-hidden border-t border-white/10"
          >
            <Comp className="absolute inset-0" />
            {/* vinheta p/ legibilidade do rótulo */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04101f] via-transparent to-transparent"
              aria-hidden
            />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="mx-auto max-w-[1400px]">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-[#00e5ff]">{a.n}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                        {a.tag}
                      </span>
                      {a.inUse && (
                        <span className="rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#00e5ff]">
                          em uso · /sobre
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-white lg:text-5xl">
                      {a.name}
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-white/60">{a.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <footer className="border-t border-white/10 px-6 py-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
          Larafy · sandbox de animações —{" "}
          <Link href="/" className="text-[#00e5ff] hover:underline">
            voltar para a home
          </Link>
        </p>
      </footer>
    </main>
  )
}
