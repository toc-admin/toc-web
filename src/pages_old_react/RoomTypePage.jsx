import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";

// Room type data structure (in real app, fetch from Strapi based on slug)
const roomTypeData = {
  "reception-area": {
    name: "Reception Area",
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Make a lasting first impression with elegant reception furniture",
    heroImage: "/assets/rooms/reception.jpg",
    longDescription:
      "Create a welcoming first impression with our curated selection of reception furniture. From sophisticated seating to professional reception desks, our collection combines style with functionality to represent your brand perfectly.",
    keyConsiderations: [
      "First impressions matter",
      "Comfort for waiting guests",
      "Professional appearance",
      "Brand representation",
    ],
    recommendedCategories: ["Lounge Chairs", "Reception Furniture", "Sofas & Armchairs"],
  },
  "private-office": {
    name: "Private Office",
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    description: "Executive spaces designed for focused work and productivity",
    heroImage: "/assets/rooms/private-office.jpg",
    longDescription:
      "Equip your private office with premium furniture that enhances productivity and reflects professional success. Our selection includes ergonomic task chairs, executive desks, and storage solutions designed for the modern professional.",
    keyConsiderations: [
      "Ergonomic comfort",
      "Professional aesthetics",
      "Storage solutions",
      "Privacy and focus",
    ],
    recommendedCategories: ["Office Chairs", "Office Desks", "Storage Solutions"],
  },
  "meeting-rooms": {
    name: "Meeting Rooms",
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: "Collaborative spaces that inspire creativity and productivity",
    heroImage: "/assets/rooms/meeting.jpg",
    longDescription:
      "Design meeting rooms that facilitate collaboration and innovation. Our furniture selection includes conference tables, comfortable seating, and acoustic solutions to create the perfect environment for productive discussions.",
    keyConsiderations: [
      "Collaborative design",
      "Video conferencing ready",
      "Acoustic control",
      "Flexible configurations",
    ],
    recommendedCategories: ["Conference Tables", "Conference Chairs", "Acoustic Solutions"],
  },
  "lounge-area": {
    name: "Lounge Area",
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    description: "Relaxed zones for informal collaboration and relaxation",
    heroImage: "/assets/rooms/lounge.jpg",
    longDescription:
      "Create inviting lounge spaces that encourage informal collaboration and provide comfortable areas for breaks. Our lounge furniture combines style with comfort to create welcoming social spaces.",
    keyConsiderations: [
      "Comfort and relaxation",
      "Informal collaboration",
      "Brand culture",
      "Flexible seating",
    ],
    recommendedCategories: ["Sofas & Armchairs", "Lounge Tables", "Soft Seating"],
  },
  outdoor: {
    name: "Outdoor",
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Extend your workspace outside with weather-resistant furniture",
    heroImage: "/assets/rooms/outdoor.jpg",
    longDescription:
      "Transform outdoor spaces into functional work areas with our weather-resistant furniture collection. Perfect for terraces, balconies, and outdoor meeting areas.",
    keyConsiderations: [
      "Weather resistance",
      "Durability",
      "UV protection",
      "Easy maintenance",
    ],
    recommendedCategories: ["Outdoor Furniture", "Outdoor Tables", "Outdoor Seating"],
  },
};

// Category filters
const categoryFilters = [
  "Office Chairs",
  "Conference Chairs",
  "Office Desks",
  "Conference Tables",
  "Meeting Tables",
  "Storage Solutions",
  "Acoustic Solutions",
  "Lounge Seating",
  "Reception Furniture",
];

// Feature filters
const featureFilters = [
  "Ergonomic",
  "Height Adjustable",
  "Stackable",
  "Modular",
  "Weather Resistant",
  "Wheels",
];

// Mock products (replace with Strapi data)
const mockProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  slug: `product-${i + 1}`,
  brand: ["Haworth", "BoConcept", "Boss Design", "Brunner"][i % 4],
  category: ["Office Chairs", "Conference Tables", "Lounge Seating"][i % 3],
  image: `/assets/products/product-${(i % 8) + 1}.jpg`,
  isNew: i < 3,
  isFeatured: i < 5,
  features: ["Ergonomic", "Adjustable", "Modern Design"],
}));

const RoomTypePage = () => {
  const { roomSlug } = useParams();
  const room = roomTypeData[roomSlug] || roomTypeData.outdoor;

  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const productsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.1 });

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter logic
  const filteredProducts = mockProducts;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle filter changes
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedFeatures.length > 0;

  return (
    <>
      <Helmet>
        <title>{room.name} Furniture | Premium Office Solutions | The Office Company</title>
        <meta
          name="description"
          content={`${room.description}. Browse our curated selection of furniture perfect for ${room.name.toLowerCase()}.`}
        />
      </Helmet>

      <div className="w-full">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 text-white overflow-hidden"
        >
          {/* Background Image */}
          <div
            style={{
              backgroundImage: `url(${room.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/50" />

          {/* Breadcrumb */}
          <div className="absolute top-24 left-4 sm:left-6 md:left-12 lg:left-24 xl:left-44 z-10">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/furniture" className="hover:text-white transition-colors">
                Furniture
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Shop by Room</span>
              <span>/</span>
              <span className="text-white font-semibold">{room.name}</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white mb-4 flex justify-center"
            >
              {room.icon}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="inline-block text-sm font-bold uppercase tracking-widest text-red-400 mb-4"
            >
              Shop by Room
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
            >
              {room.name}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed"
            >
              {room.description}
            </motion.p>
          </div>
        </section>

        {/* Room Info Section */}
        <section
          ref={infoRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-white border-b-2 border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About This Space</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {room.longDescription}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
              >
                Get Expert Advice
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Right: Key Considerations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6">Key Considerations</h3>
              <div className="space-y-4">
                {room.keyConsiderations.map((consideration, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-red-700 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{consideration}</p>
                  </div>
                ))}
              </div>

              {/* Recommended Categories */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Recommended Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {room.recommendedCategories.map((category, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content: Filters + Products */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12 bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white border-2 border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold uppercase tracking-wider">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-red-700 hover:text-red-900 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Category
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categoryFilters.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-8" />

                {/* Features Filter */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Features
                  </h4>
                  <div className="space-y-2">
                    {featureFilters.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t-2 border-gray-200">
                  <Link
                    to="/contact"
                    className="w-full px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Need Help?
                  </Link>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main ref={productsRef} className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                {/* Results Count */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Furniture for {room.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {startIndex + 1}-{Math.min(endIndex, totalProducts)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">{totalProducts}</span>{" "}
                    products
                  </p>
                </div>

                {/* Sort & View */}
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-700 transition-colors"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                  </select>

                  {/* View Toggle */}
                  <div className="hidden md:flex items-center gap-2 bg-white border-2 border-gray-200 rounded p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-red-700 text-white"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-red-700 text-white"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {currentProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isInView={isProductsInView}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 border-gray-200 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 border-2 font-semibold transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-r from-red-900 to-red-700 text-white border-red-700"
                          : "border-gray-200 hover:border-red-700 hover:text-red-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 border-gray-200 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </main>
          </div>
        </section>

        {/* Other Rooms CTA */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-gradient-to-br from-gray-900 via-red-950 to-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Other Room Types
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Browse furniture curated for different workspace zones or view our complete
              catalog to find exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/furniture"
                className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
              >
                View All Rooms
              </Link>
              <Link
                to="/furniture/all"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RoomTypePage;