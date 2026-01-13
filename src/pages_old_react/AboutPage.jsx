import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import transition from "../transition";
import AboutSection from "../components/AboutSection";
import purpose from "../assets/images/tocConsulting.webp";
import mission from "../assets/images/tocPlaning.jpg";
import facilities from "../assets/images/tocManagement.jpeg";

const contentSections = [
  {
    title: "Mission Statement and Vision",
    subtitle: "Our Purpose & Direction",
    image: purpose,
    content: [
      {
        text: "Our mission at The Office Company is to revolutionize the office experience by providing innovative, flexible workspace solutions that empower businesses to thrive in a dynamic environment.",
        highlight: true,
      },
      {
        text: "We envision a future where every organization, regardless of size, has access to customizable office spaces that foster collaboration, creativity, and productivity, ultimately enhancing employee satisfaction and performance.",
      },
      {
        text: "Through our commitment to sustainability and community engagement, we aim to create workspaces that not only meet the needs of our clients but also contribute positively to the environment and society as a whole.",
      },
    ],
    features: ["Innovation-Driven", "Client-Focused", "Sustainability", "Community Impact"],
  },
  {
    title: "Leadership Team and Structure",
    subtitle: "Expert Guidance",
    image: mission,
    content: [
      {
        text: "The leadership team at The Office Company is composed of industry veterans with diverse backgrounds in real estate, design, and technology, ensuring a well-rounded approach to decision-making and strategy development.",
        highlight: true,
      },
      {
        text: "Our organizational structure promotes collaboration and innovation, with cross-functional teams that empower employees at all levels to contribute ideas and solutions that drive the company forward.",
      },
      {
        text: "Regular leadership meetings and transparent communication channels foster a culture of accountability and alignment, enabling the team to respond swiftly to market changes and client needs.",
      },
    ],
    features: ["Veteran Leadership", "Cross-Functional", "Transparent", "Agile Response"],
  },
  {
    title: "Location and Facilities",
    subtitle: "Modern Workspaces",
    image: facilities,
    content: [
      {
        text: "The Office Company is helping building owners by transforming their asset to a modern workplace regardless of the location. The most important thing is to provide flexibility for companies and keeping up with the demand for building owners.",
        highlight: true,
      },
      {
        text: "Our facilities are designed with modern aesthetics and functionality in mind, featuring state-of-the-art technology, collaborative workspaces, and private meeting rooms that cater to diverse business needs and enhance productivity.",
      },
      {
        text: "We prioritize sustainability in our facility management, incorporating energy-efficient systems and eco-friendly materials to create a workspace that not only supports our clients' operations but also aligns with their corporate social responsibility goals.",
      },
    ],
    features: ["Prime Locations", "Modern Design", "Smart Technology", "Eco-Friendly"],
  },
];

const objectivesData = [
  {
    title: "Short-Term Objectives",
    subtitle: "Immediate Focus",
    description:
      "In the short term, The Office Company aims to increase market penetration by 20% within the next year through targeted marketing campaigns and strategic partnerships, enhancing brand visibility and attracting new clients to our flexible workspace solutions.",
    stats: [
      { value: "20%", label: "Market Growth Target" },
      { value: "12", label: "Months Timeline" },
    ],
  },
  {
    title: "Long-Term Objectives",
    subtitle: "Future Vision",
    description:
      "Long-term objectives include expanding our footprint into three new major cities over the next five years, allowing us to tap into diverse markets and cater to a broader range of businesses seeking innovative office solutions.",
    stats: [
      { value: "3", label: "New Cities" },
      { value: "5", label: "Years Plan" },
    ],
  },
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <>
      <Helmet>
        <title>
          About Us | The Office Company - Your Partner in Business Success
        </title>
        <meta
          name="description"
          content="Learn more about The Office Company's mission to provide top-tier office solutions. Discover our story, values, and commitment to your business growth."
        />
        <meta
          property="og:title"
          content="About Us | The Office Company - Your Partner in Business Success"
        />
        <meta
          property="og:description"
          content="Learn more about The Office Company's mission to provide top-tier office solutions. Discover our story, values, and commitment to your business growth."
        />
        <meta
          property="og:image"
          content="https://www.theofficecompany.eu/og/toc-11.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.theofficecompany.eu/about-us"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us | The Office Company - Your Partner in Business Success"
        />
        <meta
          name="twitter:description"
          content="Learn more about The Office Company's mission to provide top-tier office solutions. Discover our story, values, and commitment to your business growth."
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

        {/* About Section */}
        <AboutSection />

        {/* Content Sections */}
        {contentSections.map((section, index) => (
          <ModernContentSection
            key={index}
            section={section}
            index={index}
          />
        ))}

        {/* Objectives */}
        {objectivesData.map((objective, index) => (
          <ObjectiveCard key={index} objective={objective} index={index} />
        ))}

        {/* Commitment Section */}
        <CommitmentSection />
      </div>
    </>
  );
};

const ModernContentSection = ({ section, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 ${
        isEven ? "bg-white" : "bg-gradient-to-br from-red-50/30 via-white to-red-50/20"
      }`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${
          !isEven ? "lg:grid-flow-dense" : ""
        }`}
      >
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative group ${!isEven ? "lg:col-start-2" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <motion.img
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              alt={section.title}
              src={section.image}
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
            <motion.div
              animate={{ opacity: isHovered ? 0.1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-700"
            />
          </div>

          {/* Number Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-900 to-red-700 text-white flex items-center justify-center text-3xl font-black"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`flex flex-col justify-center gap-6 ${
            !isEven ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-sm font-bold uppercase tracking-widest text-red-800"
          >
            {section.subtitle}
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            {section.title}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24 origin-left"
          />

          {/* Content Paragraphs */}
          <div className="flex flex-col gap-6">
            {section.content.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.6 + idx * 0.1,
                }}
                className={`leading-relaxed ${
                  paragraph.highlight
                    ? "text-lg md:text-xl font-semibold text-gray-900"
                    : "text-base md:text-lg text-gray-700"
                }`}
              >
                {paragraph.text}
              </motion.p>
            ))}
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.9,
            }}
            className="grid grid-cols-2 gap-4 mt-4"
          >
            {section.features.map((feature, idx) => (
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
        </motion.div>
      </div>
    </div>
  );
};

const ObjectiveCard = ({ objective, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-gradient-to-br from-gray-900 via-red-950 to-black text-white mx-4 sm:mx-6 md:mx-12 lg:mx-24 xl:mx-44 my-16 md:my-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,255,255,.1) 35px,
              rgba(255,255,255,.1) 70px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Number & Title */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-sm font-bold uppercase tracking-widest text-red-300"
            >
              {objective.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              {objective.title}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-24 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="text-base md:text-lg leading-relaxed text-white/90"
            >
              {objective.description}
            </motion.p>
          </div>

          {/* Right - Stats */}
          <div className="flex lg:flex-col gap-8 justify-start lg:justify-center border-t lg:border-t-0 lg:border-l border-red-800/30 pt-8 lg:pt-0 lg:pl-8">
            {objective.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.6 + idx * 0.1,
                }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CommitmentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-br from-red-50/50 via-white to-red-50/30 border-y border-red-100 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-bold uppercase tracking-widest text-red-800"
        >
          Our Commitment
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-8"
        >
          Sustainable Future
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="text-lg md:text-xl font-semibold leading-relaxed text-gray-900"
        >
          The Office Company is committed to achieving a 30% reduction in
          operational carbon footprint by implementing sustainable practices
          across all facilities, aligning with our mission to promote
          environmental responsibility while enhancing our appeal to
          eco-conscious clients.
        </motion.p>

        {/* Stat Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="inline-flex items-center gap-4 mt-12 px-8 py-6 bg-gradient-to-br from-red-900 to-red-700 text-white"
        >
          <span className="text-5xl font-black">30%</span>
          <div className="border-l border-white/20 pl-4">
            <span className="block text-sm uppercase tracking-wider text-white/60">
              Carbon Reduction
            </span>
            <span className="block text-sm font-semibold">Target Goal</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default transition(AboutPage);