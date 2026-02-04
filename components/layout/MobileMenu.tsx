'use client'

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Furniture", href: "/furniture", hasSubmenu: true },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

interface MobileMenuProps {
  closeMenu: () => void
  categories: Category[]
  isOpen: boolean
}

const MobileMenu = ({ closeMenu, categories, isOpen }: MobileMenuProps) => {
  const pathname = usePathname()
  const [furnitureExpanded, setFurnitureExpanded] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLDivElement | null)[]>([])

  // Entry animation
  useEffect(() => {
    if (!isOpen) return

    const menu = menuRef.current
    const linksContainer = linksContainerRef.current
    const contact = contactRef.current
    const social = socialRef.current

    if (!menu || !linksContainer) return

    // Set initial states
    gsap.set(menu, { scaleY: 0 })

    const links = linkRefs.current.filter(Boolean)
    gsap.set(links, { y: '30vh' })

    if (contact) gsap.set(contact, { opacity: 0, y: 20 })
    if (social) gsap.set(social, { opacity: 0, y: 20 })

    // Create entrance timeline
    const tl = gsap.timeline()

    // Menu container scales in
    tl.to(menu, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Links slide up with stagger
    tl.to(links, {
      y: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power2.out',
    }, 0.3)

    // Contact info fades in
    if (contact) {
      tl.to(contact, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, 0.8)
    }

    // Social links fade in
    if (social) {
      tl.to(social, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, 0.9)
    }

    return () => {
      tl.kill()
    }
  }, [isOpen])

  // Handle furniture submenu animation
  useEffect(() => {
    const submenu = document.querySelector('.furniture-submenu')
    if (!submenu) return

    if (furnitureExpanded) {
      gsap.fromTo(submenu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      )

      // Animate submenu items
      const items = submenu.querySelectorAll('.submenu-item')
      gsap.fromTo(items,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
      )
    } else {
      gsap.to(submenu, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [furnitureExpanded])

  return (
    <div
      ref={menuRef}
      className="fixed left-0 top-0 h-screen w-full bg-gradient-to-br from-gray-900 via-red-950 to-black origin-top z-40 overflow-hidden"
      style={{ transform: 'scaleY(0)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,255,255,.1) 35px,
              rgba(255,255,255,.1) 70px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-8">
        {/* Navigation Links */}
        <div
          ref={linksContainerRef}
          className="flex flex-col gap-6 mb-12"
        >
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href

            if (link.hasSubmenu) {
              return (
                <div
                  key={index}
                  className="overflow-hidden"
                  ref={(el) => { linkRefs.current[index] = el }}
                >
                  <button
                    onClick={() => setFurnitureExpanded(!furnitureExpanded)}
                    className={`block text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight transition-colors duration-300 flex items-center gap-4 ${
                      furnitureExpanded
                        ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
                        : "text-white hover:text-red-400"
                    }`}
                  >
                    {link.title}
                    <ChevronDown
                      className={`w-8 h-8 transition-transform duration-300 ${
                        furnitureExpanded ? "rotate-180 text-red-400" : "text-white"
                      }`}
                    />
                  </button>

                  {/* Furniture Submenu */}
                  <div
                    className="furniture-submenu ml-6 mt-4 flex flex-col gap-3 overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    {categories.map((cat, i) => (
                      <div key={i} className="submenu-item">
                        <Link
                          href={`/categories/${cat.slug}`}
                          onClick={closeMenu}
                          className="text-2xl font-bold text-red-300 hover:text-red-400 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={index}
                className="overflow-hidden"
                ref={(el) => { linkRefs.current[index] = el }}
              >
                <Link
                  onClick={closeMenu}
                  href={link.href}
                  className={`block text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight transition-colors duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {link.title}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Contact Info */}
        <div
          ref={contactRef}
          className="border-t border-red-800/30 pt-8"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <div className="flex flex-col gap-4 text-white/70">
            <a
              href="mailto:info@theofficecompany.eu"
              className="text-sm hover:text-red-300 transition-colors"
            >
              info@theofficecompany.eu
            </a>
            <a
              href="tel:+385913011552"
              className="text-sm hover:text-red-300 transition-colors"
            >
              +385 91 3011 552
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div
          ref={socialRef}
          className="flex items-center gap-4 mt-8"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
