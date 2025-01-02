"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "./ui/dialog";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost/mahalaxmi/app/backend/api/projects.php"
        );
        const data = await response.json();
        if (data.success) {
          // Get only the first 6 projects for featured section
          setProjects(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] bg-gray-200 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-2 mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4238]">
              Our <span className="font-semibold text-[#8B7355]">Projects</span>
            </h2>
            <p className="text-[#6B5D4D] text-lg">
              Transforming spaces across the globe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-[#E8E2DC] mb-1">
                            {project.category}
                          </p>
                          <h3 className="text-xl font-semibold mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[#E8E2DC] line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none">
          <div className="relative w-full h-full">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative rounded-lg overflow-hidden bg-[#4A4238]/95 backdrop-blur-lg">
              <img
                src={selectedProject?.thumbnail_url}
                alt={selectedProject?.title}
                className="w-full max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#E8E2DC] text-sm font-medium">
                  {selectedProject?.category}
                </p>
                <h3 className="text-white text-2xl font-semibold mt-1">
                  {selectedProject?.title}
                </h3>
                <p className="text-[#E8E2DC] text-sm mt-1">
                  {selectedProject?.description}
                </p>
              </div>
            </div>
          </div>
          <DialogTitle className="hidden">Project Image</DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeaturedProjects;
