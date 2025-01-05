"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Mail, Phone, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/projects",
    label: "Projects",
    subLinks: [
      { href: "/projects/residential", label: "Residential" },
      { href: "/projects/commercial", label: "Commercial" },
      { href: "/projects/retail", label: "Retail" },
    ],
  },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmenuClick = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const toggleSection = (label) => {
    setActiveSection(activeSection === label ? null : label);
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".submenu-container")) {
        setOpenSubmenuIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="hidden md:block bg-gradient-to-r from-[#4A4238] to-[#8B7355] text-white py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">
          <p className="hidden sm:block opacity-90">
            Transforming spaces into timeless experiences
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@mahalaxmiart.in"
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            >
              <Mail size={14} />
              <span>info@mahalaxmiart.in</span>
            </a>
            <a
              href="tel:+919820579280"
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            >
              <Phone size={14} />
              <span>+919820579280</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-md border-b border-[#E8E2DC]/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/maha-logo.png"
                  alt="Logo"
                  className="h-12 w-9 transition-transform duration-300 group-hover:scale-105"
                />
                <motion.div
                  className="absolute -inset-2 rounded-lg -z-10"
                  layoutId="logo-bg"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-[#4A4238] to-[#8B7355] bg-clip-text text-transparent">
                Mahalaxmi Art
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <div key={link.href} className="relative submenu-container">
                  {link.subLinks ? (
                    <>
                      <button
                        className="relative group py-2 flex items-center"
                        onClick={() => handleSubmenuClick(index)}
                      >
                        <span
                          className={`text-[#4A4238] group-hover:text-[#8B7355] transition-colors ${
                            pathname === link.href ? "text-[#8B7355]" : ""
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`ml-2 text-[#4A4238] group-hover:text-[#8B7355] transition-transform ${
                            openSubmenuIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openSubmenuIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 bg-white shadow-lg rounded-md border border-[#E8E2DC]/50 min-w-[160px] z-10"
                          >
                            <div className="flex flex-col py-1">
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.href}
                                  to={subLink.href}
                                  className="px-4 py-2 text-sm hover:bg-[#F5F1ED] text-[#4A4238]"
                                  onClick={() => setOpenSubmenuIndex(null)}
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-[#4A4238] hover:text-[#8B7355] transition-colors ${
                        pathname === link.href ? "text-[#8B7355]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#4A4238] hover:bg-[#F5F1ED] rounded-full transition-all duration-300 border border-[#E8E2DC]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setIsOpen(false)}
                style={{ zIndex: 40 }}
              />

              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm lg:hidden bg-white shadow-2xl"
                style={{ zIndex: 41 }}
              >
                <div className="flex flex-col">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-[#E8E2DC]">
                    <Link
                      to="/"
                      className="flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src="/maha-logo.png"
                        alt="Logo"
                        className="h-10 w-8"
                      />
                      <span className="text-lg font-semibold bg-gradient-to-r from-[#4A4238] to-[#8B7355] bg-clip-text text-transparent">
                        Mahalaxmi Art
                      </span>
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 overflow-y-auto bg-white">
                    <div className="p-4">
                      {navLinks.map((link) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-2"
                        >
                          {link.subLinks ? (
                            <div className="mb-2">
                              <button
                                onClick={() => toggleSection(link.label)}
                                className="w-full flex items-center justify-between p-4 rounded-lg bg-[] text-[#4A4238] hover:bg-[#E8E2DC] transition-all duration-300"
                              >
                                <span className="font-medium">
                                  {link.label}
                                </span>
                                <motion.div
                                  animate={{
                                    rotate:
                                      activeSection === link.label ? 90 : 0,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronRight size={20} />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {activeSection === link.label && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-4 mt-2 space-y-1 border-l-2 border-[#8B7355]">
                                      {link.subLinks.map((subLink) => (
                                        <Link
                                          key={subLink.href}
                                          to={subLink.href}
                                          className="block p-3 rounded-lg text-[#4A4238] hover:bg-[#F5F1ED] transition-all duration-300"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {subLink.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              to={link.href}
                              className="block p-4 rounded-lg text-[#4A4238] hover:bg-[#F5F1ED] transition-all duration-300"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="font-medium">{link.label}</span>
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
