import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "./config/routes";
import ScrollToTop from "./config/ScrollToTop";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import MobileMenu from "./components/MobileMenu";
import { AnimatePresence } from "framer-motion";
import FurnitureHubPage from "./pages/FurnitureHubPage";
import CategoryListingPage from "./pages/CategoryListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RoomTypePage from "./pages/RoomTypePage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const lenisRef = useRef(null);

  const closeMobileMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Update scroll position
    lenis.on("scroll", ({ scroll }) => {
      setScrollY(scroll);
    });

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar 
        scrollY={scrollY} 
        isOpen={isOpen} 
        setOpen={setOpen} 
        location={location.pathname} 
      />
      <div className="bg-bright-grey">
        {/* Routes to switch between different pages */}
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.FURNITURE} element={<FurnitureHubPage />} />
          <Route path={ROUTES.CATEGORY_LISTING} element={<CategoryListingPage />} />
          <Route path={ROUTES.ROOM_LISTING} element={<RoomTypePage />} />
          <Route path={ROUTES.PRODUCT_PAGE} element={<ProductDetailPage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetails />} />
          <Route path={ROUTES.SUCCESS} element={<ThankYouPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {isOpen && (
          <AnimatePresence>
            <MobileMenu closeMenu={closeMobileMenu} />
          </AnimatePresence>
        )}

        {/* Always display Footer */}
        <Footer />

        {/* Optional ScrollToTop behavior */}
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;