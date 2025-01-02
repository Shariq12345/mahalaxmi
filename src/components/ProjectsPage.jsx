import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSlider, setShowSlider] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "all",
    "residential",
    "commercial",
    "interior",
    "exterior",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost/mahalaxmi/app/backend/api/projects.php"
        );
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      selectedCategory === "all" ||
      project.category?.toLowerCase() === selectedCategory
    );
  });

  const openSlider = (project, index = 0) => {
    setCurrentProject(project);
    setCurrentImageIndex(index);
    setShowSlider(true);
  };

  const closeSlider = () => {
    setShowSlider(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (currentProject?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (currentProject?.images?.length > 1) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + currentProject.images.length) %
          currentProject.images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-[#4A4238] py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <img
            src="/modern_bookshelf.jpg"
            alt="Projects Hero"
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
              Our <span className="font-semibold">Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Explore our portfolio of exceptional interior designs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600"
            >
              <Filter size={20} />
              <span>Filter Projects</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Filter buttons */}
          <div
            className={cn(
              "flex flex-wrap gap-2",
              showFilters ? "block" : "hidden md:flex"
            )}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-[#8B7355] text-white shadow-lg"
                    : "bg-white text-[#4A4238] hover:bg-[#8B7355] hover:text-white"
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openSlider(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm bg-[#8B7355] px-3 py-1 rounded-full">
                      {project.category || "Uncategorized"}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#4A4238] mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-[#6B5D4D] line-clamp-2">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#6B5D4D] text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Image Slider Modal */}
      <AnimatePresence>
        {showSlider && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeSlider}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={closeSlider}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>
            <div className="relative max-w-6xl max-h-[80vh] mx-4">
              <img
                src={currentProject.images[currentImageIndex]}
                alt={currentProject.title}
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {currentProject.description}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Image {currentImageIndex + 1} of{" "}
                  {currentProject.images.length}
                </p>
              </div>
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
