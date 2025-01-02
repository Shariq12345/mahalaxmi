import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#4A4238]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-white">
                Ready to Transform
                <span className="block font-semibold mt-2 text-[#D4C8BE]">
                  Your Space?
                </span>
              </h2>
              <p className="text-lg text-[#E8E2DC]/90 max-w-xl">
                Let's discuss your project and bring your vision to life. Our
                team of experts is here to help you create the perfect space.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Phone */}
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#8B7355] rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#D4C8BE] font-medium mb-2">Call Us</p>
                  <a
                    href="tel:+919820579280"
                    className="text-white text-lg hover:text-[#D4C8BE] transition-colors flex items-center gap-2 group"
                  >
                    +91 98205 79280
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#8B7355] rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#D4C8BE] font-medium mb-2">Email Us</p>
                  <a
                    href="mailto:info@mahalaxmiart.in"
                    className="text-white text-lg hover:text-[#D4C8BE] transition-colors flex items-center gap-2 group"
                  >
                    info@mahalaxmiart.in
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#8B7355] rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#D4C8BE] font-medium mb-2">Visit Us</p>
                  <p className="text-white text-lg">
                    Dharavi - Mumbai,
                    <br />
                    Maharashtra - 400017
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#8B7355] rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#D4C8BE] font-medium mb-2">Working Hours</p>
                  <p className="text-white text-lg">
                    Mon - Sat
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
