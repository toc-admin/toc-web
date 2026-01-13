import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index = 0, isInView = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      className="h-full"
    >
      <Link to={`/product/${product.slug}`}>
        <div className="group h-full flex flex-col bg-white border-2 border-gray-100 hover:border-red-700 transition-all duration-300 overflow-hidden hover:shadow-2xl cursor-pointer">
          {/* Product Image */}
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            <img
              src={product.image || "/assets/products/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 bg-red-700 text-white text-xs font-bold uppercase tracking-wider">
                  New
                </span>
              )}
              {product.isFeatured && (
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            {/* Quick View Button - appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="px-6 py-3 bg-white text-black font-semibold uppercase tracking-wider hover:bg-red-700 hover:text-white transition-all duration-300 shadow-lg">
                Quick View
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col p-6 space-y-3">
            {/* Brand */}
            {product.brand && (
              <span className="text-xs font-semibold uppercase tracking-wider text-red-700">
                {product.brand}
              </span>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            {/* Category */}
            {product.category && (
              <p className="text-sm text-gray-500">
                {product.category}
              </p>
            )}

            {/* Features/Specs - if available */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA Button */}
            <button className="w-full px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
              Request Quote
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
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;