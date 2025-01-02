import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import ServicesSection from "./components/Services";
import TestimonialsSection from "./components/Testimonials";
import CTASection from "./components/CTA";
import Footer from "./components/Footer";
import { useEffect } from "react";
import AboutUs from "./components/AboutUs";
import ClientsPage from "./components/Clients";
import ProjectsPage from "./components/ProjectsPage";
import BlogPage from "./components/BlogPage";
import BlogPost from "./components/BlogPost";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

function App() {
  useEffect(() => {
    document.title =
      "Mahalaxmi Art | Interior Decorator & Furniture Contractor";
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-[calc(5rem+0rem)] md:pt-[calc(5rem+2rem)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<CTASection />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
