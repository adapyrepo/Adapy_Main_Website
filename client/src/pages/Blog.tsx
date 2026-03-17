import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Adaptive Mobility: Integration Over Innovation",
    excerpt: "Discover how unified control systems are transforming the adaptive mobility landscape.",
    date: "March 15, 2026",
    author: "Sarah Johnson",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Safety First: Proactive Monitoring in Fleet Operations",
    excerpt: "Learn how real-time environmental sensors are preventing incidents before they happen.",
    date: "March 10, 2026",
    author: "Michael Chen",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Case Study: How ATC Mobility Reduced Support Costs by 40%",
    excerpt: "Explore the implementation journey and measurable results of unified control systems.",
    date: "March 5, 2026",
    author: "James Wilson",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Connected Vehicles: Data Privacy and Security Best Practices",
    excerpt: "Understanding how Adapy protects user data while enabling powerful fleet insights.",
    date: "February 28, 2026",
    author: "Emily Rodriguez",
    category: "Security",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "NEMT Operations: Compliance Made Simple",
    excerpt: "Automate compliance reporting and reduce administrative burden with cloud intelligence.",
    date: "February 20, 2026",
    author: "David Park",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "User Spotlight: Transforming Independence Through Technology",
    excerpt: "Meet the people behind Adapy and hear how unified control changed their lives.",
    date: "February 12, 2026",
    author: "Lisa Thompson",
    category: "Community",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
];

const categories = ["All", "Industry Insights", "Technology", "Case Study", "Security", "Operations", "Community"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black to-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Insights & Stories
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Discover the latest updates, case studies, and industry insights from the Adapy team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white sticky top-16 z-40 border-b border-black/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  category === "All"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black hover:bg-black/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col rounded-[2rem] overflow-hidden border border-black/10 hover:border-[#0071e3] hover:shadow-lg transition-all duration-300 bg-white hover:bg-black/[0.02]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#0071e3] text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-black group-hover:text-[#0071e3] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-black/60 mb-6 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-black/50 mb-6 border-t border-black/5 pt-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-[#0071e3] font-semibold group/btn hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-white/60 mb-8">
            Subscribe to get the latest insights, product updates, and industry news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
            <button className="px-8 py-3 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
