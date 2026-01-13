import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import haworth from "../assets/logos/Haworth_Logo_Black.png";
import boConcept from "../assets/logos/boconcept_logo_white.png";
import brunnner from "../assets/logos/brunner_logo_transparent.png";
import buzzi from "../assets/logos/BuzziSpace.png";
import cappelini from "../assets/logos/Cappellini.png";
import gan from "../assets/logos/GAN.png";
import hush from "../assets/logos/hushoffice_logo_white.png";
import boss from "../assets/logos/logo-boss-design-brand.png";
import pablo from "../assets/logos/PabloDesigns.png";
import vk from "../assets/logos/vkLight.png";
import cassina from "../assets/logos/cassina.svg";
import cassinaBg from "../assets/images/cassinaBg.png";
import vkBg from "../assets/images/vkLightBg.jpg";
import haworthBg from "../assets/images/haworthback.jpeg";
import boBg from "../assets/images/boConceptBg.webp";
import brunBg from "../assets/images/brunnerBg.webp";
import bossBg from "../assets/images/bossDesignBg.webp";
import buzziBg from "../assets/images/buzziBg.webp";
import cappeliniBg from "../assets/images/cappeliniBg.webp";
import ganBg from "../assets/images/ganBg.webp";
import hushBg from "../assets/images/hushofficeBg.webp";
import pabloBg from "../assets/images/pabloBg.webp";
import infiniti from "../assets/images/infiniti.webp";
import infinitiBg from "../assets/images/infinitiBg.jpg";

const brands = [
  { logo: haworth, bg: haworthBg, alt: "Haworth", featured: true, link: "https://www.haworth.com" },
  { logo: boConcept, bg: boBg, alt: "BoConcept", link: "https://www.boconcept.com" },
  { logo: boss, bg: bossBg, alt: "Boss Design", link: "https://www.bossdesign.com" },
  { logo: brunnner, bg: brunBg, alt: "Brunner", link: "https://brunner-group.com" },
  { logo: buzzi, bg: buzziBg, alt: "BuzziSpace", isLarge: true, link: "https://www.buzzi.space" },
  { logo: cappelini, bg: cappeliniBg, alt: "Cappellini", link: "https://www.cappellini.com" },
  { logo: gan, bg: ganBg, alt: "GAN", link: "https://www.gan-rugs.com/" },
  { logo: hush, bg: hushBg, alt: "Hush Office", isLarge: true, link: "https://www.hushoffice.com" },
  { logo: pablo, bg: pabloBg, alt: "Pablo Designs", link: "https://www.pablodesign.com" },
  { logo: cassina, bg: cassinaBg, alt: "Cassina", link: "https://www.cassina.com/ww/en.html" },
  { logo: vk, bg: vkBg, alt: "VK Light", isLarge: true, link: "https://vkled.gr/en/" },
  { logo: infiniti, bg: infinitiBg, alt: "Infiniti Design", isLarge: true, link: "https://www.infinitidesign.it/en/" },
];

const BrandsSection = ({ id }) => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <div 
      id={id}
      className="flex flex-col gap-12 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #7C2D3A 1px, transparent 1px),
              linear-gradient(to bottom, #7C2D3A 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col gap-4 max-w-4xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-bold uppercase tracking-widest text-red-800"
        >
          Our Partners
        </motion.span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
          Partnering with
          <br />
          <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
            Industry Leaders
          </span>
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-base md:text-lg text-gray-700 leading-relaxed mt-2"
        >
          We collaborate with world-renowned furniture and design brands to deliver 
          exceptional quality and innovation in every project.
        </motion.p>
      </motion.div>

      {/* Featured Brand - Full Width */}
      <div className="relative z-10 w-full">
        <BrandCard 
          brand={brands[0]} 
          featured={true}
          index={0}
        />
      </div>

      {/* Brands Grid - 2 Columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mt-8">
        {brands.slice(1).map((brand, index) => (
          <BrandCard 
            key={index} 
            brand={brand} 
            index={index + 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t-2 border-red-100 mt-8"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            Interested in partnering with us?
          </h3>
          <p className="text-gray-600">
            Let's discuss how we can bring premium design to your project.
          </p>
        </div>
        <Link
          to="/contact"
          className="group px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
        >
          Get In Touch
          <svg 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

const BrandCard = ({ brand, featured = false, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Link to={brand.link}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1 
      }}
      className={`group relative overflow-hidden cursor-pointer border-2 border-red-100 hover:border-red-700 transition-colors duration-300 ${
        featured ? 'h-[500px] md:h-[600px]' : 'h-[400px] md:h-[450px]'
      }`}
    >
      {/* Background Image */}
      <motion.div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(124,45,58,0.3) 50%, rgba(0,0,0,0.2) 100%), url(${brand.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      />

      {/* Overlay gradient that intensifies on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-black/0 group-hover:from-red-900/10 group-hover:to-black/20 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.1 + 0.2 
          }}
          whileHover={{ scale: 1.05 }}
          alt={brand.alt}
          src={brand.logo}
          className={`object-contain z-10 transition-all duration-300 ${
            brand.isLarge 
              ? 'h-32 md:h-40' 
              : featured 
                ? 'w-72 md:w-96 h-24 md:h-32' 
                : 'w-56 md:w-72 h-20 md:h-24'
          } group-hover:brightness-110`}
        />

        {/* Hover Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-lg">
              {brand.alt}
            </span>
            <svg 
              className="w-6 h-6 text-red-400 transform group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Corner Badge for Featured */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="absolute top-6 right-6 bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider z-20"
        >
          Featured Partner
        </motion.div>
      )}
    </motion.div>
    </Link>
  );
};

export default BrandsSection;