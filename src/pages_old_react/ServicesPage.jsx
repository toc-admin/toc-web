import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import transition from "../transition";
import Services from "../components/Services";

const introContent = [
  "The Office Company offers a diverse range of flexible workspace solutions, including private offices, co-working spaces, and meeting rooms, designed to accommodate businesses of all sizes and adapt to their evolving needs.",
  "Our services extend beyond just physical space; we provide comprehensive support including high-speed internet, administrative assistance, and access to networking events, ensuring that our clients can focus on their core business activities.",
  "With a commitment to innovation, The Office Company integrates cutting-edge technology into our offerings, such as smart office solutions and customizable workspace configurations, enabling clients to create an environment that enhances productivity and collaboration.",
];

const serviceDetails = [
  {
    number: "01",
    title: "Serviced Office Consulting",
    subtitle: "Strategic Workspace Solutions",
    description:
      "Our mission at The Office Company is to revolutionise the office experience by providing innovative, flexible workspace solutions for end users and at the same time providing serviced office consulting services and setting up co-working spaces with premium furniture and office equipment, dedicated to offering service on any type of location, regardless of the type of the building.",
    features: [
      "Customizable office spaces",
      "Premium furniture selection",
      "Location-agnostic solutions",
      "End-to-end consulting",
    ],
  },
  {
    number: "02",
    title: "Serviced Office Management",
    subtitle: "Expert Operational Excellence",
    description:
      "The leadership team at The Office Company is composed of industry veterans with diverse backgrounds in real estate management, serviced office management, interior design and office equipment supplies - ensuring a well-rounded approach to decision-making and strategy development. Our organisational structure promotes collaboration and innovation, with cross-functional teams that empower employees at all levels.",
    features: [
      "Industry veteran leadership",
      "Open book approach",
      "Transparent communication",
      "Agile market response",
    ],
  },
  {
    number: "03",
    title: "Office Design & Furniture",
    subtitle: "Spaces That Inspire",
    description:
      "Well-being, both mental and physical, has become paramount, driving the design of environments that support holistic health and productivity. In the hybrid society, well-being is not separate from work but something to be maintained continuously. Together with world top office furniture brands we create places where people love to be!",
    features: [
      "Holistic well-being focus",
      "World-class furniture brands",
      "Flexible shared spaces",
      "Hybrid work optimization",
    ],
  },
];

const ServicesPage = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <>
      <Helmet>
        <title>
          Our Services | Flexible Office Solutions for Every Business
        </title>
        <meta
          name="description"
          content="Explore The Office Company's services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth."
        />
        <meta
          property="og:title"
          content="Our Services | Flexible Office Solutions for Every Business"
        />
        <meta
          property="og:description"
          content="Explore The Office Company's services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth."
        />
        <meta
          property="og:image"
          content="https://www.theofficecompany.eu/og/toc-11.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.theofficecompany.eu/services"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Our Services | Flexible Office Solutions for Every Business"
        />
        <meta
          name="twitter:description"
          content="Explore The Office Company's services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth."
        />
        <meta
          name="twitter:image"
          content="https://www.theofficecompany.eu/og/toc-toc-compress.webp"
        />
      </Helmet>

      <div className="pt-32 md:pt-44">
        {/* Hero Section with Grid */}
        <div
          ref={heroRef}
          className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-white"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
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

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Title */}
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="inline-block">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm font-bold uppercase tracking-widest text-red-800"
                >
                  What We Offer
                </motion.span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
                Comprehensive
                <br />
                <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                  Office
                </span>
                <br />
                Solutions
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isHeroInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
                className="h-2 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left"
              />
            </motion.div>

            {/* Right - Description Cards */}
            <div className="flex flex-col gap-6">
              {introContent.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2 + index * 0.1,
                  }}
                  className="bg-white border border-red-100 p-6 hover:shadow-xl hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-black bg-gradient-to-br from-red-200 to-red-100 bg-clip-text text-transparent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-gray-700 flex-1">
                      {paragraph}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Component */}
        <Services />

        {/* Service Details - Modern Cards */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {serviceDetails.map((service, index) => (
              <ModernServiceCard
                key={index}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ModernServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-white via-red-50/30 to-white border border-red-100 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 0.05 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-700 origin-bottom-right"
      />

      <div className="relative z-10 p-8 md:p-12">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-8 mb-8">
          {/* Number Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-red-900 to-red-700 text-white text-2xl md:text-3xl font-black group-hover:from-red-800 group-hover:to-red-600 transition-all duration-300">
              {service.number}
            </div>
          </motion.div>

          {/* Title & Subtitle */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-sm font-bold uppercase tracking-widest text-red-800 mb-3"
            >
              {service.subtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:translate-x-2 transition-transform duration-300"
            >
              {service.title}
            </motion.h3>
          </div>

          {/* Arrow Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="hidden md:block"
          >
            <svg
              className="w-12 h-12 text-red-300 group-hover:text-red-700 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300"
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
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="text-base md:text-lg leading-relaxed text-gray-700 max-w-4xl mb-8"
        >
          {service.description}
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {service.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm font-medium text-gray-600"
            >
              <svg
                className="w-5 h-5 text-red-700 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar with CTA */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-8 pt-8 border-t border-red-100 flex items-center justify-between origin-left"
        >
          <button className="group/btn px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white text-sm font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2">
            Learn More
            <svg
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
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
          </button>

          <span className="text-sm text-gray-400 hidden md:block">
            Service {service.number}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default transition(ServicesPage);