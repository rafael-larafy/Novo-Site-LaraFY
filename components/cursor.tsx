"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const INTERACTIVE = "a, button , [data-cursor], input, textarea , select , label , [role='button']"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    root.classList.add("has-custom-cursor")

    gsap.set ([dot,ring], {xPercent: -50, yPercent: -50, autoAlpha: 0})
    
    const xDot = gsap.quickTo(dot, "x" , {duration: 0.12 , ease : "power3.out"})
    const yDot = gsap.quickTo(dot, "y" , {duration: 0.12 , ease : "power3.out"})
    const xRing = gsap.quickTo(ring, "x" , {duration: 0.45 , ease : "power3.out"})
    const yRing = gsap.quickTo(ring, "y" , {duration: 0.45 , ease : "power3.out"})

    let visible  = false

    const show = () => {
      if(visible) return
      visible = true 
      gsap.to([dot, ring], {autoAlpha: 1 , duration: 0.3})
    }

    const hide = () => {
      if (!visible) return
      visible = false 
      ring.classList.remove("is-active", "is-down")
      gsap.to([dot, ring], {autoAlpha: 1 , duration: 0.2})
    }

    const updateInteractive = (x:number, y:number) => {
      const el = document.elementFromPoint (x,y)
      ring.classList.toggle("is-active", !!el?.closest(INTERACTIVE))
    }

    const onMove = (e: PointerEvent) => {
      show()
      xDot (e.clientX)
      yDot (e.clientY)
      xRing (e.clientX)
      yRing (e.clientY)
      updateInteractive(e.clientX, e.clientY)
    }

    const onEnter = () => show() 
    const onLeave = () => hide()
    const onDown = () => ring.classList.add("is-down")
    const onUp = () => ring.classList.remove("is-down")
    const onBlur = () => hide()
    
    window.addEventListener ("pointermove", onMove, {passive:true}) 
    window.addEventListener ("pointerdown", onDown)
    window.addEventListener ("pointerup", onUp)
    document.documentElement.addEventListener ("pointerenter", onEnter)
    document.documentElement.addEventListener ("ponterleave", onLeave)
    window.addEventListener ("blur", onBlur)

    return () =>{
      root.classList.remove ("has-custom-cursor")
      window.removeEventListener ("pointermove" , onMove)
      window.removeEventListener ("pointerdown", onDown)
      window.removeEventListener ("pointerup", onUp)
      document.documentElement.removeEventListener ("pointerenter", onEnter)
      document.documentElement.removeEventListener ("pointerleave", onLeave)
      window.removeEventListener ("blur", onBlur)
    }
  }, [])

  return (
    <>
    <div ref={ringRef} className="cursor-ring" aria-hidden />
    <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
