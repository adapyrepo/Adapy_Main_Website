import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  Layers, 
  Zap, 
  Activity, 
  Cloud, 
  ChevronRight,
  CheckCircle2,
  Settings,
  Cpu,
  Smartphone
} from "lucide-react";

import hubWireframe from "@assets/Screenshot_2026-03-04_at_3.03.20_PM_1772661815249.png";

const categories = [
  {
    title: "Lifts",
    items: [
      { name: "BraunAbility UVL", desc: "Designed for integration with UVL lift systems." },
      { name: "BraunAbility ASL-250 Platform Lift", desc: "Designed for integration with ASL-250 platform lift systems." },
      { name: "BraunAbility NCL-2 Century Series", desc: "Designed for integration with NCL-2 lift systems." },
      { name: "BraunAbility Millennium Series", desc: "Designed for integration with Millennium Series lift systems." },
      { name: "Bruno VSL-6000", desc: "Designed for integration with VSL-6000 lift systems." },
      { name: "Bruno VSL-4400-HW (JOEY)", desc: "Designed for integration with JOEY lift systems." },
      { name: "Bruno Outsider ASL-250", desc: "Designed for integration with Outsider lift systems." },
      { name: "Harmar AL500 Universal Powerchair Lift", desc: "Designed for integration with AL500 lift systems." },
      { name: "Harmar AL625 Hybrid Van Lift", desc: "Designed for integration with AL625 lift systems." },
      { name: "Ricon K-Series", desc: "Designed for integration with KlearVue Classic Harness." },
      { name: "Ricon S-Series", desc: "Designed for integration with Clearway S-Series Harness." },
    ]
  },
  {
    title: "Crane / Hoist Systems",
    items: [
      { name: "Bruno PUL 1100 V1", desc: "Designed for integration with inside crane systems." },
      { name: "Bruno PUL 1100 V2", desc: "Designed for integration with inside crane systems." },
      { name: "Bruno VSL-6900", desc: "Designed for integration with inside crane systems." },
      { name: "Harmar AL435 Premium 3 Axis Inside Lift", desc: "Designed for integration with 3-axis inside lift systems." },
      { name: "Harmar AL435T Tailgater 3-Axis Truck Lift", desc: "Designed for integration with 3-axis truck lift systems." },
      { name: "Harmar AL425HD Axis II", desc: "Designed for integration with Axis II systems." },
      { name: "Harmar AL425 Axis II Lite", desc: "Designed for integration with Axis II Lite systems." },
      { name: "Harmar AL215 Axis I", desc: "Designed for integration with Axis I systems." },
      { name: "Bruno SPACE-SAVER ASL-325", desc: "Designed for integration with Space-Saver systems." },
      { name: "BraunAbility Chair Topper", desc: "Designed for integration with roof-mounted chair toppers." },
    ]
  },
  {
    title: "Seat Controllers / Transfer Seats",
    items: [
      { name: "BraunAbility Evo Driver Seat", desc: "Enables Smart Hub integration with powered driver transfer seats." },
      { name: "BraunAbility Evo Passenger Seat", desc: "Enables Smart Hub integration with powered passenger transfer seats." },
      { name: "BraunAbility Evo Passenger Seat II", desc: "Enables Smart Hub integration with powered passenger transfer seats." },
      { name: "Adapt Solutions Asento XL", desc: "Enables Smart Hub integration with Asento XL systems." },
      { name: "Adapt Solutions LINK", desc: "Enables Smart Hub integration with LINK transfer systems." },
      { name: "Glide N’ Go", desc: "Enables Smart Hub integration with Glide N' Go systems." },
      { name: "Sure-Grip LiftiBoi SideXSide", desc: "Enables Smart Hub integration with LiftiBoi systems." },
    ]
  },
  {
    title: "Toppers / Roof Systems",
    items: [
      { name: "Bruno Pow’r Topper", desc: "Structured integration for powered topper systems." },
      { name: "Access-A-Top Topper", desc: "Structured integration for powered topper systems." },
      { name: "Truck Bed Topper", desc: "Structured integration for powered truck bed access systems." },
    ]
  },
  {
    title: "Door / Lock / Base Lock Systems",
    items: [
      { name: "Q'Straint QLK Base Lock", desc: "Designed for automated locking and vehicle access systems." },
      { name: "EZLock Base Lock Controller", desc: "Designed for automated locking systems." },
      { name: "Dual Bus Doors (2 Relay)", desc: "Designed for automated door systems." },
      { name: "ATC Conversions 4 Relay", desc: "Designed for complex vehicle access systems." },
      { name: "Generic Conversion Van (3 Relay)", desc: "Designed for standard vehicle access systems." },
      { name: "Vehicle Door Actuators V1.1", desc: "Designed for automated vehicle door systems." },
    ]
  },
  {
    title: "Specialty / Utility",
    items: [
      { name: "WARN WINCH", desc: "Specialized integrations for utility winch systems." },
      { name: "ATC Mobility Silverado", desc: "Specialized integrations for Silverado conversions." },
      { name: "Truck/SUV Tailgate", desc: "Specialized integrations for automated tailgate systems." },
    ]
  }
];

export default function HarnessIntegration() {
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
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Hardware Integration</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Harness Integration
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              Purpose-built harness kits that connect adaptive equipment directly into the Adapy Smart Hub ecosystem.
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

      {/* Section 1: What it is */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Intelligent Equipment Integration</h2>
              <div className="space-y-4 text-lg text-black/60 leading-relaxed">
                <p>Harness kits interface between adaptive equipment and the Smart Hub, acting as intelligent signal passthrough interfaces.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0071e3] mt-1 shrink-0" />
                    <span>Preserve original pendant controls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0071e3] mt-1 shrink-0" />
                    <span>Enable monitoring and diagnostics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0071e3] mt-1 shrink-0" />
                    <span>Support multi-device installs in one vehicle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0071e3] mt-1 shrink-0" />
                    <span>Structured integration into the Adapy platform</span>
                  </li>
                </ul>
                <p className="text-sm italic pt-4">Clarification: Harness kits are signal passthrough integrations — not equipment replacements.</p>
              </div>
            </div>
            <div className="bg-black rounded-[2.5rem] p-8 flex items-center justify-center relative overflow-hidden aspect-square border-4 border-[#0071e3]/30 shadow-2xl">
              <img 
                src={hubWireframe} 
                alt="Harness Integration" 
                className="w-full h-full object-contain relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/10 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Designed for Seamless Integration</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Connect", desc: "Interfaces with supported equipment using structured harness pathways.", icon: <Zap /> },
              { title: "Route", desc: "Control signals pass through the Smart Hub while maintaining normal operation.", icon: <Settings /> },
              { title: "Monitor", desc: "System activity can be logged for visibility and diagnostics.", icon: <Activity /> },
              { title: "Extend", desc: "Optional cloud connectivity enables role-based dashboard visibility.", icon: <Cloud /> }
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

      {/* Section 3: Available Integrations */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Supported Equipment Integrations</h2>
          <div className="grid grid-cols-1 gap-16">
            {categories.map((cat, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#0071e3] rounded-full" />
                  {cat.title}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item, j) => (
                    <div key={j} className="bg-white p-6 rounded-2xl border border-black/5 hover:border-[#0071e3]/20 transition-all shadow-sm">
                      <h4 className="font-bold mb-2">{item.name}</h4>
                      <p className="text-sm text-black/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Multi-device installs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Built for Complex Adaptive Environments</h2>
          <p className="text-xl text-black/60 leading-relaxed mb-12">
            Many vehicles contain multiple adaptive systems. The Smart Hub supports multiple harness kits simultaneously, creating unified monitoring across lifts, seats, toppers, and door systems.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071e3]/5 rounded-full text-[#0071e3] font-bold">
            <CheckCircle2 className="w-5 h-5" />
            Structured installs improve scalability and service visibility.
          </div>
        </div>
      </section>

      {/* Section 5: Benefits */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Why Structured Integration Matters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: "Dealers", desc: "Cleaner installs. Centralized diagnostics. Simplified service workflows." },
              { role: "CDRS Professionals", desc: "Greater visibility. Improved confidence in equipment deployment." },
              { role: "Manufacturers", desc: "Platform-ready compatibility with structured integration pathways." },
              { role: "Fleet Operators", desc: "Unified monitoring across multiple adaptive systems and vehicles." }
            ].map((benefit, i) => (
              <div key={i} className="p-8 bg-white rounded-[2rem] border border-black/5 shadow-sm">
                <h4 className="text-[#0071e3] font-bold uppercase tracking-widest text-xs mb-4">{benefit.role}</h4>
                <p className="text-sm text-black/70 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Platform Connection */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Powered by the Adapy Smart Hub</h2>
          <p className="text-lg text-white/60 mb-12">
            Harness kits require the Smart Hub and operate as part of the broader Adapy ecosystem, delivering the connectivity your vehicle needs.
          </p>
          <Link href="/hardware/smart-hub">
            <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-[#0077ed] transition-all">
              View the Smart Hub <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 bg-white text-center border-t border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Integrate Your Equipment?</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact">
              <button className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-xl">
                Request a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-black/90 transition-all shadow-lg">
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
