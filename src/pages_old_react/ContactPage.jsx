import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import transition from "../transition";
import { Helmet } from "react-helmet";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visit Us",
    details: ["Poljačka ul. 56", "10000 Zagreb", "Croatia"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Call Us",
    details: ["+385 91 3011 552", "Mon-Fri: 9am - 6pm"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    details: ["info@theofficecompany.eu", "We'll reply within 24h"],
  },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "cceaf155-e5f2-4eac-b47e-e067b850ea4b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you! We'll get back to you soon.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        e.target.reset();
      } else {
        toast.error("Oops! Something went wrong. Please try again.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Network error. Please check your connection.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Get in Touch with The Office Company</title>
        <meta
          name="description"
          content="Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs."
        />
        <meta
          property="og:title"
          content="Contact Us | Get in Touch with The Office Company"
        />
        <meta
          property="og:description"
          content="Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs."
        />
        <meta
          property="og:image"
          content="https://www.theofficecompany.eu/og/toc-11.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.theofficecompany.eu/contact"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Us | Get in Touch with The Office Company"
        />
        <meta
          name="twitter:description"
          content="Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs."
        />
        <meta
          name="twitter:image"
          content="https://www.theofficecompany.eu/og/toc-toc-compress.webp"
        />
      </Helmet>

      <div className="pt-32 md:pt-44">
        {/* Hero Section */}
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

          <div className="relative z-10 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-bold uppercase tracking-widest text-red-800"
            >
              Get In Touch
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-6 mb-8"
            >
              Let's Create
              <br />
              <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                Your Perfect
              </span>
              <br />
              Workspace
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-2xl"
            >
              Have questions? Our team is ready to assist you with office space
              solutions that fit your needs. Reach out and let's start the
              conversation.
            </motion.p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 md:py-24 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5 + index * 0.1,
                }}
                className="group bg-gradient-to-br from-red-50/50 to-white border border-red-100 p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className={`leading-relaxed ${
                        idx === 0
                          ? "text-base font-semibold text-gray-900"
                          : "text-sm text-gray-600"
                      }`}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form & Map Section */}
        <div
          ref={formRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 md:py-24 bg-gray-50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 md:p-12 border border-gray-200"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Send Us a Message
              </h2>
              <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24 mb-8" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full px-6 py-4 border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    required
                    className="w-full px-6 py-4 border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+385 91 234 5678"
                    className="w-full px-6 py-4 border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    rows={6}
                    className="w-full px-6 py-4 border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-100 outline-none resize-none transition-all duration-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Google Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative h-[500px] lg:h-full min-h-[500px] bg-gray-200 overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.057870306277!2d15.912123492218598!3d45.81009939651834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d1309bbba9e3%3A0xd45dda7df121b3!2sPolja%C4%8Dka%20ul.%2056%2C%2010000%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1761831955860!5m2!1sen!2shr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Office Company Location"
              />
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 pointer-events-none">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Our Office</h3>
                  <p className="text-sm text-white/80">
                    Poljačka ul. 56
                    <br />
                    10000 Zagreb, Croatia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default transition(ContactPage);