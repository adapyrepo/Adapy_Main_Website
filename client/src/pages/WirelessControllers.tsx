import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  Wifi, 
  Cpu, 
  Settings, 
  Activity, 
  Cloud, 
  ChevronRight,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Zap,
  Network
} from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const benefits = [
  {
    title: "Flexible Placement",
    description: "Enables control placement where physical wiring access is limited or impossible.",
    icon: <Settings className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Cleaner Installs",
    description: "Reduces physical routing complexity and installation time for specialty equipment.",
    icon: <Zap className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Unified Control",
    description: "All signals route through the Smart Hub, maintaining a single point of intelligence.",
    icon: <Cpu className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Expandable Architecture",
    description: "Works seamlessly alongside wired harness kits and monitoring modules.",
    icon: <Network className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Structured Visibility",
    description: "Optional cloud connectivity through the Adapy platform for remote monitoring.",
    icon: <Cloud className="w-6 h-6 text-[#0071e3]" />
  }
];

const faqs = [
  {
    question: "Do wireless controllers require a separate battery?",
    answer: "Our wireless controllers are designed for long-term reliability in adaptive environments. Specific power requirements depend on the integration scenario, such as transfer seat placement."
  },
  {
    question: "Is the wireless connection secure?",
    answer: "Yes, all Adapy wireless controllers use secure communication protocols to interface with the Smart Hub, ensuring reliable operation within the vehicle."
  },
  {
    question: "Can I use wireless and wired controls together?",
    answer: "Absolutely. The Smart Hub is designed to coordinate signals from both wired harness kits and wireless controllers simultaneously."
  },
  {
    question: "What is the range of the wireless controllers?",
    answer: "They are purpose-built for use within and immediately around the vehicle, ensuring stable connectivity to the Smart Hub throughout the adaptive environment."
  },
  {
    question: "Do these replace the Smart Hub?",
    answer: "No. Wireless controllers are extensions of the ecosystem and require an Adapy Smart Hub to process and route control signals."
  }
];

export default function WirelessControllers() {
  useSEO({
    title: "Wireless Controllers for Wheelchair Lifts, Ramps & Doors",
    description: "Replace pendants, key fobs, and crank handles with a single wireless controller for every adaptive function in your wheelchair accessible vehicle.",
    path: "/hardware/wireless-controllers",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Hardware", path: "/platform" },
      { name: "Wireless Controllers", path: "/hardware/wireless-controllers" },
    ],
    keywords: "wireless wheelchair lift controller, wheelchair ramp remote, adaptive vehicle key fob, wheelchair van remote control, accessible vehicle controls",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Adapy Wireless Controllers",
      brand: { "@type": "Brand", name: "Adapy" },
      category: "Adaptive Vehicle Remote Control",
      description: "Single wireless controller that replaces pendants, key fobs, and crank handles for every adaptive function in a wheelchair accessible vehicle.",
      url: "https://adapy.com/hardware/wireless-controllers",
      manufacturer: { "@type": "Organization", name: "Adapy" },
    },
  });
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f5f5f7]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Hardware Extension</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Wireless Controllers
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              Flexible control integration for adaptive environments where traditional wiring isn’t possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                  Request a Demo
                </button>
              </Link>
              <Link href="/hardware/smart-hub">
                <button className="px-8 py-4 bg-black/5 border border-black/10 text-black rounded-full font-bold hover:bg-black/10 transition-all">
                  Explore the Smart Hub
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Why Wireless */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">When Wiring Isn’t an Option</h2>
              <div className="space-y-6 text-lg text-black/60 leading-relaxed">
                <p>
                  Some adaptive environments, such as transfer seats and specialty equipment, limit traditional harness placement. 
                </p>
                <p>
                  Wireless Controllers provide a structured alternative, allowing for flexible control placement while maintaining centralized intelligence through the Adapy Smart Hub.
                </p>
              </div>
            </div>
            <div className="bg-[#f5f5f7] rounded-[2.5rem] p-12 flex items-center justify-center relative group">
              <Wifi className="w-32 h-32 text-[#0071e3] group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#0071e3]/5 rounded-[2.5rem] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Integrated — Not Isolated</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Connect", desc: "Wireless Controllers communicate securely with the Adapy Smart Hub.", icon: <Wifi /> },
              { title: "Route", desc: "Control signals are processed through the Smart Hub for unified logic.", icon: <Settings /> },
              { title: "Coordinate", desc: "Multiple devices can operate within one cohesive vehicle ecosystem.", icon: <Activity /> },
              { title: "Expand", desc: "Works alongside wired harness kits and safety monitoring modules.", icon: <Smartphone /> }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#f5f5f7] flex flex-col items-center">
                <div className="mb-6 text-[#0071e3]">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-black/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Applications */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Designed for Adaptive Mobility Environments</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Transfer Seats", desc: "Allows embedded or concealed control integration where wiring is impractical." },
              { title: "Specialty Equipment", desc: "Supports environments where physical harness routing constraints exist." },
              { title: "Retrofit Scenarios", desc: "Enables platform integration without extensive vehicle rewiring." },
              { title: "Complex Installs", desc: "Works alongside wired harness kits within a single vehicle ecosystem." }
            ].map((app, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
                <h3 className="text-xl font-bold mb-4">{app.title}</h3>
                <p className="text-black/60 leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Why Wireless Integration Matters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/5 hover:border-[#0071e3]/20 transition-all group">
                <div className="mb-6 p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                <p className="text-black/60 text-xs leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Audience */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Built for the Mobility Ecosystem</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Dealers</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                More flexible install options and significantly reduced wiring constraints for complex builds.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">CDRS Professionals</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Improved customization capabilities for client-specific adaptive equipment layouts.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Manufacturers</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                A structured integration pathway for systems where wired access is physically limited.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">Fleet Operators</h4>
              <p className="text-sm text-black/70 leading-relaxed">
                Scalable, standardized integration across varied and complex vehicle configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Platform Connection */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Powered by the Adapy Smart Hub</h2>
          <p className="text-lg text-white/60 mb-12">
            Wireless Controllers require the Adapy Smart Hub and function as part of the larger Smart Mobility ecosystem. They do not replace the Hub — they extend its reach.
          </p>
          <Link href="/hardware/smart-hub">
            <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-[#0077ed] transition-all">
              View the Smart Hub <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Section 7: Safety & Structure */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Designed for Structured Deployment</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ul className="space-y-6">
              {[
                "Integrated into Smart Hub control architecture",
                "Designed for coordinated multi-device environments",
                "Compatible with Adapy safety modules",
                "Structured cloud connectivity enabled"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#0071e3] shrink-0 mt-1" />
                  <span className="text-black/70 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
            <div className="p-8 bg-[#f5f5f7] rounded-3xl flex flex-col justify-center">
              <ShieldCheck className="w-12 h-12 text-[#0071e3] mb-4" />
              <p className="text-sm text-black/60 italic leading-relaxed">
                Wireless Controllers extend the Adapy ecosystem, delivering flexibility without compromising on structured platform intelligence.
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
          <h2 className="text-4xl font-bold mb-6">Need Flexible Integration?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Invite a demo or consultation to see how our wireless controllers can solve your most complex installation challenges.
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
