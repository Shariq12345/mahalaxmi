"use client";
import React from "react";
import { motion } from "framer-motion";
import { PaintBucket, Settings, Factory, Sofa, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: <PaintBucket className="w-6 h-6" />,
    title: "Interior Decoration",
    description:
      "Transform your space with our expert interior decoration services",
    features: [
      "Color consultation",
      "Space planning",
      "Material selection",
      "Lighting design",
    ],
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Maintenance",
    description: "Comprehensive maintenance solutions for your interior spaces",
    features: [
      "Regular inspections",
      "Furniture care",
      "Paint touch-ups",
      "Hardware maintenance",
    ],
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: "Manufacturing",
    description: "Custom manufacturing solutions for unique interior elements",
    features: [
      "Custom millwork",
      "Built-in units",
      "Architectural elements",
      "Specialty finishes",
    ],
  },
  {
    icon: <Sofa className="w-8 h-8" />,
    title: "Furniture Designing",
    description: "Bespoke furniture design tailored to your style and space",
    features: [
      "Custom furniture",
      "Upholstery design",
      "Material sourcing",
      "Prototype development",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-20 bg-[#F5F1ED]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#4A4238] mb-3">
            Our <span className="font-semibold text-[#8B7355]">Services</span>
          </h2>
          <p className="text-[#6B5D4D] text-base md:text-lg max-w-xl mx-auto">
            Comprehensive interior solutions tailored to your unique vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="group bg-white h-full p-6 rounded-lg hover:shadow-md transition-all duration-300 border border-[#E8E2DC]">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#F5F1ED] rounded-lg group-hover:bg-[#8B7355] transition-colors duration-300">
                    <div className="text-[#8B7355] group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  {/* <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#F5F1ED] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowRight className="w-3 h-3 text-[#8B7355]" />
                  </motion.div> */}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#4A4238] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#6B5D4D] text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <div className="w-1 h-1 rounded-full bg-[#8B7355] mr-2" />
                        <span className="text-[#6B5D4D]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <Button
                  className="mt-6 w-full bg-transparent hover:bg-[#8B7355] text-[#8B7355] hover:text-white border border-[#8B7355] rounded-md text-sm py-2"
                  variant="outline"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
