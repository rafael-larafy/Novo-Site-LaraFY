"use client"

import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full bg-[#0a1628] px-6 py-8 lg:px-[60px] lg:py-10 text-white font-sans">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 flex-wrap">
        {/* COLUNA 1: LOGO + TAGLINE */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <img
              src="/images/larafy-logo-light.svg"
              alt="LaraFy"
              className="max-h-[38px] w-auto"
            />
          </a>
          <p className="mt-3 text-sm text-white font-normal tracking-wide">
            INTELIGÊNCIA QUE TRANSFORMA O FUTURO
          </p>
        </div>

        {/* COLUNA 2: MENUS EM 2 COLUNAS */}
        <div className="flex gap-16 text-white">
          <div>
            <ul className="list-none m-0 p-0 space-y-2">
              <li>
                <a
                  href="#sobre"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#solucoes"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  Soluções
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  Como funciona
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-none m-0 p-0 space-y-2">
              <li>
                <a
                  href="#cases"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  Cases
                </a>
              </li>
              <li>
                <a
                  href="#grupo"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  O Grupo
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white no-underline text-[15px] hover:text-[#77e4ff] transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COLUNA 3: CONTATOS */}
        <div className="text-white leading-relaxed text-[15px]">
          <div className="flex items-start gap-2.5 mb-2">
            <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
            <span>Telefone: (41) 3146-5868</span>
          </div>
          <div className="flex items-start gap-2.5 mb-2">
            <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
            <span>
              <a
                href="mailto:contato@larafy.com.br"
                className="text-white no-underline hover:text-[#77e4ff] transition-colors"
              >
                contato@larafy.com.br
              </a>
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
            <span>
              Av. Rocha Pombo, 1977 - São Cristovão
              <br />
              CEP: 83005-280
            </span>
          </div>
        </div>

        {/* COLUNA 4: BADGES + REDES SOCIAIS */}
        <div className="flex flex-col items-start lg:items-end gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            {/* Great Place To Work */}
            <Image
              src="/images/gptw-badge.png"
              alt="Great Place To Work"
              width={70}
              height={90}
              className="object-contain"
            />
            {/* Certificado 2025 Brasil */}
            <div className="bg-[#0046b5] rounded-lg px-4 py-3 text-center min-w-[100px]">
              <p className="text-white text-xs font-semibold leading-tight">
                Certificado
                <br />
                2025 Brasil
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex gap-3 mb-2">
              <a
                href="https://www.linkedin.com/company/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1BjiDNA8Nf/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-white/90">Siga nossas redes sociais</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
