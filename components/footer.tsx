// COPY: números e claims pendentes de validação com a Larafy.
import Image from "next/image"
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"
import GPTWImg from "@/lib/GPTW.png"

const solucoesLinks = [
  { label: "Recuperação de Créditos", href: "/#solucoes" },
  { label: "Planejamento Tributário", href: "/#solucoes" },
  { label: "Reforma Tributária", href: "/#solucoes" },
  { label: "Contabilidade · Folha · M&A", href: "/#solucoes" },
]

const empresaLinks = [
  { label: "Tecnologia", href: "/#tecnologia" },
  { label: "Resultados", href: "/#impacto" },
  { label: "Sobre nós", href: "/sobre" },
  { label: "O Método", href: "/metodo" },
]

const socialLinks = [
  {
    label: "LinkedIn da LaraFy",
    href: "https://www.linkedin.com/company/laratax/",
    Icon: Linkedin,
  },
  {
    label: "Facebook da LaraFy",
    href: "https://www.facebook.com/share/1BjiDNA8Nf/?mibextid=wwXIfr",
    Icon: Facebook,
  },
  {
    label: "Instagram da LaraFy",
    href: "https://www.instagram.com/laratax/",
    Icon: Instagram,
  },
]

const selos = ["Apólice R$ 10 mi", "CRC-PR", "LGPD"]

export function Footer() {
  return (
    <footer className="bg-[#001b27] pt-16 pb-8 text-white/65 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-block">
              <img
                src="/images/larafy-logo-light.svg"
                alt="LaraFy"
                className="h-9 w-auto"
              />
            </a>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed">
              Consultoria tributária de alta performance, especialista em Lucro
              Real e Presumido. Precisão de dados via tecnologia proprietária.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {selos.map((selo) => (
                <li
                  key={selo}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/80"
                >
                  {selo}
                </li>
              ))}
            </ul>
            <Image
              src={GPTWImg}
              alt="Great Place To Work — Certificada 2025"
              className="mt-5 h-16 w-auto object-contain"
            />
          </div>

          <nav aria-label="Soluções">
            <h5 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
              Soluções
            </h5>
            {solucoesLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mb-2.5 block text-sm transition-colors duration-200 hover:text-[#07e0ff]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Empresa">
            <h5 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
              Empresa
            </h5>
            {empresaLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mb-2.5 block text-sm transition-colors duration-200 hover:text-[#07e0ff]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <h5 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
              Contato
            </h5>
            <p className="mb-2.5 flex items-start gap-2 text-sm">
              <Phone className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>(41) 3146-5868</span>
            </p>
            <a
              href="mailto:contato@larafy.com.br"
              className="mb-2.5 flex items-start gap-2 text-sm transition-colors duration-200 hover:text-[#07e0ff]"
            >
              <Mail className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>contato@larafy.com.br</span>
            </a>
            <p className="mb-2.5 flex items-start gap-2 text-sm">
              <MapPin className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                Av. Rocha Pombo, 1977 — São Cristóvão · CEP 83005-280
              </span>
            </p>
            <a
              href="/#contato"
              className="mb-2.5 block text-sm font-bold text-white transition-colors duration-200 hover:text-[#07e0ff]"
            >
              Agendar diagnóstico
            </a>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors duration-200 hover:text-[#07e0ff]"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>
            © 2026 LaraFy Consultoria e Contabilidade · CNPJ 40.762.656/0001-66
          </p>
          <p>Política de Privacidade · LGPD</p>
        </div>
      </div>
    </footer>
  )
}
