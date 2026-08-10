import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/hooks/use-products";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import smartHubDiagram from "@assets/diagram_adapy_1785260728077.png";
import mobileAppPhoto from "@assets/Screenshot_2026-08-10_at_1.03.55_PM_1786388640836.png";
import mobilityOpticsDashboard from "@assets/MO_1786389215717.png";

const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "Adapy Smart Hub": smartHubDiagram,
  "Adapy Mobile App": mobileAppPhoto,
  "Mobility Optics": mobilityOpticsDashboard,
};

export default function Products() {
  useSEO({
    title: "Adapy Products — Smart Hub, App, Dashboard & Safety Modules",
    description: "Explore the Adapy product line: Smart Hub, mobile app, dealer dashboard, wireless controllers, and safety modules for wheelchair accessible vehicles and NEMT fleets.",
    path: "/products",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    keywords: "adaptive mobility products, wheelchair vehicle hardware, mobility software, wheelchair lift controller, NEMT safety hardware, adaptive vehicle accessories",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Adapy Products",
      url: "https://adapy.com/products",
      description: "Hardware and software products that power the Adapy connected adaptive mobility platform.",
      isPartOf: { "@type": "WebSite", name: "Adapy", url: "https://adapy.com" },
    },
  });
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="pt-32 pb-16 md:pt-48 md:pb-32 bg-secondary/30">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Hardware meets <br className="hidden md:block"/> Intelligence.
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our suite of connected devices work together seamlessly to provide a unified, automated experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid gap-32">
          {products?.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary shadow-2xl shadow-black/5 group">
                  {/* black and white smart home device minimalistic */}
                  <img 
                    src={product.imageUrl || PRODUCT_FALLBACK_IMAGES[product.name] || `https://images.unsplash.com/photo-1558002038-109177381792?auto=format&fit=crop&q=80&w=1000`} 
                    alt={`${product.name} — Adapy adaptive mobility product`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h2>
                  <p className="text-xl font-medium text-muted-foreground">{product.tagline}</p>
                </div>
                
                <p className="text-lg leading-relaxed text-muted-foreground/90">
                  {product.description}
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(product.features as string[])?.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                   <Link href="/contact">
                     <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
                       Inquire about {product.name}
                       <ArrowRight className="w-4 h-4" />
                     </button>
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
