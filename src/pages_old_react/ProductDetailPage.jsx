import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import ProductCard from "../components/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// Mock product data (replace with Strapi fetch)
const mockProduct = {
  id: 1,
  name: "Zody Task Chair",
  slug: "haworth-zody-task-chair",
  sku: "HAW-ZDY-001",
  brand: {
    name: "Haworth",
    logo: "/assets/brands/haworth-logo.png",
    slug: "haworth",
  },
  category: {
    name: "Office Chairs",
    slug: "office-chairs",
  },
  mainCategory: {
    name: "Chairs",
    slug: "chairs",
  },
  shortDescription:
    "Award-winning ergonomic task chair designed to support your body and enhance productivity throughout the workday.",
  longDescription: `The Zody Task Chair represents the pinnacle of ergonomic seating design. Developed in partnership with leading ergonomists and healthcare professionals, this chair provides exceptional support and comfort for extended work sessions.

Built with sustainability in mind, the Zody uses recycled materials and is fully recyclable at end of life. Its innovative design reduces pressure points and promotes healthy posture, making it an ideal choice for modern workspaces.`,
  images: [
    "/assets/products/zody-1.jpg",
    "/assets/products/zody-2.jpg",
    "/assets/products/zody-3.jpg",
    "/assets/products/zody-4.jpg",
    "/assets/products/zody-5.jpg",
  ],
  isNew: true,
  isFeatured: true,
  rooms: ["Private Office", "Meeting Rooms", "Reception Area"],
  features: [
    "Ergonomic Design",
    "Height Adjustable",
    "Lumbar Support",
    "4D Armrests",
    "Breathable Mesh",
    "Tilt Lock",
  ],
  specifications: {
    dimensions: {
      "Overall Height": "39-43 inches",
      "Seat Width": "20.5 inches",
      "Seat Depth": "18-20 inches",
      "Armrest Height": "Adjustable 7-11 inches",
      Weight: "52 lbs",
    },
    materials: {
      Frame: "Aluminum & Reinforced Nylon",
      Upholstery: "Performance Mesh / Fabric Options",
      Base: "5-Star Aluminum Base",
      Casters: "Dual-Wheel Carpet Casters",
    },
    certifications: [
      "BIFMA Certified",
      "GREENGUARD Gold Certified",
      "ISO 9001 Certified",
      "Cradle to Cradle Silver",
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Graphite", hex: "#3D3D3D" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Burgundy", hex: "#7C2D3A" },
      { name: "Grey", hex: "#9E9E9E" },
    ],
    warranty: "12-year comprehensive warranty",
  },
  datasheet: "/assets/datasheets/zody-datasheet.pdf",
};

// Related products (mock data)
const relatedProducts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 10,
  name: `Related Product ${i + 1}`,
  slug: `related-product-${i + 1}`,
  brand: "Haworth",
  category: "Office Chairs",
  image: `/assets/products/related-${i + 1}.jpg`,
  isNew: false,
  isFeatured: false,
  features: ["Ergonomic", "Adjustable"],
}));

const ProductDetailPage = () => {
  const { productSlug } = useParams();
  const product = mockProduct; // Replace with actual fetch

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(product.specifications.colors[0]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const galleryRef = useRef(null);
  const detailsRef = useRef(null);
  const relatedRef = useRef(null);

  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.3 });
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 });
  const isRelatedInView = useInView(relatedRef, { once: true, amount: 0.2 });

  return (
    <>
      <Helmet>
        <title>{product.name} | {product.brand.name} | The Office Company</title>
        <meta name="description" content={product.shortDescription} />
        <meta property="og:title" content={`${product.name} | ${product.brand.name}`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>

      <div className="w-full bg-white pt-24">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/furniture" className="hover:text-red-700 transition-colors">
              Furniture
            </Link>
            <span>/</span>
            <Link
              to={`/furniture/category/${product.mainCategory.slug}`}
              className="hover:text-red-700 transition-colors"
            >
              {product.mainCategory.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Main Product Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <motion.div
              ref={galleryRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
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

              {/* Main Image Swiper */}
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                navigation
                pagination={{ clickable: true }}
                className="w-full aspect-square bg-gray-100 border-2 border-gray-200"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails */}
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs, FreeMode]}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="w-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-square bg-gray-100 border-2 border-gray-200 hover:border-red-700 transition-all cursor-pointer overflow-hidden">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              ref={detailsRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isDetailsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Brand Logo */}
              <p>{product.brandName || "Haworth"}</p>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  SKU: {product.sku}
                </p>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2">
                <Link
                  to={`/furniture/category/${product.mainCategory.slug}`}
                  className="text-sm font-semibold text-red-700 hover:text-red-900 transition-colors"
                >
                  {product.category.name}
                </Link>
              </div>

              {/* Short Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-200" />

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Available Colors
                </h3>
                <div className="flex items-center gap-3">
                  {product.specifications.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-red-700 scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      title={color.name}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: <span className="font-semibold">{selectedColor.name}</span>
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
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
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200" />

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Request a Quote
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
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={product.datasheet}
                    download
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Datasheet
                  </a>

                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact
                  </Link>
                </div>
              </div>

              {/* Suitable For Rooms */}
              <div className="pt-6 border-t-2 border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Works Great In
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.rooms.map((room, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tabs Section: Overview, Specifications, Certifications */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12 bg-gray-50">
          {/* Tab Navigation */}
          <div className="border-b-2 border-gray-200 mb-8">
            <div className="flex gap-0 overflow-x-auto">
              {["overview", "specifications", "certifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "border-b-4 border-red-700 text-red-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </div>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Dimensions */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Dimensions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications.dimensions).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between p-4 bg-white border border-gray-200"
                        >
                          <span className="font-semibold text-gray-700">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Materials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications.materials).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between p-4 bg-white border border-gray-200"
                        >
                          <span className="font-semibold text-gray-700">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Warranty */}
                <div className="p-6 bg-red-50 border-2 border-red-200">
                  <h3 className="text-xl font-bold mb-2 text-red-900">Warranty</h3>
                  <p className="text-gray-700">{product.specifications.warranty}</p>
                </div>
              </motion.div>
            )}

            {activeTab === "certifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6">Certifications & Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200"
                    >
                      <svg
                        className="w-8 h-8 text-green-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-800">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Related Products */}
        <section
          ref={relatedRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              You Might Also Like
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isRelatedInView}
              />
            ))}
          </div>
        </section>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <QuoteFormModal
            product={product}
            onClose={() => setShowQuoteForm(false)}
          />
        )}
      </div>
    </>
  );
};

// Quote Form Modal Component
const QuoteFormModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "1",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (send to API or email service)
    console.log("Quote request:", { ...formData, product: product.name });
    alert("Quote request sent! We'll contact you soon.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-900 to-red-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Request a Quote</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-gray-50 border-b-2 border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 object-cover border-2 border-gray-200"
            />
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand.name}</p>
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Requirements
            </label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project, preferred delivery date, or any special requirements..."
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
            >
              Send Quote Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold uppercase tracking-wider hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;