'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import NavBar from './NavBar'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import SmoothScroll from './SmoothScroll'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setOpen] = useState(false)

  const closeMobileMenu = () => {
    setOpen(false)
  }

  return (
    <SmoothScroll>
      <NavBar isOpen={isOpen} setOpen={setOpen} />

      <div className="bg-bright-grey">
        {children}

        {isOpen && (
          <AnimatePresence>
            <MobileMenu closeMenu={closeMobileMenu} />
          </AnimatePresence>
        )}

        <Footer />
      </div>
    </SmoothScroll>
  )
}
