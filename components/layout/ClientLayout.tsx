'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NavBar from './NavBar'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import SmoothScroll from './SmoothScroll'
import BackToTop from './BackToTop'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

interface ClientLayoutProps {
  children: React.ReactNode
  categories: Category[]
}

export default function ClientLayout({
  children,
  categories,
}: ClientLayoutProps) {
  const [isOpen, setOpen] = useState(false)
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const closeMobileMenu = () => {
    setOpen(false)
  }

  return (
    <>
      <SmoothScroll>
        <NavBar isOpen={isOpen} setOpen={setOpen} categories={categories} />

        <div className="bg-bright-grey">
          {children}

          {isOpen && (
            <MobileMenu
              closeMenu={closeMobileMenu}
              categories={categories}
              isOpen={isOpen}
            />
          )}

          <Footer />
        </div>
      </SmoothScroll>
      {/* Portal container for modals - outside SmoothScroll to avoid transform issues */}
      <div id="modal-root" />
      <BackToTop />
    </>
  )
}
