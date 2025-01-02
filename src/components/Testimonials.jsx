import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Anushka Shivdasani Rovshen",
    position: "Director/Producer at Running Cow Films",
    image: "/testimonials/review_2.jpg",
    rating: 5,
    text: "Superb eye for details, craftsmanship and finish!!.",
  },
  {
    id: 2,
    name: "Vrinda Choraria Deorah",
    position: "-",
    image: "/testimonials/review_1.jpg",
    rating: 5,
    text: "Mahalaxmi art has great work.ethics. highly professional as well as skilled workers on the job! the proprietor Alok has a good understanding of the work to be carried out along with own innovative suggestions and unique ideas! Great pleasure working with you and you highly skilled team",
  },
  // {
  //   id: 3,
  //   name: "Amit Patel",
  //   position: "Property Developer",
  //   image: "/testimonials/client3.jpg",
  //   rating: 5,
  //   text: "Exceptional craftsmanship and professional service. They delivered on time and the results were outstanding. A truly reliable partner.",
  // },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#4A4238] mb-3">
            Client <span className="font-semibold text-[#8B7355]">Reviews</span>
          </h2>
          <p className="text-[#6B5D4D] text-base md:text-lg max-w-xl mx-auto">
            What our valued clients say about our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="bg-white p-6 md:p-8 rounded-lg border border-[#E8E2DC] hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute -top-4 right-8">
                  <div className="bg-[#8B7355] p-2 rounded-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#8B7355] text-[#8B7355]"
                    />
                  ))}
                </div>

                {/* Content wrapper with flex-grow */}
                <div className="flex-grow flex flex-col">
                  {/* Testimonial Text */}
                  <p className="text-[#6B5D4D] mb-6 italic flex-grow">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info - Always at bottom */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#E8E2DC]">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/48";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4A4238]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-[#6B5D4D]">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <h3 className="text-3xl font-semibold text-[#8B7355] mb-2">500+</h3>
            <p className="text-[#6B5D4D]">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-[#8B7355] mb-2">98%</h3>
            <p className="text-[#6B5D4D]">Client Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-[#8B7355] mb-2">15+</h3>
            <p className="text-[#6B5D4D]">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-[#8B7355] mb-2">50+</h3>
            <p className="text-[#6B5D4D]">Expert Team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
