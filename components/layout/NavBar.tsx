'use client'

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown } from "lucide-react"
import Logo from "./Logo"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Category type from Supabase
interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

const roomTypes = [
  { name: "Private Office", slug: "private-office" },
  { name: "Home Office", slug: "home-office" },
  { name: "Meeting Room", slug: "meeting-room" },
  { name: "Lounge Area", slug: "lounge-area" },
  { name: "Reception Area", slug: "reception-area" },
  { name: "Outdoor", slug: "outdoor" },
]

// Hook for detecting media queries (e.g., prefers-reduced-motion)
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

interface NavBarProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  categories: Category[]
}

const NavBar = ({ isOpen, setOpen, categories }: NavBarProps) => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false)

  const navbarRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const furnitureButtonRef = useRef<HTMLButtonElement>(null)
  const mobileLogoRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)

  // Detect reduced motion preference
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsScrolled(scrollY > 50)
  }, [scrollY])

  // Initial entrance animation
  useEffect(() => {
    const header = navbarRef.current
    const mobileLogoEl = mobileLogoRef.current
    const mobileButtonEl = mobileButtonRef.current

    if (header) {
      gsap.fromTo(header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2, onComplete: () => setIsInitialAnimationDone(true) }
      )
    }

    if (mobileLogoEl) {
      gsap.fromTo(mobileLogoEl,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
    }

    if (mobileButtonEl) {
      gsap.fromTo(mobileButtonEl,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [])

  // Scroll-based transforms for navbar
  useEffect(() => {
    const navContainer = navContainerRef.current
    const logo = logoRef.current

    if (!navContainer || !logo) return

    const handleScrollUpdate = () => {
      const progress = Math.min(scrollY / 100, 1)

      // Height: 80px -> 60px
      const height = 80 - (20 * progress)
      // Logo scale: 1 -> 0.85
      const scale = 1 - (0.15 * progress)
      // Border radius: 9999px -> 24px
      const radius = 9999 - ((9999 - 24) * progress)

      gsap.set(navContainer, { height, borderRadius: radius })
      gsap.set(logo, { scale })
    }

    handleScrollUpdate()

    window.addEventListener('scroll', handleScrollUpdate, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollUpdate)
  }, [scrollY])

  const shouldBeLight = isScrolled || !isHomePage

  // Close mega menu when clicking outside
  useEffect(() => {
    if (!megaMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        furnitureButtonRef.current &&
        !furnitureButtonRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false)
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [megaMenuOpen])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && megaMenuOpen) {
        setMegaMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [megaMenuOpen])

  // GSAP Animations for mega menu
  useEffect(() => {
    if (!megaMenuOpen || !megaMenuRef.current) return

    const menu = megaMenuRef.current
    const backdrop = document.querySelector('.mega-menu-backdrop')
    const container = menu.querySelector('.mega-menu-container')
    const categoryCards = menu.querySelectorAll('.category-card')
    const sidebar = menu.querySelector('#sidebar')
    const sidebarRooms = menu.querySelector('#sidebar-rooms')
    const roomLinks = menu.querySelectorAll('.room-link')
    const sidebarCta = menu.querySelector('#sidebar-cta')

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      gsap.set([menu, backdrop, container, categoryCards, sidebar, sidebarRooms, roomLinks, sidebarCta], {
        opacity: 1,
        clearProps: 'all'
      })
      return
    }

    // Calculate transform origin from button position
    const getTransformOrigin = () => {
      if (!furnitureButtonRef.current) return 'center top'

      const buttonRect = furnitureButtonRef.current.getBoundingClientRect()
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      return `${buttonCenterX}px ${buttonCenterY}px`
    }

    const transformOrigin = getTransformOrigin()

    // Set initial states with transform origin
    gsap.set(menu, {
      transformOrigin,
      opacity: 0,
      y: -30,
      scale: 0.9
    })
    gsap.set(container, {
      opacity: 0,
      scale: 0.96,
      '--backdrop-blur': '0px'
    })
    gsap.set(categoryCards, { opacity: 0, y: 40, scale: 0.95 })
    gsap.set(sidebar, { opacity: 0, x: 50 })
    gsap.set(sidebarRooms, { opacity: 0 })
    gsap.set(roomLinks, { opacity: 0, x: 30 })
    gsap.set(sidebarCta, { opacity: 0, y: 30, scale: 0.9 })

    // Create master timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
        duration: 0.8
      }
    })

    // 1. Backdrop fade in
    if (backdrop) {
      tl.fromTo(backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0
      )
    }

    // 2. Menu container - bouncy entrance with scale
    tl.to(menu,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.2)",
      },
      0.1
    )

    // 3. Inner container subtle scale with blur crystallization
    tl.to(container,
      {
        opacity: 1,
        scale: 1,
        '--backdrop-blur': '48px',
        duration: 0.7,
        ease: "power3.out"
      },
      0.2
    )

    // 4. Category cards cascade with smooth stagger
    tl.to(categoryCards,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          each: 0.08,
          ease: "power2.out"
        },
        ease: "power3.out"
      },
      0.4
    )

    // 5. Sidebar container slides in
    tl.to(sidebar,
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out"
      },
      0.5
    )

    // 6. Room links section fades in
    tl.to(sidebarRooms,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      },
      0.6
    )

    // 7. Individual room links with gentle stagger
    tl.to(roomLinks,
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: {
          each: 0.06,
          ease: "power1.out"
        },
        ease: "power2.out"
      },
      0.7
    )

    // 8. CTA button - final emphasis with scale
    tl.to(sidebarCta,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.3)"
      },
      0.9
    )

    // Cleanup function
    return () => {
      tl.kill()
    }
  }, [megaMenuOpen, prefersReducedMotion])

  // GSAP Exit Animations for mega menu
  useEffect(() => {
    let exitTl: gsap.core.Timeline | null = null

    if (!megaMenuOpen && megaMenuRef.current) {
      const menu = megaMenuRef.current
      const backdrop = document.querySelector('.mega-menu-backdrop')
      const container = menu.querySelector('.mega-menu-container')
      const categoryCards = menu.querySelectorAll('.category-card')
      const sidebar = menu.querySelector('#sidebar')
      const roomLinks = menu.querySelectorAll('.room-link')
      const sidebarCta = menu.querySelector('#sidebar-cta')

      // Skip animations if user prefers reduced motion
      if (prefersReducedMotion) {
        gsap.set([menu, backdrop, container, categoryCards, sidebar, roomLinks, sidebarCta], {
          opacity: 0,
          clearProps: 'all'
        })
      } else {
        // Create exit timeline (faster, reverse order)
        exitTl = gsap.timeline({
          defaults: {
            ease: "power2.in",
            duration: 0.3
          }
        })

        // Exit sequence (reverse order from entrance)
        exitTl.to(sidebarCta, { opacity: 0, y: 20, scale: 0.9, duration: 0.2 }, 0)
        exitTl.to(roomLinks, { opacity: 0, x: 20, duration: 0.2, stagger: { each: 0.03, from: "end" } }, 0)
        exitTl.to(sidebar, { opacity: 0, x: 30, duration: 0.25 }, 0.05)
        exitTl.to(categoryCards, { opacity: 0, y: -20, scale: 0.95, duration: 0.25, stagger: { each: 0.04, from: "end" } }, 0.05)
        exitTl.to(container, { opacity: 0, scale: 0.96, duration: 0.2 }, 0.15)
        exitTl.to(menu, { opacity: 0, y: -20, scale: 0.92, duration: 0.3, ease: "power2.in" }, 0.1)
        if (backdrop) {
          exitTl.to(backdrop, { opacity: 0, duration: 0.25 }, 0.15)
        }
      }
    }

    return () => {
      if (exitTl) exitTl.kill()
    }
  }, [megaMenuOpen, prefersReducedMotion])

  // Furniture button scale animation
  useEffect(() => {
    const btn = furnitureButtonRef.current
    if (!btn) return

    gsap.to(btn, {
      scale: megaMenuOpen ? 1.1 : 1,
      duration: 0.3,
      ease: 'power3.out'
    })
  }, [megaMenuOpen])

  // Hamburger animation
  const hamburgerTopRef = useRef<HTMLSpanElement>(null)
  const hamburgerMiddleRef = useRef<HTMLSpanElement>(null)
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const top = hamburgerTopRef.current
    const middle = hamburgerMiddleRef.current
    const bottom = hamburgerBottomRef.current

    if (!top || !middle || !bottom) return

    if (isOpen) {
      gsap.to(top, { rotation: 45, y: 8, duration: 0.3, ease: 'power3.out' })
      gsap.to(middle, { opacity: 0, duration: 0.3 })
      gsap.to(bottom, { rotation: -45, y: -8, duration: 0.3, ease: 'power3.out' })
    } else {
      gsap.to(top, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.out' })
      gsap.to(middle, { opacity: 1, duration: 0.3 })
      gsap.to(bottom, { rotation: 0, y: 0, duration: 0.3, ease: 'power3.out' })
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop: Floating navbar with scroll morphing */}
      <header
        ref={navbarRef}
        className="fixed top-6 left-0 right-0 z-50 hidden lg:flex justify-center px-4"
        style={{ opacity: 0, transform: 'translateY(-100px)' }}
      >
        <nav
          ref={navContainerRef}
          className={`flex items-center justify-between gap-8 px-8 backdrop-blur-2xl border transition-colors duration-500 ${
            shouldBeLight
              ? "bg-white/95 border-red-100 shadow-lg shadow-red-900/5"
              : "bg-white/10 border-white/20 shadow-xl shadow-black/20"
          }`}
          style={{ height: 80, borderRadius: 9999 }}
        >
          {/* Left Navigation Group */}
          <div className="flex items-center gap-2">
            <PillNavLink href="/" isLight={shouldBeLight} pathname={pathname}>
              Home
            </PillNavLink>
            <PillNavLink href="/about" isLight={shouldBeLight} pathname={pathname}>
              About
            </PillNavLink>
            <PillNavLink href="/services" isLight={shouldBeLight} pathname={pathname}>
              Services
            </PillNavLink>
          </div>

          {/* Center Logo */}
          <div
            ref={logoRef}
            className="flex-shrink-0"
          >
            <Link href="/">
              <Logo color={shouldBeLight ? "black" : "white"} />
            </Link>
          </div>

          {/* Right Navigation Group */}
          <div className="flex items-center gap-2">
            {/* Furniture Button */}
            <button
              ref={furnitureButtonRef}
              onClick={(e) => {
                e.stopPropagation()
                setMegaMenuOpen(!megaMenuOpen)
              }}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                shouldBeLight
                  ? megaMenuOpen
                    ? "text-white"
                    : "text-gray-700 hover:text-red-700"
                  : megaMenuOpen
                  ? "text-white"
                  : "text-white hover:text-red-400"
              }`}
            >
              Furniture
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  megaMenuOpen ? "rotate-180" : ""
                }`}
              />

              {/* Active Background */}
              <div
                className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-red-900 to-red-700 transition-opacity duration-300 ${
                  megaMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Visual Bridge to Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-red-700 to-transparent transition-all duration-200 ${
                  megaMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
              />
            </button>

            <PillNavLink href="/blog" isLight={shouldBeLight} pathname={pathname}>
              Blog
            </PillNavLink>
            <PillNavLink href="/contact" isLight={shouldBeLight} pathname={pathname}>
              Contact
            </PillNavLink>
          </div>
        </nav>
      </header>

      {/* Dropdown Furniture Mega Menu */}
      {megaMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="mega-menu-backdrop fixed inset-0 z-[59] bg-black/10 backdrop-blur-sm"
            onClick={() => setMegaMenuOpen(false)}
          />

          {/* Mega Menu */}
          <div
            ref={megaMenuRef}
            className="fixed left-0 right-0 top-24 z-[60] px-4 sm:px-6 md:px-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              className={`mega-menu-container max-w-7xl mx-auto rounded-2xl border overflow-hidden transition-colors duration-500 ${
                shouldBeLight
                  ? "bg-white/95 border-red-100 shadow-lg shadow-red-900/5"
                  : "bg-white/10 border-white/20 shadow-xl shadow-black/20"
              }`}
              style={{
                willChange: 'transform, opacity',
                backdropFilter: 'blur(var(--backdrop-blur, 48px))',
                WebkitBackdropFilter: 'blur(var(--backdrop-blur, 48px))'
              }}
            >
              <div className="grid grid-cols-12 gap-8 p-8">
                {/* Left Side - Category Grid */}
                <div className="col-span-8">
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                    shouldBeLight ? "text-red-800" : "text-red-400"
                  }`}>
                    Shop by Category
                  </h3>
                  <div className="grid grid-cols-3 gap-4" id="category-grid">
                    {categories.map((category, index) => (
                      <div key={category.id} className="category-card">
                        <CategoryCard
                          category={category}
                          index={index}
                          closeMegaMenu={() => setMegaMenuOpen(false)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Quick Links */}
                <div className="col-span-4 flex flex-col gap-6" id="sidebar">
                  {/* Shop by Room */}
                  <div id="sidebar-rooms">
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                      shouldBeLight ? "text-red-800" : "text-red-400"
                    }`}>
                      Shop by Room
                    </h3>
                    <div className="flex flex-col gap-2">
                      {roomTypes.map((room, index) => (
                        <Link
                          key={index}
                          href={`/rooms/${room.slug}`}
                          onClick={() => setMegaMenuOpen(false)}
                          className={`room-link group flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                            shouldBeLight
                              ? "hover:bg-red-50 text-gray-700 hover:text-red-700"
                              : "hover:bg-white/5 text-white/80 hover:text-white"
                          }`}
                        >
                          <span className="text-sm font-medium">{room.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All CTA */}
                  <div id="sidebar-cta">
                    <Link
                      href="/furniture"
                      onClick={() => setMegaMenuOpen(false)}
                      className="mt-auto px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-red-900 to-red-700 text-white hover:from-red-800 hover:to-red-600 transition-all duration-300 text-center block"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile: Logo + Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-6">
        <div ref={mobileLogoRef} style={{ opacity: 0 }}>
          <Link href="/">
            <Logo color={shouldBeLight ? "black" : "white"} />
          </Link>
        </div>

        <button
          ref={mobileButtonRef}
          onClick={() => setOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-2xl border transition-all duration-500"
          style={{
            opacity: 0,
            backgroundColor:
              shouldBeLight || isOpen
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.1)",
            borderColor:
              shouldBeLight || isOpen
                ? "rgba(220,38,38,0.1)"
                : "rgba(255,255,255,0.2)",
          }}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              ref={hamburgerTopRef}
              className={`w-full h-0.5 transform origin-center transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
            <span
              ref={hamburgerMiddleRef}
              className={`w-full h-0.5 transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
            <span
              ref={hamburgerBottomRef}
              className={`w-full h-0.5 transform origin-center transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
          </div>
        </button>
      </div>
    </>
  )
}

// Category Card Component with GSAP Hover Effects
const CategoryCard = ({
  category,
  index,
  closeMegaMenu,
}: {
  category: Category
  index: number
  closeMegaMenu: () => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const image = card.querySelector('.category-image')
    const badge = card.querySelector('.category-badge')
    const border = card.querySelector('.category-border')

    const onEnter = () => {
      gsap.to(card, { scale: 1.03, duration: 0.4, ease: "power2.out" })
      gsap.to(image, { scale: 1.12, duration: 0.6, ease: "power2.out" })
      gsap.to(badge, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "back.out(1.5)",
        delay: 0.1
      })
      gsap.to(border, {
        borderColor: 'rgba(239, 68, 68, 0.5)',
        duration: 0.3
      })
    }

    const onLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" })
      gsap.to(badge, {
        opacity: 0,
        x: -8,
        duration: 0.2,
        ease: "power2.in"
      })
      gsap.to(border, {
        borderColor: 'rgba(239, 68, 68, 0)',
        duration: 0.2
      })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)

    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <Link href={`/categories/${category.slug}`} onClick={closeMegaMenu}>
      <div
        ref={cardRef}
        className="relative h-[200px] rounded-xl overflow-hidden cursor-pointer"
      >
        {/* Image Background */}
        <div className="category-image absolute inset-0">
          {category.image_url && (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              sizes="300px"
              className="object-cover"
              quality={75}
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <h3 className="text-lg font-bold text-white mb-1">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-xs text-white/80 line-clamp-2">
              {category.description}
            </p>
          )}

          {/* Enhanced Arrow Badge with GSAP control */}
          <div className="category-badge mt-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 flex items-center gap-2 opacity-0">
            <span className="text-xs font-semibold text-white">View</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Hover Border */}
        <div className="category-border absolute inset-0 border-2 border-red-500/0 rounded-xl pointer-events-none" />
      </div>
    </Link>
  )
}

// Regular Navigation Link
const PillNavLink = ({
  href,
  children,
  isLight,
  pathname,
}: {
  href: string
  children: React.ReactNode
  isLight: boolean
  pathname: string
}) => {
  const isActive = pathname === href

  return (
    <Link href={href} className="relative">
      <div
        className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
          isLight
            ? isActive
              ? "text-white"
              : "text-gray-700 hover:text-red-700"
            : isActive
            ? "text-black"
            : "text-white hover:text-red-400"
        }`}
      >
        {children}

        {/* Active Background */}
        <div
          className={`absolute inset-0 -z-10 rounded-full transition-opacity duration-300 ${
            isLight
              ? "bg-gradient-to-r from-red-900 to-red-700"
              : "bg-white"
          } ${isActive ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </Link>
  )
}

export default NavBar
