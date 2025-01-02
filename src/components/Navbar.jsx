"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Mail, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Scroll to the top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the pathname changes

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
                  className="absolute -inset-2 rounded-lg  -z-10"
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative group py-2"
                >
                  <span
                    className={`text-[#4A4238] group-hover:text-[#8B7355] transition-colors ${pathname === link.href ? "text-[#8B7355]" : ""}`}
                  >
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B7355]"
                      layoutId="navbar-underline"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#4A4238] hover:bg-[#F5F1ED] rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 lg:hidden"
                onClick={() => setIsOpen(false)}
                style={{ zIndex: 40 }}
              />

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 lg:hidden bg-white border-b border-[#E8E2DC]/50 shadow-lg"
                style={{ zIndex: 41 }}
              >
                <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
                  <div className="flex flex-col p-4 space-y-2">
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={link.href}
                          className={`block px-4 py-3 rounded-lg transition-all ${pathname === link.href
                            ? "bg-[#8B7355] text-white"
                            : "text-[#4A4238] hover:bg-[#F5F1ED]"
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
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
