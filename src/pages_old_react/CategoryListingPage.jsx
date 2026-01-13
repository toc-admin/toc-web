import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";
import chairImg from "../assets/typeImages/chairs-page.jpeg";
import accImg from "../assets/typeImages/accessories.png";
import storageImg from "../assets/typeImages/storage.png";
import deskImg from "../assets/typeImages/desk.jpeg";
import loungeImg from "../assets/typeImages/lounge-hub.jpeg";
import acousticImg from "../assets/typeImages/acoustic-hub.jpeg";

// Category data structure (in real app, fetch from Strapi based on slug)
const categoryData = {
  chairs: {
    name: "Chairs",
    description: "Complete seating solutions for every workspace need",
    heroImage: chairImg,
    subcategories: [
      { name: "Office Chairs", slug: "office-chairs" },
      { name: "Conference Chairs", slug: "conference-chairs" },
      { name: "Auditorium Chairs", slug: "auditorium-chairs" },
      { name: "Lounge Chairs", slug: "lounge-chairs" },
      { name: "Stools", slug: "stools" },
    ],
  },
  desksTables: {
    name: "Desks & Tables",
    description: "From executive desks to collaborative workstations",
    heroImage: deskImg,
    subcategories: [
      { name: "Office Desks", slug: "office-desks" },
      { name: "Conference Tables", slug: "conference-tables" },
      { name: "Meeting Tables", slug: "meeting-tables" },
      { name: "Lounge Tables", slug: "lounge-tables" },
    ],
  },
  storageSolutions: {
    name: "Storage Solutions",
    description: "Organize your workspace with style and efficiency",
    heroImage: storageImg,
    subcategories: [
      { name: "Office Drawers & Pedestals", slug: "drawers-pedestals" },
      { name: "Office Cabinets", slug: "cabinets" },
      { name: "Bookshelves", slug: "bookshelves" },
    ],
  },
  acousticSolutions: {
    name: "Acoustic Solutions",
    description: "Create privacy and reduce noise in open offices",
    heroImage: acousticImg,
    subcategories: [
      { name: "Desk Dividers", slug: "desk-dividers" },
      { name: "Wall Acoustic Panels", slug: "wall-panels" },
      { name: "Ceiling Acoustic Panels", slug: "ceiling-panels" },
      { name: "Phone Booths", slug: "phone-booths" },
    ],
  },
  accessoriesLighting: {
    name: "Accessories & Lighting",
    description: "Complete your space with perfect lighting and details",
    heroImage: accImg,
    subcategories: [
      { name: "Table Lamps", slug: "table-lamps" },
      { name: "Floor Lamps", slug: "floor-lamps" },
      { name: "Ceiling Lamps", slug: "ceiling-lamps" },
      { name: "Carpets", slug: "carpets" },
      { name: "Active Components", slug: "active-components" },
      { name: "Reception Furniture", slug: "reception-furniture" },
    ],
  },
  lounge: {
    name: "Lounge",
    description: "Comfortable and stylish spaces for collaboration",
    heroImage: loungeImg,
    subcategories: [
      { name: "Sofas & Armchairs", slug: "sofas-armchairs" },
      { name: "Soft Seating", slug: "soft-seating" },
      { name: "Poufs & Ottomans", slug: "poufs-ottomans" },
      { name: "Modular Systems", slug: "modular-systems" },
    ],
  },
};

// Room types for filtering
const roomTypes = [
  "Reception Area",
  "Private Office",
  "Meeting Rooms",
  "Lounge Area",
  "Outdoor",
];

// Feature filters
const featureFilters = [
  "Ergonomic",
  "Height Adjustable",
  "Stackable",
  "Wheels",
  "Armrests",
  "Lumbar Support",
];

// Mock products (replace with Strapi data)
const mockProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  slug: `product-${i + 1}`,
  brand: ["Haworth", "BoConcept", "Boss Design", "Brunner"][i % 4],
  category: "Office Chairs",
  image: `/assets/products/product-${(i % 8) + 1}.jpg`,
  isNew: i < 3,
  isFeatured: i < 5,
  features: ["Ergonomic", "Adjustable", "Lumbar Support"],
}));

const CategoryListingPage = () => {
  const { categorySlug } = useParams();
  const category = categoryData[categorySlug] || categoryData.chairs;

  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.1 });

  // Filter states
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter logic (in real app, this would filter actual data)
  const filteredProducts = mockProducts; // Replace with actual filtering
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle filter changes
  const toggleSubcategory = (slug) => {
    setSelectedSubcategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setCurrentPage(1);
  };

  const toggleRoom = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
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
    setSelectedSubcategories([]);
    setSelectedRooms([]);
    setSelectedFeatures([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedSubcategories.length > 0 ||
    selectedRooms.length > 0 ||
    selectedFeatures.length > 0;

  return (
    <>
      <Helmet>
        <title>{category.name} | Premium Office Furniture | The Office Company</title>
        <meta
          name="description"
          content={`${category.description}. Browse our selection of premium ${category.name.toLowerCase()} from world-class brands.`}
        />
      </Helmet>

      <div className="w-full">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[85vh] min-h-[400px] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 text-white overflow-hidden"
        >
          {/* Background Image */}
          <div
            style={{
              backgroundImage: `url(${category.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

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
              <span className="text-white font-semibold">{category.name}</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-sm font-bold uppercase tracking-widest text-red-400 mb-4"
            >
              Browse Category
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
            >
              {category.name}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed"
            >
              {category.description}
            </motion.p>
          </div>
        </section>

        {/* Subcategory Pills */}
        <section className="bg-white border-b-2 border-gray-100 py-6 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              Filter:
            </span>
            <button
              onClick={clearAllFilters}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                !hasActiveFilters
                  ? "bg-gradient-to-r from-red-900 to-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => toggleSubcategory(sub.slug)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedSubcategories.includes(sub.slug)
                    ? "bg-gradient-to-r from-red-900 to-red-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </section>

        {/* Main Content: Filters + Products */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12 bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white border-2 border-gray-200 p-6 sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold uppercase tracking-wider">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-red-700 hover:text-red-900 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Room Type Filter */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Room Type
                  </h4>
                  <div className="space-y-2">
                    {roomTypes.map((room) => (
                      <label
                        key={room}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRooms.includes(room)}
                          onChange={() => toggleRoom(room)}
                          className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                          {room}
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
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {startIndex + 1}-{Math.min(endIndex, totalProducts)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-900">{totalProducts}</span>{" "}
                  products
                </p>

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
                      aria-label="Grid view"
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
                      aria-label="List view"
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

        {/* Related Categories CTA */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-gradient-to-br from-gray-900 via-red-950 to-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore More Categories
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Can't find what you're looking for? Browse our other furniture categories
              or contact our experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/furniture"
                className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
              >
                View All Categories
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                Contact Experts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryListingPage;