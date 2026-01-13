import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import blogs from "../config/data";
import BlogPost from "./BlogPost";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ROUTES } from "../config/routes";

const MarketInsights = ({ id }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <div 
      id={id}
      className="flex flex-col gap-12 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white relative overflow-hidden"
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
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 w-full">
        {/* Left Side - Title & Description */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold uppercase tracking-widest text-red-800"
          >
            Latest News
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Market
            <br />
            <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
              Insights
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
            Stay ahead with our latest analysis, trends, and insights from the 
            serviced office industry.
          </motion.p>
        </motion.div>

        {/* Right Side - Navigation & CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="flex items-center gap-4"
        >
          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-red-100 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 hover:text-white hover:border-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={activeIndex === 0}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-red-100 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 hover:text-white hover:border-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={activeIndex >= blogs.length - 3}
            >
              <svg 
                className="w-6 h-6" 
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
            </button>
          </div>

          {/* View All Button */}
          <Link
            to={ROUTES.BLOG}
            className="group px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2 text-sm"
          >
            View All
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
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

      {/* Slider Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="text-2xl font-black bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="h-px bg-gradient-to-r from-red-700 to-transparent w-12" />
        <span className="text-lg text-gray-400">
          {String(blogs.length).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Swiper Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="relative z-10 w-full"
      >
        <Swiper
          onSwiper={setSwiperRef}
          speed={700}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            380: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="!overflow-visible"
        >
          {blogs.map((blog, blogIndex) => (
            <SwiperSlide key={blogIndex}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: blogIndex * 0.1 
                }}
              >
                <BlogPost
                  image={blog.image}
                  name={blog.name}
                  shortDescription={blog.shortDescription}
                  id={blog.id}
                  slug={blog.slug}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="relative z-10 w-full h-1 bg-red-100 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-900 to-red-700"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${((activeIndex + 1) / blogs.length) * 100}%` 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default MarketInsights;