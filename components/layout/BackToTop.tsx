'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import gsap from 'gsap'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  useEffect(() => {
    if (!buttonRef.current) return

    if (isVisible) {
      gsap.set(buttonRef.current, { display: 'flex' })
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.5)'
      })
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (buttonRef.current) {
            gsap.set(buttonRef.current, { display: 'none' })
          }
        }
      })
    }
  }, [isVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      style={{ display: 'none', opacity: 0, scale: 0.8 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 items-center justify-center rounded-full bg-gradient-to-r from-red-900 to-red-700 text-white shadow-lg hover:from-red-800 hover:to-red-600 transition-colors duration-300 cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
