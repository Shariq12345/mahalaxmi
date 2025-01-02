import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost/mahalaxmi/app/backend/api/blog.php"
        );
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8B7355]"></div>
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
            src="/blog-hero.jpg"
            alt="Blog"
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
              Our <span className="font-semibold">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Insights, Ideas, and Inspiration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8B7355]" />
                      <span>{post.read_time} min read</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#8B7355]" />
                        <span>{post.author}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-[#8B7355] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#8B7355] font-medium hover:text-[#6B5D4D] transition-colors group-hover:gap-3"
                  >
                    <span className="border-b border-current">
                      Read Article
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
