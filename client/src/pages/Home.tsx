import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Activity, ShieldCheck } from "lucide-react";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProduct = products?.find(p => p.isFeatured) || products?.[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="video-background-container bg-black">
            <iframe
              className="video-background-iframe"
              src="https://www.youtube.com/embed/IRsWYQFkg-8?autoplay=1&mute=1&controls=0&loop=1&playlist=IRsWYQFkg-8&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>
          {/* Dark Overlay/Wash */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-20" />
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
              Smart Mobility for the <span className="text-white/60">Modern Age.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed mb-10 text-balance">
              Control your adaptive vehicle equipment with a single tap. 
              The future of accessibility is seamless, connected, and effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
                  Get Started
                </button>
              </Link>
              <Link href="/products">
                <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2 group">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section: The Ecosystem */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Adapy Ecosystem</h2>
            <p className="text-xl text-muted-foreground">Everything connected. Everything in sync.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Smartphone className="w-8 h-8" />,
                title: "One App Control", 
                desc: "Replace multiple remotes with a single, intuitive interface on your smartphone." 
              },
              { 
                icon: <Activity className="w-8 h-8" />,
                title: "Real-time Monitoring", 
                desc: "Live status updates and predictive maintenance alerts for your equipment." 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Pathways™ Compliance", 
                desc: "Automated reporting for VA, Medicaid, and funding agencies." 
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-background p-8 rounded-3xl border border-border/50 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Spotlight */}
      {featuredProduct && (
        <section className="py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="lg:w-1/2 relative order-2 lg:order-1">
                 {/* Unsplash abstract tech image */}
                 {/* minimalist black abstract geometric shape 3d render */}
                 <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 aspect-square">
                   <img 
                     src={featuredProduct.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"} 
                     alt={featuredProduct.name}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                 </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Featured Product
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  {featuredProduct.name}
                </h2>
                <p className="text-2xl font-medium text-foreground/80 mb-6">
                  {featuredProduct.tagline}
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {featuredProduct.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {(featuredProduct.features as string[] || []).slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/products`}>
                  <button className="text-lg font-semibold border-b-2 border-primary pb-1 hover:text-primary/70 hover:border-primary/70 transition-colors">
                    View Full Specs
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Ready to upgrade your mobility?
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Join thousands of users who have regained independence with Adapy's smart ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all shadow-lg hover:scale-105 active:scale-95">
                Contact Sales
              </button>
            </Link>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                Download App
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
