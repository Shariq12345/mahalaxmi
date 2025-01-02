import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4A4238] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/maha-logo.png"
                alt="Mahalaxmi Art"
                className="h-10 w-8"
              />
              <span className="text-xl font-semibold text-[#D4C8BE]">
                Mahalaxmi Art
              </span>
            </Link>
            <p className="text-[#E8E2DC]/80 text-sm leading-relaxed">
              Transforming spaces into timeless experiences. We specialize in
              creating exceptional interior designs that reflect your unique
              style and personality.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/MahalaxmiArtIndia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#8B7355] hover:bg-[#6B5D4D] rounded-full transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/mahalaxmi_art"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#8B7355] hover:bg-[#6B5D4D] rounded-full transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#8B7355] hover:bg-[#6B5D4D] rounded-full transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#D4C8BE] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {/* <li>
                <Link
                  to="/services"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors"
                >
                  Our Services
                </Link>
              </li> */}
              <li>
                <Link
                  to="/projects"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/architects-designers"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors"
                >
                  Architects & Designers
                </Link>
              </li> */}
              <li>
                <Link
                  to="/contact"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-[#D4C8BE] mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              <li className="text-[#E8E2DC]/80">Privacy Policy</li>
              <li className="text-[#E8E2DC]/80">Terms of Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#D4C8BE] mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <p className="text-[#E8E2DC]/80 text-sm">
                  Dharavi - Mumbai, Maharashtra - 400017
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                <a
                  href="tel:+919820579280"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors text-sm"
                >
                  +91 98205 79280
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                <a
                  href="mailto:info@mahalaxmiart.in"
                  className="text-[#E8E2DC]/80 hover:text-[#D4C8BE] transition-colors text-sm"
                >
                  info@mahalaxmiart.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#8B7355]/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-[#E8E2DC]/60 text-sm text-center">
              © {currentYear} Mahalaxmi Art. All rights reserved.
            </p>
            {/* <div className="flex items-center space-x-6">
              <Link
                to="/privacy-policy"
                className="text-[#E8E2DC]/60 hover:text-[#D4C8BE] text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[#E8E2DC]/60 hover:text-[#D4C8BE] text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
