import serviceOne from "../assets/images/tocPlaning.jpg";
import serviceTwo from "../assets/images/tocExecution.webp";
import serviceThree from "../assets/images/tocMonitoring.jpg";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const processes = [
  {
    number: "01",
    title: "Planning",
    description: "Strategic workspace design and comprehensive planning to optimize your office environment for maximum productivity and efficiency.",
    image: serviceOne,
  },
  {
    number: "02",
    title: "Execution",
    description: "Seamless implementation of your office vision with meticulous attention to detail, timelines, and quality standards.",
    image: serviceTwo,
  },
  {
    number: "03",
    title: "Monitoring",
    description: "Continuous oversight and optimization to ensure your workspace performs at its best and adapts to your evolving needs.",
    image: serviceThree,
  },
];

const HowWeDoIt = ({ id }) => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <div
      className="py-24 md:py-32 flex flex-col items-start justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-white relative overflow-hidden"
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
      <div ref={headerRef} className="relative z-10 flex flex-col gap-4 items-start justify-start mb-20 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-bold uppercase tracking-widest text-red-800"
        >
          Our Process
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          How We Do It
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-base md:text-lg leading-relaxed text-gray-700 mt-4"
        >
          Our proven three-phase approach ensures every project delivers
          exceptional results, from initial concept to long-term success.
        </motion.p>
      </div>

      {/* Process Steps */}
      <div className="relative z-10 flex flex-col gap-16 md:gap-24 w-full">
        {processes.map((process, index) => (
          <ProcessStep key={index} process={process} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProcessStep = ({ process, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-12 lg:gap-16`}
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 h-[400px] md:h-[500px] relative group border-2 border-red-100 hover:border-red-700 transition-colors duration-300"
      >
        <motion.div
          style={{
            backgroundImage: `url(${process.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/20 group-hover:from-red-900/10 group-hover:to-black/10 transition-all duration-500" />
        
        {/* Number Badge on Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center"
        >
          <span className="text-3xl font-black text-white">
            {process.number}
          </span>
        </motion.div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col gap-6"
      >
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          {process.title}
        </motion.h3>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24 origin-left"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="text-base md:text-lg leading-relaxed text-gray-700"
        >
          {process.description}
        </motion.p>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="flex flex-col gap-3 mt-2"
        >
          {[
            index === 0 ? ["Strategy Development", "Resource Allocation", "Timeline Creation"] :
            index === 1 ? ["Project Management", "Quality Assurance", "Stakeholder Communication"] :
            ["Performance Tracking", "Continuous Improvement", "Support & Maintenance"]
          ][0].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex-shrink-0" />
              <span className="text-sm font-medium text-gray-600">{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowWeDoIt;