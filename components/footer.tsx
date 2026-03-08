"use client"

import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"
export function Footer() {
  return (
    <footer className="w-full bg-[#0a1628] px-6 py-[26px] lg:px-[60px] text-white text-[13px] font-sans">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[60px] flex-wrap">
        {/* COLUNA 1: LOGO */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <img
              src="/images/larafy-logo-light.svg"
              alt="LaraFy"
              className="max-h-[35px] w-auto"
            />
          </a>
          <div className="mt-3 text-[11px] text-white/70 leading-relaxed">
            Todos os direitos reservados a LaraTax S.A.
            <br />
            CNPJ: 41.721.543/0001-85
          </div>
        </div>

        {/* COLUNA 2: MENUS EM 2 COLUNAS */}
        <div className="flex gap-[60px] text-[#77e4ff]">
          <div>
            <ul className="list-none m-0 p-0 space-y-0.5">
              <li>
                <a
                  href="#sobre"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#recursos"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-none m-0 p-0 space-y-0.5">
              <li>
                <a
                  href="#cases"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  Cases
                </a>
              </li>
              <li>
                <a
                  href="#grupo"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  O grupo
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-white no-underline transition-colors hover:text-[#77e4ff]"
                >
                  Como funciona
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COLUNA 3: CONTATOS */}
        <div className="text-white/85 leading-relaxed">
          <div className="flex items-start gap-2 mb-1">
            <Phone className="w-[13px] h-[13px] mt-0.5 flex-shrink-0" />
            <span>Telefone: (41) 98477-7311</span>
          </div>
          <div className="flex items-start gap-2 mb-1">
            <Mail className="w-[13px] h-[13px] mt-0.5 flex-shrink-0" />
            <span>
              <a
                href="mailto:contato@laratax.com.br"
                className="text-white/85 no-underline hover:text-[#77e4ff]"
              >
                contato@laratax.com.br
              </a>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-[13px] h-[13px] mt-0.5 flex-shrink-0" />
            <span>
              Av. Rocha Pombo, 1977 – São Cristovão
              <br />
              CEP: 83005‑280
            </span>
          </div>
        </div>

        {/* COLUNA 4: CERTIFICAÇÃO + REDES SOCIAIS */}
        <div className="flex flex-col items-start lg:items-end gap-3">
          <img
            src="https://lp.laratax.com.br/wp-content/uploads/2026/02/Ativo-3-1.png"
            alt="Certificação"
            className="max-h-[100px] w-auto"
          />
          <div className="w-[50px] h-0" />
          <div>
            <div className="text-[11px] text-white/80 mb-1">
              Siga nossas redes sociais
            </div>
            <div className="flex gap-2.5 text-[15px]">
              <a
                href="https://www.linkedin.com/company/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white no-underline hover:text-[#77e4ff] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1BjiDNA8Nf/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white no-underline hover:text-[#77e4ff] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white no-underline hover:text-[#77e4ff] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
