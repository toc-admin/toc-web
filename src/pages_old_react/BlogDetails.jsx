import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import blogs from "../config/data";
import transition from "../transition";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((blog) => blog.slug === slug);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
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
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles (excluding current)
  const relatedArticles = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{blog.name} | The Office Company Blog</title>
        <meta name="description" content={blog.shortDescription} />
        <meta property="og:title" content={`${blog.name} | The Office Company Blog`} />
        <meta property="og:description" content={blog.shortDescription} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.name} | The Office Company Blog`} />
        <meta name="twitter:description" content={blog.shortDescription} />
        <meta name="twitter:image" content={blog.image} />
      </Helmet>

      <div className="pt-32 md:pt-44">
        {/* Back Button - Floating */}
        <div className="fixed top-24 left-4 md:left-8 z-40">
          <Link
            to="/blog"
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-red-700 group-hover:-translate-x-1 transition-all duration-300"
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
            <span className="text-sm font-semibold text-gray-700 group-hover:text-red-700 transition-colors duration-300">
              Back
            </span>
          </Link>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 md:py-24"
        >
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-red-800">
                Article
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600 font-medium">{blog.date}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8"
            >
              {blog.name}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 mb-8 origin-left"
            />

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium"
            >
              {blog.shortDescription}
            </motion.p>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 mb-16 md:mb-24"
        >
          <div className="relative overflow-hidden max-w-6xl mx-auto">
            <img
              src={blog.image}
              alt={blog.name}
              className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* Article Content */}
        <div
          ref={contentRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 pb-24 md:pb-32"
        >
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div
              className="prose prose-lg md:prose-xl max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-red-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-red-700 
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800
                prose-img:rounded-none prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: blog.longDescription }}
            />
          </motion.article>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Related Articles
                </h2>
                <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1,
                    }}
                  >
                    <Link
                      to={`/blog/${article.slug}`}
                      className="group block bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300"
                    >
                      <div className="relative h-[250px] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-red-900 transition-colors duration-300 line-clamp-2">
                          {article.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {article.shortDescription}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 group-hover:gap-3 transition-all duration-300">
                          Read More
                          <svg
                            className="w-4 h-4"
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
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-center mt-12"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
                >
                  View All Articles
                  <svg
                    className="w-5 h-5"
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
          </div>
        )}
      </div>
    </>
  );
};

export default transition(BlogDetails);