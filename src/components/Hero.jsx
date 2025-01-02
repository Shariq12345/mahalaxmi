import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    image: "/modern_bedroom.jpg",
    title: "Modern Living Spaces",
    subtitle: "Where Comfort Meets Style",
  },
  {
    image: "/modern_bookshelf.jpg",
    title: "Luxurious Interiors",
    subtitle: "Crafted with Precision",
  },
  {
    image: "/modern_sofa.jpg",
    title: "Timeless Design",
    subtitle: "Creating Lasting Impressions",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // Tracks slide direction

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setDirection(1); // Moving right
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1); // Moving left
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <section className="min-h-[80vh] relative overflow-hidden" {...handlers}>
      {/* Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            initial={{
              x: direction > 0 ? "100%" : "-100%", // Start off-screen
            }}
            animate={{ x: 0 }} // Slide into view
            exit={{
              x: direction > 0 ? "-100%" : "100%", // Slide out of view
            }}
            transition={{
              duration: 1.5,
              ease: [0.33, 1, 0.68, 1], // Smooth easing
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              willChange: "transform",
            }}
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Title */}
      <div className="absolute bottom-8 left-8 z-20">
        <h1 className="text-white font-light text-2xl md:text-4xl lg:text-5xl leading-tight">
          Transforming Spaces, <br /> Enriching Lives
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-4 flex items-center z-20">
        <button
          onClick={prevSlide}
          className="bg-black/50 p-2 rounded-full hover:bg-black/70"
        >
          <ArrowRight className="w-6 h-6 text-white rotate-180" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-20">
        <button
          onClick={nextSlide}
          className="bg-black/50 p-2 rounded-full hover:bg-black/70"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
