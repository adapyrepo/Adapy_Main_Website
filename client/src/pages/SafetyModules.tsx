import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  ShieldCheck, 
  Thermometer, 
  Battery, 
  Zap, 
  Activity, 
  Navigation, 
  Cpu, 
  Network, 
  Cloud, 
  Lock, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const features = [
  {
    title: "Temperature Monitoring",
    description: "Helps track interior conditions within adaptive environments to ensure passenger comfort and equipment safety.",
    icon: <Thermometer className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Voltage Monitoring",
    description: "Provides visibility into vehicle power conditions affecting the reliable operation of adaptive equipment.",
    icon: <Battery className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Battery Cut-Off Control",
    description: "Structured control options for managing vehicle power states and preventing parasitic drain.",
    icon: <Zap className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Environmental Detection",
    description: "Monitors air quality conditions, including Carbon Monoxide, inside enclosed vehicle spaces.",
    icon: <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "GPS & Location Services",
    description: "Enables vehicle-level visibility and tracking when deployed within fleet and NEMT environments.",
    icon: <Navigation className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Equipment Activity",
    description: "Tracks operational activity and cycle counts across integrated adaptive systems for better maintenance.",
    icon: <Activity className="w-6 h-6 text-[#0071e3]" />
  }
];

const faqs = [
  {
    question: "Are these standalone safety sensors?",
    answer: "No. Adapy Safety Modules are integrated extensions that connect directly to the Smart Hub, functioning as part of a coordinated vehicle ecosystem."
  },
  {
    question: "Can I choose which modules to install?",
    answer: "Yes. The system is modular and scalable. You can deploy only the monitoring capabilities required for your specific vehicle or fleet configuration."
  },
  {
    question: "How do I receive safety alerts?",
    answer: "Alerts are processed through the Smart Hub and can be viewed on local interfaces or remotely via the Adapy Cloud dashboards."
  },
  {
    question: "Is this a medical device?",
    answer: "Adapy Safety Modules are designed for environmental and vehicle monitoring. They provide a layered safety architecture but are not intended as primary medical monitoring devices."
  },
  {
    question: "Do these modules work with any vehicle?",
    answer: "Safety Modules are designed for integration within any adaptive mobility environment equipped with an Adapy Smart Hub."
  }
];

export default function SafetyModules() {
  useSEO({ title: "Adaptive Vehicle Safety Modules — Always-On Monitoring", description: "Always-on monitoring for lifts, ramps, cabin temperature, CO levels, and more — engineered to protect adaptive drivers and passengers.", path: "/hardware/safety-modules" });
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
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Safety Infrastructure</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Safety Modules
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              Integrated environmental and vehicle monitoring designed for connected adaptive mobility environments.
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

      {/* Section 1: Why Safety Intelligence Matters */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Adaptive Mobility Requires Proactive Monitoring</h2>
              <div className="space-y-6 text-lg text-black/60 leading-relaxed">
                <p>
                  Adaptive vehicles often transport vulnerable passengers, yet environmental and equipment risks can often go unnoticed by traditional standalone systems.
                </p>
                <p>
                  Adapy introduces a structured safety layer inside the vehicle ecosystem, coordinating oversight where it was previously fragmented.
                </p>
                <p className="text-black font-bold pt-4">
                  Safety should be integrated — not added as an afterthought.
                </p>
              </div>
            </div>
            <div className="bg-[#0071e3] rounded-[2.5rem] p-12 flex items-center justify-center relative overflow-hidden group">
              <ShieldCheck className="w-32 h-32 text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What Safety Modules Do */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Expanding the Smart Hub Intelligence Layer</h2>
          <p className="text-black/60 mb-16 max-w-2xl mx-auto">
            Safety Modules connect directly to the Adapy Smart Hub to provide additional monitoring and control capabilities across the entire environment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {features.map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-[#f5f5f7] border border-black/5 hover:border-[#0071e3]/20 transition-all group">
                <div className="mb-6 p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-black/40 text-sm italic">
            Note: Available modules may vary based on specific deployment configuration.
          </p>
        </div>
      </section>

      {/* Section 3: Platform Architecture */}
      <section className="py-24 bg-black text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Layered Safety Architecture</h2>
          <div className="flex flex-col items-center">
            <div className="grid md:grid-cols-3 gap-8 items-center w-full">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-[#0071e3] font-bold text-xs uppercase mb-2">Connected Inputs</div>
                <div className="text-sm">Harness Kits + Wireless Controllers</div>
              </div>
              <div className="p-8 bg-[#0071e3] rounded-[2.5rem] shadow-2xl">
                <Cpu className="w-12 h-12 mx-auto mb-2" />
                <div className="font-bold">Smart Hub</div>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-[#0071e3] font-bold text-xs uppercase mb-2">Platform Visibility</div>
                <div className="text-sm">Adapy Cloud Dashboards</div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/10 border border-[#0071e3]/30 rounded-full inline-flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0071e3]" />
              <span className="font-bold">Safety Modules Integrated Layer</span>
            </div>
            <p className="mt-12 text-white/40 text-sm">
              A unified system coordinating control, monitoring, and visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Scalable Deployment */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Scalable Safety Deployment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Individual Vehicles", desc: "Adds structured monitoring within personal mobility environments for peace of mind." },
              { title: "Dealer Networks", desc: "Improves post-install visibility and service awareness across client vehicles." },
              { title: "CDRS Professionals", desc: "Provides greater confidence in safety-aware equipment deployments and outcomes." },
              { title: "NEMT Fleets", desc: "Supports vehicle-level safety triggers and operational visibility at fleet scale." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs">{item.title}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-center text-black/40 font-medium">
            Same platform architecture — expanded intelligence layer.
          </p>
        </div>
      </section>

      {/* Section 5: Structured Visibility */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Designed for Structured Visibility</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ul className="space-y-6">
              {[
                "Role-based dashboard visibility",
                "Structured device authentication",
                "Secure device-to-cloud communication",
                "Segmented access across stakeholders"
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
                "Safety data should be accessible — but only to those who need it."
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
            Safety Modules require the Adapy Smart Hub and function as part of the connected mobility ecosystem. They extend the platform’s intelligence and monitoring capabilities.
          </p>
          <Link href="/hardware/smart-hub">
            <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-[#0077ed] transition-all">
              View the Smart Hub <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
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
          <h2 className="text-4xl font-bold mb-6">Add Intelligence to Your Safety Strategy</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Discover how integrated safety monitoring can transform your mobility environment.
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
