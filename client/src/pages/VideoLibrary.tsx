import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const videos = [
  {
    title: "Smart Mobility",
    description:
      "See how the Adapy Smart Mobility Platform connects, controls, and monitors adaptive equipment.",
    href: "/smart_mobility",
  },
  {
    title: "Technology Overview",
    description:
      "A guided playlist walking through the Adapy hardware, software, and connectivity.",
    href: "/technology-overview",
  },
  {
    title: "Safety Benefits",
    description:
      "How Adapy's monitoring and safety modules protect drivers, caregivers, and equipment.",
    href: "/safety-benefits",
  },
  {
    title: "See It In Action",
    description:
      "Watch the Adapy platform working in real vehicles with real adaptive equipment.",
    href: "/see-it",
  },
];

export default function VideoLibrary() {
  useSEO({
    title: "Video Library — Adapy",
    description:
      "Watch Adapy videos covering smart mobility, technology overviews, safety benefits, and real-world demonstrations.",
    path: "/videos",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Video Library", path: "/videos" },
    ],
    keywords:
      "Adapy videos, adaptive mobility videos, wheelchair vehicle technology, smart mobility demo",
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid="page-video-library">
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40 container mx-auto px-6 max-w-5xl">
        <header className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
            Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Video Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the Adapy platform through short videos — from technology
            overviews to real-world demonstrations.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={video.href}
                className="group block p-8 rounded-3xl border border-black/10 bg-white hover:border-[#0071e3]/40 hover:shadow-xl transition-all h-full"
                data-testid={`card-video-${video.href.replace(/[/_]/g, "-").replace(/^-/, "")}`}
              >
                <PlayCircle className="w-10 h-10 text-[#0071e3] mb-5" />
                <h2 className="text-xl font-bold mb-2">{video.title}</h2>
                <p className="text-black/60 mb-5">{video.description}</p>
                <span className="inline-flex items-center gap-2 text-[#0071e3] font-medium">
                  Watch now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
