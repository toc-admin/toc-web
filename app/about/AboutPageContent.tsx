'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "200+", label: "Happy Clients" },
  { value: "50+", label: "Team Members" },
]

const values = [
  {
    title: "Excellence",
    description: "We set the highest standards in everything we do, from product selection to project execution.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "We stay ahead of industry trends to bring you cutting-edge solutions and designs.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "We build lasting relationships through honest communication and transparent practices.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    description: "We're committed to environmentally responsible practices and sustainable materials.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description: "The Office Company was founded with a mission to transform Croatian workspaces.",
  },
  {
    year: "2024",
    title: "First Coworking Location",
    description: "We signed our first coworking location in Zagreb.",
  },
  {
    year: "2025",
    title: "Premium Partnerships",
    description: "Established partnerships with world-leading furniture brands like Haworth and BoConcept.",
  },
  {
    year: "2026",
    title: "Digital Transformation",
    description: "Launched comprehensive digital platform for seamless client experience.",
  },
]

const team = [
  {
    name: "Leadership Team",
    description: "Seasoned professionals with decades of combined experience in workspace design and management.",
  },
  {
    name: "Design Specialists",
    description: "Award-winning designers who create functional and inspiring office environments.",
  },
  {
    name: "Project Managers",
    description: "Dedicated experts ensuring every project is delivered on time and exceeds expectations.",
  },
  {
    name: "Support Staff",
    description: "Committed professionals providing ongoing assistance and maintenance services.",
  },
]

export default function AboutPageContent() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const storyRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)
  const teamRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 })
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 })

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 lg:pb-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-white"
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

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-bold uppercase tracking-widest text-red-800"
            >
              About Us
            </motion.span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-6 mb-8">
              Building
              <br />
              <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                The Future
              </span>
              <br />
              Of Work
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
        </div>
      </div>

      {/* Stats Section */}
      {/* <div
        ref={statsRef}
        className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 text-center border-2 border-red-100 hover:border-red-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-red-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-semibold uppercase tracking-wider text-gray-700">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Our Story Section */}
      <div
        ref={storyRef}
        className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-red-800">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                Building Excellence, One Workspace at a Time
              </h2>
              <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                The Office Company was born from a simple observation: businesses deserve
                workspaces that truly work for them. Since our founding in 2018, we&apos;ve
                been on a mission to transform how companies approach their office environments.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                What started as a small consulting firm has grown into Croatia&apos;s most
                comprehensive office solutions provider. Today, we offer everything - from
                strategic workspace planning and office and hospitality furniture to existing businesses as well as complete coworking implementation and
                management services.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Our success is built on a foundation of deep industry expertise, unwavering
                commitment to quality, and genuine partnerships with our clients. Every
                project we undertake is an opportunity to create something exceptional.
              </p>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-lg order-1 lg:order-2"
            >
              <div
                style={{
                  backgroundImage: `url(/images/tocAbout.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div
        ref={valuesRef}
        className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 items-center text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              What Drives Us
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
            <p className="text-base md:text-lg leading-relaxed text-gray-700 mt-4">
              Our core values guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                className="group bg-white border-2 border-red-100 p-6 md:p-8 hover:border-red-700 hover:shadow-xl transition-all duration-300 rounded-lg"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-red-900 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        ref={timelineRef}
        className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 items-center text-center mb-12 md:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              Milestones That Matter
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
          </div>

          <div className="space-y-6 md:space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-4 md:gap-6 items-start group"
              >
                <div className="flex-shrink-0 w-20 md:w-28">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-red-900 group-hover:text-red-700 transition-colors duration-300">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 border-l-4 border-red-900 pl-4 md:pl-6 pb-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 group-hover:text-red-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div
        ref={teamRef}
        className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 items-center text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              The People Behind Our Success
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
            <p className="text-base md:text-lg leading-relaxed text-gray-700 mt-4">
              Our diverse team of experts brings together decades of experience and a
              shared passion for creating exceptional workspaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                className="bg-white p-6 md:p-8 border-2 border-red-100 hover:border-red-700 hover:shadow-xl transition-all duration-300 rounded-lg"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900">
                  {member.name}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Transform Your Workspace?
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-red-50 max-w-2xl">
              Let&apos;s discuss how we can help you create an office environment that
              drives success and inspires your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/#contact"
                className="group px-8 py-4 bg-white text-red-900 font-semibold uppercase tracking-wider hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 rounded-lg"
              >
                Contact Us
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
              <Link
                href="/#services"
                className="group px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-red-900 transition-all duration-300 rounded-lg text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
