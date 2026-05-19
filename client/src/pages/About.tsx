import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";

export default function About() {
  useSEO({
    title: "About Adapy — Connected Adaptive Mobility Built for Real Drivers",
    description: "Adapy is on a mission to bring proactive safety and unified control to every wheelchair accessible vehicle and adaptive driver on the road.",
    path: "/about",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    keywords: "about Adapy, adaptive mobility company, wheelchair accessible vehicle technology, mobility technology startup, accessibility innovation",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Adapy",
      url: "https://adapy.com/about",
      mainEntity: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
    },
  });
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      {/* Hero */}
      <div className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Driven by purpose. <br />
            Powered by innovation.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            We are pioneering automation in adaptive mobility to restore independence and dignity to wheelchair users worldwide.
          </p>
        </motion.div>
      </div>

      {/* Founders Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Adapy was founded in 2021 by Aaron Werner and Andrew Evans. The mission was simple but ambitious: create a smart mobility ecosystem that replaces outdated, clunky hardware with sleek, modern technology.
                </p>
                <p>
                  Andrew Evans, an Air Force veteran with a spinal cord injury, understood firsthand the frustrations of existing adaptive equipment. Together with Aaron, they set out to build a platform that doesn't just "work" — it empowers.
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* two men working on laptop minimalist office black and white */}
              <div className="aspect-[3/4] md:aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-xl">
                 <img 
                   src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000"
                   alt="Adapy founders Aaron Werner and Andrew Evans collaborating on adaptive mobility technology"
                   loading="lazy"
                   decoding="async"
                   width="1000"
                   height="1000"
                   className="w-full h-full object-cover grayscale"
                 />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl border border-border shadow-lg max-w-xs">
                <p className="font-bold text-lg">"We believe technology should adapt to you, not the other way around."</p>
                <p className="text-muted-foreground mt-2">— Founders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Mission */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { value: "50+", label: "Adaptive Devices Supported" },
              { value: "75k+", label: "Automation Cycles Logged" },
              { value: "24/7", label: "Real-time Monitoring" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-bold mb-4">{stat.value}</div>
                <div className="text-muted-foreground text-lg uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
