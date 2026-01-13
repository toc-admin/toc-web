'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Planning & Strategy",
    description: "We start by understanding your business objectives, workspace requirements, and budget. Our experts conduct thorough analysis and develop a comprehensive strategy tailored to your needs.",
    image: "/images/tocPlanning.webp",
    highlights: [
      "Needs Assessment",
      "Space Analysis",
      "Budget Planning",
      "Timeline Development",
    ],
  },
  {
    number: "02",
    title: "Design & Execution",
    description: "Our design team brings your vision to life with detailed plans and 3D visualizations. We handle everything from furniture selection to installation, ensuring flawless execution.",
    image: "/images/tocExecution.webp",
    highlights: [
      "3D Visualization",
      "Furniture Selection",
      "Project Management",
      "Quality Installation",
    ],
  },
  {
    number: "03",
    title: "Support & Optimization",
    description: "We don't stop at installation. Our team provides ongoing support, maintenance, and optimization services to ensure your workspace continues to perform at its best.",
    image: "/images/tocSupport.webp",
    highlights: [
      "Ongoing Maintenance",
      "Performance Monitoring",
      "Optimization Services",
      "24/7 Support",
    ],
  },
]

interface HowWeDoItProps {
  id?: string
}

const HowWeDoIt = ({ id }: HowWeDoItProps) => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 })

  return (
    <div
      className="py-24 md:py-32 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gradient-to-br from-gray-50 via-white to-red-50/30 relative overflow-hidden"
      id={id}
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

      {/* Header Section */}
      <div ref={headerRef} className="relative z-10 flex flex-col gap-4 items-center text-center mb-20 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-sm font-bold uppercase tracking-widest text-red-800"
        >
          Our Process
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          How We Do It
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-lg leading-relaxed text-gray-700 mt-4"
        >
          Our proven three-step approach ensures seamless delivery from concept
          to completion, with exceptional results every time.
        </motion.p>
      </div>

      {/* Steps */}
      <div className="relative z-10 flex flex-col gap-0 w-full">
        {steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  )
}

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" })

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }}
      className="w-full py-12 md:py-20"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
        {/* Image Side */}
        <div className={`relative ${isEven ? "" : "lg:col-start-2"}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] overflow-hidden group"
          >
            {/* Number Badge */}
            <div className="absolute top-8 left-8 z-20 bg-gradient-to-br from-red-900 to-red-700 text-white w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl md:text-4xl font-black">{step.number}</span>
            </div>

            {/* Image */}
            <div
              style={{
                backgroundImage: `url(${step.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-transparent group-hover:from-red-900/20 transition-all duration-500" />
          </motion.div>
        </div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className={`flex flex-col gap-6 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {step.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {step.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3">
            {step.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-red-700 rounded-full" />
                <span className="text-sm md:text-base font-medium text-gray-800">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Separator Line (not on last item) */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mt-12 md:mt-20 origin-center"
        />
      )}
    </motion.div>
  )
}

export default HowWeDoIt
