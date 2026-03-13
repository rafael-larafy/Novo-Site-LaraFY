"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"
import GPTWImg from "@/lib/GPTW.png"

export function Footer() {
  return (
    <footer className="w-full bg-[#0a1628] px-6 py-6 lg:px-12 lg:py-8 text-white font-sans">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 flex-wrap">
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <img
              src="/images/larafy-logo-light.svg"
              alt="LaraFy"
              className="max-h-[32px] lg:max-h-[40px] w-auto"
            />
          </a>
        </div>

        <div className="flex gap-12 lg:gap-16 text-white">
          <div>
            <ul className="list-none m-0 p-0 space-y-1.5">
              <li>
                <a
                  href="#sobre"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#solucoes"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  Soluções
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  Como funciona
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-none m-0 p-0 space-y-1.5">
              <li>
                <a
                  href="#cases"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  Cases
                </a>
              </li>
              <li>
                <a
                  href="#grupo"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  O Grupo
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white no-underline text-[13px] lg:text-[14px] hover:text-[#77e4ff] transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-white leading-relaxed text-[13px] lg:text-[14px]">
          <div className="flex items-start gap-2 mb-1.5">
            <Phone className="w-[14px] h-[14px] mt-0.5 flex-shrink-0 text-white" />
            <span>Telefone: (41) 3146-5868</span>
          </div>
          <div className="flex items-start gap-2 mb-1.5">
            <Mail className="w-[14px] h-[14px] mt-0.5 flex-shrink-0 text-white" />
            <span>
              <a
                href="mailto:contato@larafy.com.br"
                className="text-white no-underline hover:text-[#77e4ff] transition-colors"
              >
                contato@larafy.com.br
              </a>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-[14px] h-[14px] mt-0.5 flex-shrink-0 text-white" />
            <span>
              Av. Rocha Pombo, 1977 - São Cristovão
              <br />
              CEP: 83005-280
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 lg:gap-6">
          <Image
            src={GPTWImg}
            alt="Great Place To Work - Certificada 2025 Brasil"
            width={188}
            height={80}
            sizes="(max-width: 1024px) 70px, 80px"
            className="max-h-[70px] lg:max-h-[80px] w-auto object-contain"
            loading="lazy"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/company/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1BjiDNA8Nf/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/laratax/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#77e4ff] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] lg:text-xs text-white/90">Siga nossas redes sociais</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
