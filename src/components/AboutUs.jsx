import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Users, History, Target, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const AboutUs = () => {
  const navigate = useNavigate();
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Expert Team" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const values = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Quality",
      description:
        "We maintain the highest standards in materials and craftsmanship to deliver exceptional results.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client-Centric",
      description:
        "Your vision and satisfaction are our top priorities. We work closely with you at every step.",
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Timely Delivery",
      description:
        "We understand the value of time and ensure projects are completed within agreed timelines.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation",
      description:
        "We stay ahead with latest design trends and innovative solutions for modern spaces.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#4A4238] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <img
            src="/about-hero.jpg" // Add your image
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              About <span className="font-semibold">Mahalaxmi Art</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Crafting exceptional interior experiences since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/about-work.jpg" // Add your image
                alt="Our Work"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#4A4238]">
                Transforming Spaces with{" "}
                <span className="font-semibold text-[#8B7355]">
                  Artistic Excellence
                </span>
              </h2>
              <p className="text-[#6B5D4D] leading-relaxed">
                Mahalaxmi Art has been at the forefront of interior design and
                execution for over 15 years. We blend traditional craftsmanship
                with modern innovation to create spaces that inspire and endure.
              </p>
              <p className="text-[#6B5D4D] leading-relaxed">
                Our team of skilled artisans, designers, and project managers
                works collaboratively to bring your vision to life. We take
                pride in our attention to detail and commitment to excellence.
              </p>
              <Button
                onClick={() => navigate("/projects")}
                className="bg-[#8B7355] hover:bg-[#6B5D4D] text-white"
              >
                View Our Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F5F1ED] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-semibold text-[#8B7355] mb-2">
                  {stat.number}
                </h3>
                <p className="text-[#6B5D4D]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4238] mb-4">
              Our <span className="font-semibold text-[#8B7355]">Values</span>
            </h2>
            <p className="text-[#6B5D4D] max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver
              exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-[#E8E2DC] hover:shadow-md transition-all"
              >
                <div className="bg-[#F5F1ED] p-3 rounded-lg inline-block mb-4">
                  <div className="text-[#8B7355]">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-[#4A4238] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#6B5D4D] text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-16 md:py-24 bg-[#F5F1ED]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4238] mb-4">
              Meet Our{" "}
              <span className="font-semibold text-[#8B7355]">Director</span>
            </h2>
            <p className="text-[#6B5D4D] max-w-2xl mx-auto">
              Leading with vision and expertise to create exceptional spaces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] lg:aspect-[4/5]">
                <img
                  src="/director.jpg" // Add your director's image
                  alt="Director Name"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-white/70" />
                  <p className="text-white/70 text-sm uppercase tracking-wider">
                    Since 2008
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#4A4238] mb-2">
                    Alok Vishwakarma
                  </h3>
                  <p className="text-[#8B7355] text-lg mb-6">
                    Managing Director of Mahalaxmi Art
                  </p>
                </div>

                <div className="space-y-4 text-[#6B5D4D] leading-relaxed">
                  <p>
                    With over 20 years of experience in interior design and
                    architecture, Alok has been the driving force behind
                    Mahalaxmi Art's innovative approach to creating exceptional
                    spaces.
                  </p>
                  <p>
                    His unique vision combines traditional craftsmanship with
                    modern design principles, resulting in spaces that are both
                    timeless and contemporary.
                  </p>
                  <blockquote className="border-l-4 border-[#8B7355] pl-6 my-8 italic text-[#4A4238]">
                    "Our goal is to create spaces that not only look beautiful
                    but also enhance the way people live and work. Every project
                    is an opportunity to tell a unique story through design."
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
