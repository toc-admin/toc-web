import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  { value: "11+", label: "Years of Excellence" },
  { value: "17", label: "Locations" },
  { value: "40k+", label: "Square Meters" },
];

const highlights = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "10+ Years Experience",
    description: "Consistent delivery of flexible office solutions"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Open-Book Collaboration",
    description: "Transparent partnerships with landlords"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Future-Ready",
    description: "25-30% of offices will be serviced by 2030"
  }
];

const AboutSection = ({ id }) => {
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const contentRef = useRef(null);
  const highlightsRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const isHighlightsInView = useInView(highlightsRef, { once: true, amount: 0.3 });

  return (
    <div 
      id={id}
      className="flex flex-col gap-16 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden"
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

      {/* Top Label */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-sm font-bold uppercase tracking-widest text-red-800"
      >
        About Us
      </motion.span>

      {/* Main Headline */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10 w-full"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight max-w-5xl">
          Every Story Has
          <br />
          <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
            A Beginning
          </span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left mt-8"
        />
      </motion.div>

      {/* Two Column Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
        {/* Left Side - Stats */}
        <motion.div
          ref={statsRef}
          className="lg:w-2/5 flex flex-col gap-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-12 lg:border-r-2 border-red-100 lg:pr-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.2 
                }}
                className="flex flex-col items-start justify-start group"
              >
                <p className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-red-900 to-red-700 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-bold text-gray-600 mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Decorative Element */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isStatsInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="hidden lg:block h-1 bg-gradient-to-r from-red-900 to-transparent w-3/4 origin-left"
          />
        </motion.div>

        {/* Right Side - Content */}
        <div ref={contentRef} className="lg:w-3/5 flex flex-col gap-8 lg:pl-8">
          {/* Subheadline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight"
          >
            …ours starts with amazing workplaces.
          </motion.h3>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isContentInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-px bg-gradient-to-r from-red-700 to-transparent w-24 origin-left"
          />

          {/* Body Text - First Part */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex flex-col gap-6 text-base md:text-lg leading-relaxed text-gray-700"
          >
            <p>
              Our company was established with a clear goal: to help landlords and
              businesses maximize the potential of their office spaces, no matter
              the building type or location. With over 10 years of experience in
              serviced office management and interior design, we have consistently
              delivered flexible office solutions that respond to market needs.
            </p>
          </motion.div>

          {/* Icon Cards - Visual Break */}
          <motion.div
            ref={highlightsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isHighlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.15 
                }}
                className="bg-white border border-red-100 p-6 flex flex-col gap-3 hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                <div className="text-red-700">
                  {highlight.icon}
                </div>
                <h4 className="font-bold text-lg text-gray-900">
                  {highlight.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Body Text - Second Part */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="flex flex-col gap-6 text-base md:text-lg leading-relaxed text-gray-700"
          >
            <p>
              Our open-book collaboration with landlords allows us to enhance
              profitability and improve business models. Today, we are proud of
              our track record of success in the serviced office industry, and our
              expertise positions us as a trusted partner.
            </p>
            
            <p>
              By 2030, it's projected that 25-30% of all office space will be 
              serviced, a significant increase from the current 5%. We are ready to 
              evolve with these market trends and lead the way in the region, helping 
              landlords capture momentum and make the most of their portfolios.
            </p>
          </motion.div>

          {/* Body Text - Final Part */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="text-base md:text-lg leading-relaxed text-gray-700"
          >
            <p>
              We're excited to continue helping clients unlock the full potential of their
              office spaces for long-term success.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="mt-4"
          >
            <Link
              to="/about-us"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
            >
              Learn More About Us
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
      </div>
    </div>
  );
};

export default AboutSection;