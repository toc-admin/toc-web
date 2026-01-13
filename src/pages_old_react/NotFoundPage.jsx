import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | The Office Company</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Browse our furniture catalog or contact us for assistance."
        />
      </Helmet>

      <div className="w-full min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden flex items-center justify-center">
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

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-20 h-20 border-4 border-red-200/30"
          />
          <motion.div
            animate={{
              y: [0, 60, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-40 right-20 w-32 h-32 border-4 border-red-300/20 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 40, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-red-400/20"
          />
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isContentInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 80,
              }}
              className="mb-8"
            >
              <h1 className="text-[150px] sm:text-[200px] md:text-[250px] lg:text-[300px] font-black leading-none bg-gradient-to-br from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent select-none">
                404
              </h1>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <svg
                    className="w-16 h-16 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Oops! Page Not Found
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent w-48 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                The page you're looking for seems to have been moved, deleted, or never existed in the first place.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for furniture products..."
                  className="w-full px-6 py-4 pr-32 border-2 border-gray-300 focus:border-red-700 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      navigate(`/furniture/all?q=${e.target.value}`);
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector("input");
                    if (input.value) {
                      navigate(`/furniture/all?q=${input.value}`);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold hover:from-red-800 hover:to-red-600 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                to="/"
                className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Link 1 */}
              <Link
                to="/furniture"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-red-700 transition-colors text-center">
                  Furniture Catalog
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Browse 500+ products
                </p>
              </Link>

              {/* Link 2 */}
              <Link
                to="/services"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-red-700 transition-colors text-center">
                  Our Services
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Consulting & design
                </p>
              </Link>

              {/* Link 3 */}
              <Link
                to="/about-us"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-red-700 transition-colors text-center">
                  About Us
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Our story & team
                </p>
              </Link>

              {/* Link 4 */}
              <Link
                to="/contact"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-red-700 transition-colors text-center">
                  Contact Us
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Get in touch
                </p>
              </Link>
            </motion.div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isContentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-gray-500">
                If you believe this is an error, please{" "}
                <Link to="/contact" className="text-red-700 hover:text-red-900 font-semibold underline">
                  contact us
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;