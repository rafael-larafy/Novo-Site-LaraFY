"use client"

import { useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"


export function HomeAnimations() {
  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const tiltCleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      const heroFrame = document.querySelector<HTMLElement>(
        "[data-gsap-hero-frame]"
      )
      if (heroFrame) {
        gsap.set(heroFrame, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0px",
          willChange: "clip-path, border-radius, transform",
        })
        gsap.to(heroFrame, {
          clipPath: "polygon(8% 4%, 92% 0%, 96% 96%, 4% 100%)",
          borderRadius: "32px",
          ease: "power1.out",
          scrollTrigger: {
            trigger: heroFrame,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.gsapParallax || "0.15")
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: () => -speed * (el.offsetHeight || 200),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-gsap-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-gsap-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            duration: 0.85,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-gsap-tilt]").forEach((el) => {
        const inner =
          el.querySelector<HTMLElement>("[data-gsap-tilt-inner]") || el
        let raf = 0
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const relX = (e.clientX - rect.left) / rect.width
          const relY = (e.clientY - rect.top) / rect.height
          const tiltX = (relY - 0.5) * -8
          const tiltY = (relX - 0.5) * 8
          if (raf) cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            gsap.to(inner, {
              rotateX: tiltX,
              rotateY: tiltY,
              transformPerspective: 700,
              ease: "power2.out",
              duration: 0.4,
            })
          })
        }
        const onLeave = () => {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            ease: "power2.out",
            duration: 0.6,
          })
        }
        el.addEventListener("mousemove", onMove)
        el.addEventListener("mouseleave", onLeave)
        tiltCleanups.push(() => {
          el.removeEventListener("mousemove", onMove)
          el.removeEventListener("mouseleave", onLeave)
          if (raf) cancelAnimationFrame(raf)
        })
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => {
      tiltCleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return null
}
