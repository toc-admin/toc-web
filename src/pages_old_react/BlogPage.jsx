import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import blogs from "../config/data";
import transition from "../transition";
import BlogPost from "../components/BlogPost";

const BlogPage = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  // Featured post (first blog)
  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  return (
    <>
      <Helmet>
        <title>Insights & Tips | The Office Company Blog</title>
        <meta
          name="description"
          content="Stay informed with The Office Company's blog. Read expert insights on office trends, productivity tips, and the future of workspaces."
        />
        <meta
          property="og:title"
          content="Insights & Tips | The Office Company Blog"
        />
        <meta
          property="og:description"
          content="Stay informed with The Office Company's blog. Read expert insights on office trends, productivity tips, and the future of workspaces."
        />
        <meta
          property="og:image"
          content="https://www.theofficecompany.eu/og/toc-11.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.theofficecompany.eu/blog"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Insights & Tips | The Office Company Blog"
        />
        <meta
          name="twitter:description"
          content="Stay informed with The Office Company's blog. Read expert insights on office trends, productivity tips, and the future of workspaces."
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

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
              {/* Left - Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm font-bold uppercase tracking-widest text-red-800"
                >
                  Our Blog
                </motion.span>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-6 mb-8">
                  Insights &
                  <br />
                  <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                    Market News
                  </span>
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

              {/* Right - Description */}
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-base md:text-lg leading-relaxed text-gray-700 max-w-xl"
              >
                Stay informed with expert insights on office trends, productivity
                tips, and the future of workspaces. Discover how we're shaping the
                industry.
              </motion.p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-red-900 to-red-700 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider z-20">
                  Featured
                </div>
                <div className="bg-white border border-red-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        src={featuredPost.image}
                        alt={featuredPost.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4">
                        Latest Article
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 group-hover:text-red-900 transition-colors duration-300">
                        {featuredPost.name}
                      </h2>
                      <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
                        {featuredPost.shortDescription}
                      </p>
                      <a
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 group/btn w-fit"
                      >
                        Read Article
                        <svg
                          className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
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
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* All Articles Grid */}
        <div
          ref={gridRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                All Articles
              </h2>
              <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
              </p>
              <p className="text-sm text-gray-600">Updated regularly</p>
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 * index,
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
            ))}
          </div>

          {/* Empty State (if no blogs) */}
          {blogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isGridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-24"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">No Articles Yet</h3>
                <p className="text-gray-600">
                  Check back soon for insights and updates from The Office Company.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-gray-900 via-red-950 to-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-red-300 mb-4 block">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-24 mx-auto mb-8" />
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Get the latest insights, trends, and news delivered straight to your
              inbox. Join our community of workspace innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none transition-all duration-300"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default transition(BlogPage);