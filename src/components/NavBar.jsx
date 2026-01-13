import { useState, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ROUTES } from "../config/routes";
import officeChairs from "../assets/furniture/office-chairs.jpeg";
import deskTables from "../assets/furniture/desk-tables.jpeg";
import storage from "../assets/furniture/storage.jpeg";
import acoustic from "../assets/furniture/acoustic.jpeg";
import lighting from "../assets/furniture/lighting.jpeg";
import lounge from "../assets/furniture/lounge.jpeg";

// Furniture categories for mega menu
const furnitureCategories = [
  {
    name: "Office Chairs",
    slug: "office-chairs",
    image: officeChairs,
    description: "Executive, task, and conference seating",
  },
  {
    name: "Desks & Tables",
    slug: "desks-tables",
    image: deskTables,
    description: "From executive to collaborative workstations",
  },
  {
    name: "Storage Solutions",
    slug: "storage",
    image: storage,
    description: "Cabinets, shelving, and organization",
  },
  {
    name: "Acoustic Solutions",
    slug: "acoustic",
    image: acoustic,
    description: "Phone booths and sound management",
  },
  {
    name: "Lighting",
    slug: "lighting",
    image: lighting,
    description: "Task, ambient, and architectural lighting",
  },
  {
    name: "Soft Seating",
    slug: "soft-seating",
    image: lounge,
    description: "Lounge chairs and collaborative seating",
  },
];

const roomTypes = [
  { name: "Private Office", slug: "private-office" },
  { name: "Meeting Room", slug: "meeting-room" },
  { name: "Open Office", slug: "open-office" },
  { name: "Reception", slug: "reception" },
];

const topBrands = [
  { name: "Haworth", slug: "haworth" },
  { name: "BoConcept", slug: "boconcept" },
  { name: "Boss Design", slug: "boss-design" },
  { name: "Brunner", slug: "brunner" },
];

const NavBar = ({ scrollY, isOpen, setOpen }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const megaMenuRef = useRef(null);
  const furnitureButtonRef = useRef(null);

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const shouldBeLight = isScrolled || !isHomePage;

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the button and the mega menu
      if (
        activeMegaMenu &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        furnitureButtonRef.current &&
        !furnitureButtonRef.current.contains(event.target)
      ) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMegaMenu]);

  return (
    <>
      {/* Desktop: Floating navbar with mega menu */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-6 left-0 right-0 z-50 hidden lg:flex justify-center px-4"
      >
        <nav
          className={`flex items-center gap-6 pl-6 pr-3 py-3 rounded-full backdrop-blur-2xl border transition-all duration-500 ${
            shouldBeLight
              ? "bg-white/95 border-red-100 shadow-lg shadow-red-900/5"
              : "bg-white/10 border-white/20 shadow-xl shadow-black/20"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex-shrink-0">
            <Logo color={shouldBeLight ? "black" : "white"} />
          </Link>

          {/* Divider */}
          <div
            className={`h-8 w-px ${
              shouldBeLight ? "bg-red-100" : "bg-white/20"
            }`}
          />

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <PillNavLink to={ROUTES.HOME} isLight={shouldBeLight}>
              Home
            </PillNavLink>

            <PillNavLink to={ROUTES.ABOUT_US} isLight={shouldBeLight}>
              About
            </PillNavLink>

            <PillNavLink to={ROUTES.SERVICES} isLight={shouldBeLight}>
              Services
            </PillNavLink>

            {/* Furniture Dropdown */}
            <div className="relative">
              <button
                ref={furnitureButtonRef}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveMegaMenu(
                    activeMegaMenu === "furniture" ? null : "furniture"
                  );
                }}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                  shouldBeLight
                    ? activeMegaMenu === "furniture"
                      ? "text-white"
                      : "text-gray-700 hover:text-red-700"
                    : activeMegaMenu === "furniture"
                    ? "text-black"
                    : "text-white hover:text-red-400"
                }`}
              >
                Furniture
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeMegaMenu === "furniture" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                {/* Active Background */}
                {activeMegaMenu === "furniture" && (
                  <motion.div
                    layoutId="pill-active-mega"
                    className={`absolute inset-0 -z-10 rounded-full ${
                      shouldBeLight
                        ? "bg-gradient-to-r from-red-900 to-red-700"
                        : "bg-white"
                    }`}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            </div>

            <PillNavLink to={ROUTES.BLOG} isLight={shouldBeLight}>
              Blog
            </PillNavLink>

            <PillNavLink to={ROUTES.CONTACT} isLight={shouldBeLight}>
              Contact
            </PillNavLink>
          </div>
        </nav>

        {/* Furniture Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu === "furniture" && (
            <FurnitureMegaMenu
              shouldBeLight={shouldBeLight}
              ref={megaMenuRef}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile: Logo + Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to={ROUTES.HOME}>
            <Logo color={shouldBeLight ? "black" : "white"} />
          </Link>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-2xl border transition-all duration-500"
          style={{
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
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full h-0.5 transform origin-center transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`w-full h-0.5 transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full h-0.5 transform origin-center transition-colors duration-300 ${
                shouldBeLight || isOpen ? "bg-black" : "bg-white"
              }`}
            />
          </div>
        </motion.button>
      </div>
    </>
  );
};

// Furniture Mega Menu Component
const FurnitureMegaMenu = forwardRef(({ shouldBeLight }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-24 w-[90vw] max-w-7xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`rounded-3xl backdrop-blur-2xl border overflow-hidden shadow-2xl ${
          shouldBeLight
            ? "bg-white/95 border-red-100"
            : "bg-gray-900/95 border-white/20"
        }`}
      >
        <div className="grid grid-cols-12 gap-8 p-8">
          {/* Left Side - Categories with Images */}
          <div className="col-span-8 grid grid-cols-3 gap-4">
            <div className="col-span-3 mb-4">
              <h3
                className={`text-xs font-bold uppercase tracking-widest ${
                  shouldBeLight ? "text-red-800" : "text-red-400"
                }`}
              >
                Shop by Category
              </h3>
            </div>

            {furnitureCategories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.slug}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 h-32 ${
                    shouldBeLight
                      ? "border-red-100 hover:border-red-700 hover:shadow-xl"
                      : "border-white/20 hover:border-red-500 hover:shadow-2xl"
                  }`}
                >
                  {/* Category Image */}
                  <div
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-4">
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-red-300 transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-gray-300 text-xs line-clamp-1">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-3 h-3 text-red-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side - Quick Links */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Shop by Room */}
            <div>
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                  shouldBeLight ? "text-red-800" : "text-red-400"
                }`}
              >
                Shop by Room
              </h3>
              <div className="flex flex-col gap-2">
                {roomTypes.map((room, index) => (
                  <Link
                    key={index}
                    to={`/room/${room.slug}`}
                    className={`group flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                      shouldBeLight
                        ? "hover:bg-red-50 text-gray-700 hover:text-red-700"
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{room.name}</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className={`h-px ${
                shouldBeLight ? "bg-red-100" : "bg-white/10"
              }`}
            />

            {/* Top Brands */}
            <div>
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                  shouldBeLight ? "text-red-800" : "text-red-400"
                }`}
              >
                Top Brands
              </h3>
              <div className="flex flex-col gap-2">
                {topBrands.map((brand, index) => (
                  <Link
                    key={index}
                    to={`/furniture/brand/${brand.slug}`}
                    className={`group flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                      shouldBeLight
                        ? "hover:bg-red-50 text-gray-700 hover:text-red-700"
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{brand.name}</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* View All CTA */}
            <Link
              to="/furniture"
              className={`mt-auto px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 text-center ${
                shouldBeLight
                  ? "bg-gradient-to-r from-red-900 to-red-700 text-white hover:from-red-800 hover:to-red-600"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

FurnitureMegaMenu.displayName = 'FurnitureMegaMenu';

// Regular Navigation Link
const PillNavLink = ({ to, children, isLight }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative">
      <motion.div
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
        {isActive && (
          <motion.div
            layoutId="pill-active"
            className={`absolute inset-0 -z-10 rounded-full ${
              isLight
                ? "bg-gradient-to-r from-red-900 to-red-700"
                : "bg-white"
            }`}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavBar;