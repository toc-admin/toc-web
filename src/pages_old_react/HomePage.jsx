import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Services from "../components/Services";
import HowWeDoIt from "../components/HowWeDo";
import BrandsSection from "../components/BrandsSection";
import FurnitureCatalogSection from "../components/FurnitureCatalogSection";
import MarketInsights from "../components/MarketInsights";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>
          The Office Company | Premium Office Solutions & Furniture in Croatia
        </title>
        <meta
          name="description"
          content="Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands like Haworth, BoConcept, and Boss Design."
        />
        <meta
          property="og:title"
          content="The Office Company | Premium Office Solutions & Furniture in Croatia"
        />
        <meta
          property="og:description"
          content="Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands."
        />
        <meta
          property="og:image"
          content="https://www.theofficecompany.eu/og/toc-hero.jpeg"
        />
        <meta property="og:url" content="https://www.theofficecompany.eu" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="w-full">
        {/* Existing Hero Section */}
        <HeroSection id="hero" />

        {/* Existing Services Section */}
        <Services id="services" />

        {/* NEW - Furniture Catalog Section */}
        <FurnitureCatalogSection id="furniture" />

        {/* Existing How We Do It Section */}
        <HowWeDoIt id="process" />

        {/* Existing About Section */}
        <AboutSection id="about" />

        {/* Existing Brands Section */}
        <BrandsSection id="brands" />

        {/* Existing Market Insights / Blog */}
        <MarketInsights id="insights" />

        {/* Existing Contact Section */}
        <Contact id="contact" />
      </div>
    </>
  );
};

export default HomePage;