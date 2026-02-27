import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Cloud, 
  Zap, 
  Shield, 
  BarChart3,
  Layers,
  Thermometer,
  Battery,
  Navigation,
  Lock
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProduct = products?.find((p) => p.isFeatured) || products?.[0];
  const [textIndex, setTextIndex] = useState(0);

  const benefitStatements = [
    "Adaptive Equipment, Finally Unified",
    "Too Many Remotes. Too Much Failure",
    "Adaptive Tech Is Broken. We Fixed It.",
    "Stop Juggling Controls.",
    "Outdated Systems Don’t Belong in Modern Mobility.",
    "Complexity Is the Enemy of Independence.",
    "“Good Enough” Isn’t Good Enough Anymore.",
    "This Is What Adaptive Tech Should Have Been.",
    "We Didn’t Add Another Device. We Replaced the Problem.",
    "Adaptive Equipment Should Work Together—or Not Exist at All.",
    "One System. Zero Excuses.",
    "This Is What Happens When Accessibility Is Taken Seriously.",
    "If It Takes Multiple Remotes, It’s Already Failed.",
    "We Didn’t Simplify Adaptive Tech. We Rebuilt It.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % benefitStatements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [benefitStatements.length]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex flex-col overflow-hidden bg-black">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="video-background-container bg-black">
            <iframe
              className="video-background-iframe scale-110"
              src="https://www.youtube.com/embed/IRsWYQFkg-8?autoplay=1&mute=1&controls=0&loop=1&playlist=IRsWYQFkg-8&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&vq=hd1080"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>
          {/* Enhanced Overlay with Flashlight Effect */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-10" />
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0071e3]/20 blur-[150px] rounded-full opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-30" />
        </div>

        <div className="relative z-40 flex flex-col flex-1">
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 relative">
            <div className="max-w-[1000px] w-full flex flex-col items-center justify-center min-h-[180px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <h1 className="text-[32px] md:text-[54px] lg:text-[72px] font-bold leading-[1.07] tracking-tight text-white mb-4 uppercase">
                  Mobility Should Never Operate in Isolation.
                </h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="mb-6"
                >
                  <span className="text-[14px] md:text-[18px] font-semibold tracking-[0.3em] text-[#0071e3] uppercase">
                    Intelligent Infrastructure for Adaptive Mobility
                  </span>
                </motion.div>

                <p className="text-[16px] md:text-[20px] text-white/70 max-w-[750px] mb-6 leading-relaxed">
                  Adapy transforms adaptive vehicles into intelligent, connected environments — delivering proactive safety, unified control, and lifecycle visibility.
                </p>

                {/* Rotating Statements */}
                <div className="h-8 mb-10 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={textIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="text-[13px] md:text-[15px] font-medium text-[#0071e3] tracking-wide uppercase italic"
                    >
                      {benefitStatements[textIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/platform">
                    <button className="px-10 py-4 bg-[#0071e3] text-white rounded-full font-bold text-[18px] hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-[0.97] shadow-xl shadow-[#0071e3]/20">
                      Explore the Platform
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-[18px] hover:bg-white/20 transition-all transform hover:scale-105 active:scale-[0.97]">
                      Contact Our Team
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="w-full">
            <ScrollingLogos />
          </div>
        </div>
      </section>

      {/* SECTION 1 — THE INDUSTRY GAP */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">The Industry Gap</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
                Adaptive Mobility Has Advanced.<br />The Infrastructure Has Not.
              </h2>
              <p className="text-xl text-black/60 mb-8 leading-relaxed">
                Today’s adaptive vehicles operate in isolation. As mobility solutions become more complex, the industry lacks a connected backbone.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Equipment functions independently",
                "No centralized monitoring",
                "Limited safety visibility",
                "No lifecycle analytics",
                "Minimal real-time diagnostics",
                "No unified intelligence layer"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-black/[0.03] border border-black/[0.05]">
                  <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
                  <span className="font-medium text-black/80">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3 — THE ADAPY ECOSYSTEM & SMART HUB */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 text-center max-w-4xl mb-20">
          <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">The Adapy Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">One Platform. Multiple Layers. Total Visibility.</h2>
          <p className="text-xl text-black/60 leading-relaxed">
            At the center of every connected adaptive vehicle is the Adapy Smart Hub — the brain of the system. One vehicle. One intelligent control layer.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm">
              <Cpu className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Smart Hub</h3>
              <p className="text-black/60 leading-relaxed mb-6">The Brain of the Adaptive Vehicle. Centralizes control and monitoring across compatible mobility equipment.</p>
              <ul className="space-y-3">
                {["Multi-device integration", "Equipment diagnostics", "Usage reporting", "Real-time alerts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm md:mt-8">
              <Network className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Connectivity</h3>
              <p className="text-black/60 leading-relaxed mb-6">Seamlessly connects adaptive equipment, control interfaces, and safety sensors into one unified environment.</p>
              <ul className="space-y-3">
                {["Harness Kits", "Wireless Controllers", "Safety Sensors", "Environmental Monitoring"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <Layers className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm md:mt-16">
              <Cloud className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Cloud Intelligence</h3>
              <p className="text-black/60 leading-relaxed mb-6">Visibility beyond the vehicle. Secure dashboards for dealers, manufacturers, and fleet operators.</p>
              <ul className="space-y-3">
                {["Warranty documentation", "Compliance reporting", "Lifecycle analytics", "Fleet management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <BarChart3 className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5 — CONTROL & SAFETY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Safety & Monitoring</span>
              <h2 className="text-4xl font-bold mb-8">Proactive Safety Intelligence</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Thermometer />, label: "Temperature" },
                  { icon: <Battery />, label: "Voltage/Battery" },
                  { icon: <Shield />, label: "CO Detection" },
                  { icon: <Navigation />, label: "GPS Tracking" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-[#f5f5f7] flex flex-col items-center text-center">
                    <div className="mb-4 text-[#0071e3]">{item.icon}</div>
                    <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-black/60 leading-relaxed text-lg">
                The Adapy platform expands through intelligent monitoring modules, creating a layered safety architecture. Safety becomes proactive — not reactive.
              </p>
            </div>
            <div className="bg-black text-white p-12 rounded-[3rem] flex flex-col justify-center">
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Control Integration</span>
              <h2 className="text-4xl font-bold mb-8">Unified Control Environment</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold mb-2">Harness Kits</h4>
                  <p className="text-white/60">Purpose-built integration kits designed for specific equipment models. Multiple kits can operate within a single installation.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Wireless Controllers</h4>
                  <p className="text-white/60">For locations where traditional mounting is not possible — such as inside transfer seats — Adapy enables secure wireless integration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SCALABLE DEPLOYMENT */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Scalable Deployment</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From Individual Vehicles to Fleet Infrastructure</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white border border-black/[0.05]">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Personal Mobility</h3>
              <p className="text-black/60 leading-relaxed">Connected, intelligent environments for individual adaptive vehicles and dealer networks.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-black/[0.05]">
              <div className="w-12 h-12 bg-[#0071e3] text-white rounded-2xl flex items-center justify-center mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">NEMT Fleet Intelligence</h3>
              <p className="text-black/60 leading-relaxed">Fleet-scale monitoring including environmental safety alerts, GPS tracking, and adaptive equipment oversight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — WHY ADAPY */}
      <section className="py-32 bg-black text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 leading-[1.1]">The Future of Adaptive Mobility Is Connected</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {["Control", "Safety", "Intelligence", "Visibility"].map((word, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-1 h-12 bg-[#0071e3] mb-4" />
                <span className="text-lg font-bold uppercase tracking-[0.2em]">{word}</span>
              </div>
            ))}
          </div>
          <p className="text-xl text-white/60 mb-12">Adapy creates the digital infrastructure layer the adaptive industry has been missing. All unified.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Build on the Adapy Platform</h2>
          <p className="text-xl text-black/60 mb-12 leading-relaxed">
            Whether you are a dealer, manufacturer, healthcare professional, or fleet operator — Adapy provides the intelligent infrastructure to power modern adaptive mobility.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <button className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-lg hover:scale-105 active:scale-95">
                Explore the Platform
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-black/90 transition-all shadow-lg hover:scale-105 active:scale-95">
                Contact Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
