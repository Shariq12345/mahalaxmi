import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "http://localhost/mahalaxmi/app/backend/api/clients.php"
        );
        const data = await response.json();
        if (data.success) {
          setClients(data.data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(clients.map((client) => client.category).filter(Boolean)),
  ];

  // Filter clients by category
  const filteredClients =
    selectedCategory === "all"
      ? clients
      : clients.filter((client) => client.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#4A4238] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <img
            src="/client-hero.jpg" // Add your image
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
              Our <span className="font-semibold">Clients</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Our clients are our partners in creating exceptional spaces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[#8B7355] text-white"
                    : "bg-white text-[#4A4238] hover:bg-[#8B7355] hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Logo Container */}
                  <div className="relative h-32 mb-6 flex items-center justify-center">
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {client.name}
                        </h3>
                        {client.category && (
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                            {client.category}
                          </span>
                        )}
                      </div>
                      {client.website_url && (
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {client.description && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {client.description}
                      </p>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  {client.website_url && (
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center">
                      <a
                        href={client.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Visit Website <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">
                No clients found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Clients;
