'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Logo from "./Logo"

const footerLinks = {
  company: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Office Consulting", path: "/services" },
    { name: "Office Management", path: "/services" },
    { name: "Design & Furniture", path: "/services" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Terms of Service", path: "/terms" },
  ],
}

const Footer = () => {
  const footerRef = useRef(null)
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.2 })

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-red-950 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,.1) 35px,
            rgba(255,255,255,.1) 70px
          )`
        }} />
      </div>

      {/* Main Footer Content */}
      <div
        ref={footerRef}
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-20 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Section - Takes more space */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <Logo color="white" />

            <p className="text-base text-white/70 leading-relaxed max-w-md">
              Creating inspiring workspaces that drive productivity, foster
              collaboration, and elevate business success across the region.
            </p>

            {/* Decorative Line */}
            <div className="h-1 bg-gradient-to-r from-red-500 to-transparent w-24" />

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-red-300">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-white/70 hover:text-red-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-red-300">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-white/70 hover:text-red-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-red-300">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              {/* Address */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-red-400/60 uppercase tracking-wider font-semibold">
                  Address
                </p>
                <p className="text-white/70">Poljačka ul. 56</p>
                <p className="text-white/70">10000 Zagreb, Croatia</p>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-red-400/60 uppercase tracking-wider font-semibold">
                  Phone
                </p>
                <a
                  href="tel:+385913011552"
                  className="text-white/70 hover:text-red-300 transition-colors duration-300"
                >
                  +385 91 3011 552
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-red-400/60 uppercase tracking-wider font-semibold">
                  Email
                </p>
                <a
                  href="mailto:info@theofficecompany.eu"
                  className="text-white/70 hover:text-red-300 transition-colors duration-300"
                >
                  info@theofficecompany.eu
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isFooterInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="relative z-10 border-t border-red-800/30 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} The Office Company d.o.o. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="text-sm text-white/50 hover:text-red-300 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
