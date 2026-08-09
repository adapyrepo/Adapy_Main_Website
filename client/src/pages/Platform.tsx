import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { VideoTestimonialScroller } from "@/components/VideoTestimonialScroller";
import { TestimonialScroller } from "@/components/TestimonialScroller";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { RoleSelectorModal } from "@/components/RoleSelectorModal";
import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";
import { 
  Network, 
  Cloud, 
  Zap, 
  Shield, 
  BarChart3, 
  Layers, 
  Thermometer, 
  Battery, 
  Navigation,
  Lock,
  ChevronRight,
  Activity,
  X
} from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { computeMomentCount } from "@/lib/mobilityMoments";
import ecosystemDiagram from "@assets/diagram_adapy_1785260728077.png";

export default function Platform() {
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(false);
  const [momentCount, setMomentCount] = useState(() => computeMomentCount(Date.now()));

  // Keep the hero number in lockstep with the header ticker (same shared source).
  useEffect(() => {
    const tick = setInterval(() => setMomentCount(computeMomentCount(Date.now())), 60_000);
    return () => clearInterval(tick);
  }, []);
  const [activeVideo, setActiveVideo] = useState<{
    videoUrl: string;
    title: string;
  } | null>(null);
  useSEO({
    title: "Adapy Platform — Unified Wheelchair Vehicle Control",
    description: "One platform connecting wheelchair lifts, ramps, transfer seats, and hand controls — Smart Hub, harness integration, controllers, safety modules, app, and dashboard.",
    path: "/",
    keywords: "wheelchair accessible vehicle platform, adaptive vehicle control system, mobility equipment integration, smart wheelchair van, connected mobility platform, adaptive driving technology",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Adapy Adaptive Mobility Platform",
      provider: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
      serviceType: "Connected adaptive vehicle control and monitoring platform",
      areaServed: "United States",
      description: "Unified control, monitoring, and lifecycle visibility for every piece of adaptive equipment in a wheelchair accessible vehicle.",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#0071e3] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-40 md:pb-44 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0071e3] blur-[150px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.15] max-w-5xl mx-auto">
              {momentCount.toLocaleString()} Moments of Mobility and&nbsp;Counting.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto mb-10 leading-relaxed">
              Every one represents a moment someone moved forward without waiting or asking for help. With Adapy, you can independently control your wheelchair lift, transfer seat, ramp, doors, and more—all from your smartphone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setIsRoleSelectorOpen(true)}
                className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                How will it help you?
              </button>
              <button
                onClick={() =>
                  setActiveVideo({
                    videoUrl: "https://www.youtube.com/embed/Bngl22MMnc0",
                    title: "Adapy Platform Overview",
                  })
                }
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                Watch Product Video
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 w-full opacity-70 hover:opacity-100 transition-opacity duration-500">
          <TestimonialScroller />
        </div>
      </section>

      {/* SECTION 1 — WHY A PLATFORM */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Adaptive Mobility Needs Infrastructure</h2>
            <div className="space-y-6 text-lg md:text-xl text-black/60 leading-relaxed">
              <p>
                Modern adaptive vehicles often include multiple independent systems—lifts, transfer seats, roof systems, environmental controls, and safety devices. Each operates in isolation.
              </p>
              <p>
                There is no centralized intelligence layer. No unified diagnostics. No lifecycle analytics. No real-time visibility across stakeholders.
              </p>
              <p className="text-black font-semibold">
                Adapy was built to become the missing infrastructure layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PLATFORM OVERVIEW */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">One Brain. Multiple Layers. Unified Intelligence.</h2>
              <p className="text-xl text-black/60 mb-8 leading-relaxed">
                At the center of the platform is the Adapy Smart Hub. The Smart Hub serves as the intelligent control and monitoring core of the adaptive vehicle.
              </p>
              <p className="text-lg font-semibold mb-6">From this central layer, Adapy connects:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Equipment control systems",
                  "Harness integrations",
                  "Wireless controllers",
                  "Safety monitoring modules",
                  "Environmental sensors",
                  "Cloud intelligence dashboards"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                    <span className="text-black/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-xl font-bold text-[#0071e3]">The result is a connected mobility ecosystem.</p>
            </div>
            <div className="relative aspect-square rounded-[3rem] border border-black/5 shadow-2xl overflow-hidden">
               <img
                 src={ecosystemDiagram}
                 alt="Adapy Smart Hub ecosystem diagram — one brain, multiple layers, unified intelligence"
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — ARCHITECTURE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">How the Platform Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Layer 1 */}
            <div className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-black/5">
              <h3 className="text-2xl font-bold mb-4">Layer 1 — The Intelligence Core</h3>
              <p className="text-black/60 mb-6 font-medium">Adapy Smart Hub</p>
              <ul className="space-y-3 mb-6">
                {["Centralizes control signals", "Monitors equipment activity", "Logs usage data", "Communicates with safety modules", "Connects securely to the cloud"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ChevronRight size={16} className="text-[#0071e3]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold opacity-60 italic">It transforms standalone devices into a coordinated system.</p>
            </div>

            {/* Layer 2 */}
            <div className="p-8 rounded-[2.5rem] bg-black text-white">
              <h3 className="text-2xl font-bold mb-4 text-white">Layer 2 — Control Integration</h3>
              <p className="text-white/60 mb-6">Adaptive equipment integrates through:</p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[#0071e3] uppercase tracking-wider text-xs mb-2">Harness Kits</h4>
                  <p className="text-white/80 text-sm">Purpose-built integrations for specific equipment models. Multiple harness kits can operate simultaneously within one installation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#0071e3] uppercase tracking-wider text-xs mb-2">Wireless Controllers</h4>
                  <p className="text-white/80 text-sm">Used where physical harness placement is not feasible. All control inputs route through the Smart Hub.</p>
                </div>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-black/5">
              <h3 className="text-2xl font-bold mb-4">Layer 3 — Safety & Monitoring</h3>
              <p className="text-black/60 mb-6">The platform expands through modular intelligence components:</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Thermometer size={16} />, label: "Temperature" },
                  { icon: <Battery size={16} />, label: "Voltage/Battery" },
                  { icon: <Shield size={16} />, label: "CO Detection" },
                  { icon: <Activity size={16} />, label: "Activity Tracking" },
                  { icon: <Navigation size={16} />, label: "GPS Tracking" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium p-2 bg-white rounded-lg">
                    <span className="text-[#0071e3]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-semibold opacity-60 italic">These modules create a layered safety architecture inside the vehicle.</p>
            </div>

            {/* Layer 4 */}
            <div className="p-8 rounded-[2.5rem] bg-[#0071e3] text-white">
              <h3 className="text-2xl font-bold mb-4 text-white">Layer 4 — Cloud Intelligence</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Data from the vehicle securely transmits to the Adapy Cloud, enabling role-based dashboards for:
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-6">
                {["Dealers", "CDRS professionals", "Manufacturers", "Fleet operators"].map((item, i) => (
                  <li key={i} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold text-center border border-white/20">{item}</li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-white/80 italic">Each stakeholder receives relevant, permission-based visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — DIFFERENTIATORS */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-center">Built Specifically for Adaptive Mobility</h2>
          <p className="text-xl text-black/60 mb-12 text-center leading-relaxed">
            Adapy is not a generic IoT device. It was engineered for mobility equipment integration, vehicle-based adaptive environments, and multi-stakeholder visibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Supports multiple devices per vehicle",
              "Supports multiple vehicles per organization",
              "Designed to scale from single installs to fleet deployments",
              "Permission-based visibility by role"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm border border-black/5">
                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-full flex items-center justify-center text-[#0071e3]">
                  <Zap size={20} />
                </div>
                <span className="font-bold text-black/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand trust strip — section footer */}
        <div className="container mx-auto px-6 mt-16">
          <div className="bg-[#0e0f12] text-white rounded-[2.5rem] py-12 px-8 md:px-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold leading-tight">
                  <span className="block text-white/70">Driving innovation</span>
                  <span className="block text-white/70">across adaptive</span>
                  <span className="block text-[#0071e3] font-bold">
                    mobility brands
                  </span>
                </div>
              </div>
              <div className="flex-1 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 w-full overflow-hidden">
                <ScrollingLogos />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SCALABILITY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">From Individual Vehicles to Enterprise Networks</h2>
          <p className="text-xl text-black/60 leading-relaxed">
            The same platform architecture supports single adaptive vehicles, multi-location dealer networks, state-level mobility programs, and national NEMT fleets. No system redesign required. The Smart Hub remains the core. The cloud expands as needed.
          </p>
        </div>
      </section>

      {/* SECTION 6 — SECURITY */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Secure by Design</h2>
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                Adaptive mobility data remains protected and structured through enterprise-grade security protocols.
              </p>
              <div className="space-y-4">
                {[
                  "Role-based access controls",
                  "Encrypted device-to-cloud communication",
                  "Segmented dashboard visibility",
                  "Secure device authentication"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Lock size={20} className="text-[#0071e3]" />
                    <span className="font-semibold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex items-center justify-center aspect-video relative overflow-hidden">
               <Shield size={120} className="text-[#0071e3]/20 absolute" />
               <div className="text-center relative z-10">
                 <Shield size={64} className="text-[#0071e3] mx-auto mb-6" />
                 <p className="text-xl font-bold text-white uppercase tracking-widest">Enterprise Ready</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — OUTCOMES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">Platform Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Control", desc: "Unified command across equipment.", icon: <Zap /> },
              { title: "Safety", desc: "Proactive environmental and operational monitoring.", icon: <Shield /> },
              { title: "Intelligence", desc: "Usage data and diagnostics.", icon: <BarChart3 /> },
              { title: "Visibility", desc: "Lifecycle insight across stakeholders.", icon: <Activity /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-black/5 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-[#0071e3] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#0071e3]/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <VideoTestimonialScroller
        onVideoSelect={(video) => setActiveVideo(video)}
      />

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-black text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0071e3] blur-[120px] rounded-full -mr-32 -mt-32 opacity-20" />
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Build on the Adapy Platform</h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Whether integrating a single vehicle or deploying across a fleet, the Adapy Smart Mobility Platform provides the connected infrastructure layer modern adaptive environments require.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <button className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-lg hover:scale-105 active:scale-95">
                  Request a Demo
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:scale-105 active:scale-95">
                  Contact Our Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Role Selector Modal */}
      <RoleSelectorModal
        open={isRoleSelectorOpen}
        onClose={() => setIsRoleSelectorOpen(false)}
      />

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="h-[85vh] max-h-[85vh] aspect-[9/16] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1&controls=0&playsinline=1&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&cc_lang_pref=`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
