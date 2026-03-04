import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import hubMockup from "@assets/mockup_new_1772231341293.png";
import hubWireframe from "@assets/adapy_hub_1772654723239.png";
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Network, 
  Cloud, 
  Smartphone,
  ChevronRight,
  Shield,
  BarChart3,
  Layers,
  Lock,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    title: "Unified Control",
    description: "Consolidate multiple adaptive devices into a single, intuitive interface, reducing complexity and increasing independence.",
    icon: <Smartphone className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Multi-Device Integration",
    description: "Designed for complex multi-device installs, coordinating lifts, roof systems, and other adaptive equipment seamlessly.",
    icon: <Layers className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Safety & Monitoring Expansion",
    description: "Supports optional modules for temperature, voltage, CO/CO2, and GPS monitoring to protect the vehicle environment.",
    icon: <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Usage & Diagnostics Visibility",
    description: "Track real-world equipment performance and receive proactive maintenance alerts before issues arise.",
    icon: <Activity className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Secure Cloud Connectivity",
    description: "Data flows securely to the Adapy Cloud, enabling remote visibility for dealers, manufacturers, and fleet operators.",
    icon: <Cloud className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Scalable Deployment",
    description: "From individual adaptive vehicles to entire NEMT fleets, the Smart Hub scales to meet any deployment need.",
    icon: <Network className="w-6 h-6 text-[#0071e3]" />
  }
];

const faqs = [
  {
    question: "What equipment is compatible with the Smart Hub?",
    answer: "The Smart Hub is designed to work with a wide range of industry-standard adaptive equipment through our specialized Harness Kits and Wireless Controllers."
  },
  {
    question: "Does it require a constant internet connection?",
    answer: "While connectivity enables cloud features like remote diagnostics and fleet tracking, the core equipment control functions operate locally and reliably within the vehicle."
  },
  {
    question: "How does the Smart Hub improve safety?",
    answer: "By centralizing controls and adding environmental monitoring (like CO detection and battery voltage), it provides a proactive safety layer that traditional systems lack."
  },
  {
    question: "Can it be installed in existing adaptive vehicles?",
    answer: "Yes, the Smart Hub is designed for both new builds and as an upgrade for existing adaptive mobility environments through authorized Adapy dealers."
  },
  {
    question: "Who can see the data from my vehicle?",
    answer: "Data visibility is strictly controlled through role-based access. You, your authorized dealer, and equipment manufacturers see only the data relevant to safety and performance."
  }
];

export default function SmartHub() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f5f5f7]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={hubWireframe} 
            alt="" 
            className="w-full h-full object-cover lg:object-contain object-right"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Hardware Core</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Adapy Smart Hub
              </h1>
              <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed max-w-2xl">
                The intelligent control core that unifies adaptive equipment, safety monitoring, and cloud visibility in one vehicle ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                    Request a Demo
                  </button>
                </Link>
                <Link href="/platform">
                  <button className="px-8 py-4 bg-black/5 border border-black/10 text-black rounded-full font-bold hover:bg-black/10 transition-all">
                    Explore the Platform
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: What it is */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Brain of the Adaptive Vehicle</h2>
              <p className="text-lg text-black/60 leading-relaxed mb-6">
                The Smart Hub is the central intelligence layer inside the vehicle that coordinates multiple adaptive devices, control interfaces, and safety modules. 
              </p>
              <p className="text-lg text-black/60 leading-relaxed">
                Designed for multi-device installs, it offers "one hub, many integrations," replacing the clutter of fragmented controls with a single, reliable backbone.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#0071e3]/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={hubMockup} 
                alt="Adapy Smart Hub and Mobile App" 
                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What it enables */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What the Smart Hub Enables</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-[#f5f5f7] border border-black/5 hover:border-[#0071e3]/20 transition-all group"
              >
                <div className="mb-6 p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Ecosystem Diagram */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center text-white">How the Smart Hub Connects Everything</h2>
          
          <div className="relative flex flex-col items-center">
            {/* Connection Lines (Desktop) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl hidden md:block pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0071e3" stopOpacity="0" />
                    <stop offset="50%" stopColor="#0071e3" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 150,200 L 400,200" stroke="url(#line-grad)" strokeWidth="2" fill="none" />
                <path d="M 650,200 L 400,200" stroke="url(#line-grad)" strokeWidth="2" fill="none" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center w-full relative">
              {/* Left Side: Hardware */}
              <div className="flex flex-col gap-6 items-center md:items-end">
                <div className="text-[#0071e3] font-bold uppercase tracking-widest text-xs mb-2">Hardware Layer</div>
                <div className="flex flex-col gap-3 items-center md:items-end w-full">
                  {["Harness Kits", "Wireless Controllers", "Safety Modules"].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: -5 }}
                      className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium w-full md:w-auto text-center md:text-right backdrop-blur-sm"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Center: Smart Hub */}
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: ["0 0 20px rgba(0,113,227,0.2)", "0 0 40px rgba(0,113,227,0.4)", "0 0 20px rgba(0,113,227,0.2)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="p-10 bg-[#0071e3] rounded-[3rem] shadow-2xl shadow-[#0071e3]/40 flex flex-col items-center relative z-20"
                >
                  <Cpu className="w-16 h-16 mb-4 text-white" />
                  <span className="text-xl font-bold text-white">Smart Hub</span>
                </motion.div>
              </div>

              {/* Right Side: Cloud */}
              <div className="flex flex-col gap-6 items-center md:items-start">
                <div className="text-[#0071e3] font-bold uppercase tracking-widest text-xs mb-2">Cloud Intelligence</div>
                <div className="flex flex-col gap-3 items-center md:items-start w-full">
                  {["Dealer Dashboard", "CDRS Portal", "Manufacturer Analytics", "Fleet Tools"].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium w-full md:w-auto text-center md:text-left backdrop-blur-sm"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-20 text-white/40 text-center text-sm italic max-w-lg">
              A cohesive ecosystem designed to protect mobility data and enable responsible monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Integration Paths */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Integration Options</h2>
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-[2rem] border border-black/5 hover:bg-[#f5f5f7] transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-4">Harness Kits</h3>
                <p className="text-black/60 leading-relaxed mb-6">
                  Purpose-built integrations for specific equipment models. Multiple harness kits can coexist in a single installation to handle complex vehicle setups.
                </p>
                <Link href="/hardware/harness-integration" className="text-[#0071e3] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View Harness Integration <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Layers className="w-24 h-24 text-black/5 ml-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-[2rem] border border-black/5 hover:bg-[#f5f5f7] transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-4">Wireless Controllers</h3>
                <p className="text-black/60 leading-relaxed mb-6">
                  For locations where a traditional harness can't mount. Enables flexible control placement, such as inside transfer seats or on custom armrests.
                </p>
                <Link href="/hardware/wireless-controllers" className="text-[#0071e3] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View Wireless Controllers <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Smartphone className="w-24 h-24 text-black/5 ml-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-[2rem] border border-black/5 hover:bg-[#f5f5f7] transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-4">Safety Modules</h3>
                <p className="text-black/60 leading-relaxed mb-6">
                  Expand the system with environmental and vehicle monitoring modules including temperature sensors, voltage monitoring, battery cut-offs, CO/CO2 detection, and GPS.
                </p>
                <Link href="/hardware/safety-modules" className="text-[#0071e3] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View Safety Modules <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <ShieldCheck className="w-24 h-24 text-black/5 ml-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Audience Block */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Built for the Mobility Ecosystem</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Dealers</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Unlock install scalability, better service visibility, and a more streamlined equipment lifecycle.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">CDRS Professionals</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Gain confidence in client setups with progress visibility and more reliable equipment outcomes.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Manufacturers</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Gain optics on real-world performance and remote diagnostics to improve product reliability.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Fleets / NEMT</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Utilize safety triggers, comprehensive equipment monitoring, and scalable deployment across your entire fleet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Trust & Deployment */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Designed for Reliable, Secure Deployment</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ul className="space-y-6">
              {[
                "Role-based access pathways through Adapy Cloud",
                "Secure device authentication design",
                "Encrypted communication protocols",
                "Structured data visibility by user role"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#0071e3] shrink-0 mt-1" />
                  <span className="text-black/70 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
            <div className="p-8 bg-[#f5f5f7] rounded-[2rem] flex flex-col justify-center">
              <Lock className="w-12 h-12 text-[#0071e3] mb-4" />
              <p className="text-sm text-black/60 italic leading-relaxed">
                "We are dedicated to protecting mobility data and enabling responsible monitoring to ensure user independence and safety."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold mb-2">{faq.question}</h4>
                <p className="text-sm text-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 bg-[#0071e3] text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">See the Smart Hub in Action</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Invite a demo or consultation to see how the Smart Hub can transform your mobility environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-10 py-5 bg-white text-[#0071e3] rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl">
                Request a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
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
