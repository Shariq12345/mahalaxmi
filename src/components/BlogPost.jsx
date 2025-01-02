import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, User, Calendar, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const BlogPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost/mahalaxmi/app/backend/api/blog-post.php?slug=${slug}`
                );
                const data = await response.json();
                if (data.success) {
                    setPost(data.data);
                    // Set page title
                    document.title = `${data.data.title} - Mahalaxmi Art Blog`;
                } else {
                    navigate("/blog");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
                navigate("/blog");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8B7355]"></div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="bg-white">
            {/* Hero Section with Featured Image */}
            <section className="relative h-[60vh] min-h-[400px] bg-[#4A4238]">
                <div className="absolute inset-0">
                    <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col justify-end pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-[#E8E2DC] hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-light mb-6">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-[#E8E2DC]">
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.read_time} min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(post.published_at).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto px-4"
                >
                    {/* Excerpt */}
                    <div className="mb-12">
                        <p className="text-xl text-[#4A4238] leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-[#4A4238] prose-p:text-[#6B5D4D] prose-a:text-[#8B7355] hover:prose-a:text-[#6B5D4D]"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-[#4A4238] mb-4">
                            Share this article
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    post.title
                                )}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-[#8B7355] text-white hover:bg-[#6B5D4D] transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                                    window.location.href
                                )}&title=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-[#8B7355] text-white hover:bg-[#6B5D4D] transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default BlogPost; 