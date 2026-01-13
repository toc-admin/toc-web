import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

  // Confetti effect on mount
  useEffect(() => {
    // Optional: Add confetti library here if you want
    // For now, we'll use CSS animations
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You | Quote Request Received | The Office Company</title>
        <meta
          name="description"
          content="Thank you for your quote request. Our team will contact you soon with a personalized furniture solution."
        />
      </Helmet>

      <div className="w-full min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden">
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
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-red-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-40 right-20 w-32 h-32 bg-red-300/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32">
          <div ref={contentRef} className="max-w-4xl mx-auto">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isContentInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
              }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                {/* Pulsing background */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-green-500 rounded-full blur-2xl"
                />
                {/* Icon */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={isContentInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
                Thank You!
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent w-48 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Your quote request has been received
              </p>
            </motion.div>

            {/* Information Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="bg-white border-2 border-gray-200 p-8 md:p-12 mb-12 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">We Review Your Request</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our furniture experts will carefully review your requirements and prepare a customized solution.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">We Contact You</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Expect a call or email from our team within <span className="font-semibold text-red-700">24-48 hours</span> (business days).
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Get Your Custom Quote</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Receive a detailed quote with product specifications, pricing, and delivery timeline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-4">
                  Need immediate assistance?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+385913011552"
                    className="flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +385 91 3011 552
                  </a>
                  <span className="text-gray-400">or</span>
                  <a
                    href="mailto:info@theofficecompany.eu"
                    className="flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    info@theofficecompany.eu
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/furniture"
                className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                Continue Shopping
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 text-center"
              >
                Back to Home
              </Link>
            </motion.div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1 */}
              <Link
                to="/furniture/all"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-700 transition-colors">
                  Browse All Products
                </h3>
                <p className="text-sm text-gray-600">
                  Explore our complete catalog of 500+ premium furniture pieces
                </p>
              </Link>

              {/* Card 2 */}
              <Link
                to="/services"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-700 transition-colors">
                  Our Services
                </h3>
                <p className="text-sm text-gray-600">
                  Learn about our consulting, management, and design services
                </p>
              </Link>

              {/* Card 3 */}
              <Link
                to="/about-us"
                className="group bg-white border-2 border-gray-200 hover:border-red-700 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-700 transition-colors">
                  About Us
                </h3>
                <p className="text-sm text-gray-600">
                  Discover our story and 11+ years of office solutions expertise
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;