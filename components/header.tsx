"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import LogoImg from "@/lib/Logo.png"
import { UnderlineLink } from "@/components/underline-link"
import { CtaButton } from "@/components/ui/cta-button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Reforma Tributária", href: "/reforma-tributaria" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30)
        rafId = null
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-300 ease-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,46,67,0.10)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-11">
        <div className="flex items-center justify-between gap-6">
          <a href="/" className="relative flex h-8 shrink-0 items-center lg:h-10">
            <Image
              src="/images/larafy-logo-light.svg"
              alt="Larafy"
              width={306}
              height={66}
              sizes="(max-width: 1024px) 150px, 188px"
              className={cn(
                "h-8 w-auto transition-opacity duration-300 lg:h-10",
                isScrolled ? "pointer-events-none absolute opacity-0" : "opacity-100"
              )}
              priority
            />
            <Image
              src={LogoImg}
              alt={isScrolled ? "Larafy" : ""}
              aria-hidden={!isScrolled}
              width={600}
              height={128}
              sizes="(max-width: 1024px) 150px, 188px"
              className={cn(
                "h-8 w-auto transition-opacity duration-300 lg:h-10",
                isScrolled ? "opacity-100" : "pointer-events-none absolute opacity-0"
              )}
            />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <UnderlineLink
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  isScrolled
                    ? "text-[#002e43]/75 hover:text-[#002e43]"
                    : "text-white/85 hover:text-white"
                )}
              >
                {link.label}
              </UnderlineLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CtaButton href="/#contato" className="px-6 py-3 text-xs">
              Agendar diagnóstico
            </CtaButton>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              isScrolled || isMobileMenuOpen ? "text-[#002e43]" : "text-white"
            )}
            aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="menu-mobile"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        inert={!isMobileMenuOpen}
        className={`lg:hidden absolute inset-x-0 top-full bg-white border-t border-[#002e43]/10 shadow-[0_22px_60px_-28px_rgba(0,46,67,0.30)] transition-[opacity,transform] duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav aria-label="Navegação principal (mobile)" className="flex flex-col gap-1 px-5 py-6 sm:px-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="border-b border-[#002e43]/10 py-3 text-base font-semibold text-[#002e43]/75 transition-colors duration-200 hover:text-[#002e43]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-5">
            <CtaButton href="/#contato" className="px-6 py-3 text-xs" onClick={closeMobileMenu}>
              Agendar diagnóstico
            </CtaButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
