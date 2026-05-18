import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Activity, 
  AlertCircle, 
  ClipboardList, 
  Settings, 
  BarChart3, 
  FileText, 
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Clock,
  Wrench
} from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const features = [
  {
    title: "Real-Time Equipment Data",
    description: "Live connectivity status and operational telemetry from every Adapy-connected vehicle in your fleet.",
    icon: <Activity className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Automated Maintenance Alerts",
    description: "Proactive notifications based on cycle counts, runtime, or diagnostic fault codes.",
    icon: <AlertCircle className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Warranty Justification",
    description: "One-click PDF reports combining session logs and diagnostics to streamline warranty claims.",
    icon: <FileText className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Remote Troubleshooting",
    description: "View real-time relay states and sensor readings to diagnose issues without a truck roll.",
    icon: <Wrench className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Fleet-Wide Analytics",
    description: "Identify service opportunities and track equipment reliability across your entire customer base.",
    icon: <BarChart3 className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "VA & Voc-Rehab Friendly",
    description: "Standardized reporting packets designed to meet the rigorous documentation needs of funding sources.",
    icon: <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
  }
];

export default function DealerDashboard() {
  useSEO({
    title: "Dealer Dashboard — Wheelchair Van Diagnostics & Warranty Data",
    description: "A single dashboard for every wheelchair accessible vehicle install, diagnostic event, and warranty case across your mobility dealership.",
    path: "/software/dealer",
    keywords: "mobility dealer dashboard, wheelchair van warranty software, adaptive equipment diagnostics, mobility dealership tools, wheelchair lift service tracking",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Adapy Dealer Dashboard",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Fleet-wide diagnostic, warranty, and lifecycle management dashboard for wheelchair accessible vehicle dealerships.",
      url: "https://adapy.com/software/dealer",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    },
  });
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f5f5f7]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Adapy Pathways</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Dealer Dashboard
              </h1>
              <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed max-w-2xl mx-auto">
                Turn equipment data into maintenance revenue with the industry's first connected service platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                    Request a Demo
                  </button>
                </Link>
                <a href="https://admin.adapy.com" target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-black/90 transition-all shadow-lg">
                    Dealer Login
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section (Placeholders) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            {/* Main Dashboard Placeholder */}
            <div className="aspect-[16/10] bg-[#f5f5f7] rounded-[2.5rem] border border-black/5 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-16 bg-white border-b border-black/5 flex items-center px-8 gap-4">
                <div className="w-8 h-8 bg-[#0071e3]/10 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-[#0071e3]" />
                </div>
                <div className="h-4 w-32 bg-black/5 rounded-full" />
                <div className="ml-auto flex gap-4">
                  <div className="h-8 w-8 bg-black/5 rounded-full" />
                  <div className="h-8 w-24 bg-black/5 rounded-full" />
                </div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-4 gap-6">
                <div className="col-span-1 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 bg-white rounded-xl border border-black/5" />
                  ))}
                </div>
                <div className="col-span-3 space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-white rounded-2xl border border-black/5 p-6 space-y-3">
                        <div className="h-4 w-1/2 bg-black/5 rounded-full" />
                        <div className="h-8 w-3/4 bg-black/10 rounded-full" />
                      </div>
                    ))}
                  </div>
                  <div className="h-64 bg-white rounded-3xl border border-black/5 flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder for Analytics Chart */}
                    <div className="absolute inset-0 flex items-end px-12 pb-12 gap-4">
                       {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                         <div key={i} className="flex-1 bg-[#0071e3]/10 rounded-t-lg" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                    <span className="relative z-10 text-sm font-bold text-black/20 uppercase tracking-widest">Analytics Visualization Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay Caption */}
            <div className="mt-12 text-center">
              <p className="text-black/40 text-sm font-medium uppercase tracking-widest">
                Interface Preview — Full Dashboard accessible via Dealer Portal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Powerful Command Center for Your Service Department</h2>
            <p className="text-xl text-black/60">
              Stop waiting for customers to call with broken equipment. Use real-time data to drive proactive service revenue.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] bg-white border border-black/5 shadow-sm"
              >
                <div className="mb-6 p-3 bg-[#f5f5f7] rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-32">
            {/* Automated Maintenance */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Automation</span>
                <h2 className="text-3xl font-bold mb-6">Automated Maintenance Alerts</h2>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  The dashboard monitors cycle counts and runtime across your fleet. When equipment hits a service threshold, a ticket is automatically generated and routed to your service manager.
                </p>
                <ul className="space-y-4">
                  {[
                    "Customizable cycle count triggers",
                    "Time-since-service reminders",
                    "Diagnostic fault code alerts",
                    "Battery health monitoring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-black/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#0071e3]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square bg-[#f5f5f7] rounded-[3rem] p-12 flex items-center justify-center border border-black/5">
                <div className="w-full space-y-4">
                  <div className="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-4 mb-2">
                      <AlertCircle className="text-orange-500 w-5 h-5" />
                      <span className="font-bold text-sm">Maintenance Overdue</span>
                    </div>
                    <div className="h-4 w-3/4 bg-black/5 rounded-full" />
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm opacity-50">
                    <div className="flex items-center gap-4 mb-2">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                      <span className="font-bold text-sm">System Normal</span>
                    </div>
                    <div className="h-4 w-1/2 bg-black/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Remote Troubleshooting */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 aspect-square bg-black rounded-[3rem] p-12 flex flex-col justify-center border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/10">
                  <Settings className="w-32 h-32 animate-spin-slow" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="h-2 w-24 bg-[#0071e3] rounded-full" />
                  <div className="h-8 w-full bg-white/10 rounded-xl" />
                  <div className="h-8 w-2/3 bg-white/10 rounded-xl" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-12 bg-[#0071e3] rounded-xl flex items-center justify-center font-bold text-white text-xs">RUN DIAGNOSTICS</div>
                    <div className="h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-bold text-white text-xs">PING HUB</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Diagnostics</span>
                <h2 className="text-3xl font-bold mb-6">Remote Troubleshooting</h2>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Reduce unbillable truck rolls by seeing exactly what's happening before you arrive. Access live relay states, sensor readings, and fault logs remotely.
                </p>
                <div className="flex items-center gap-4 p-6 bg-[#f5f5f7] rounded-2xl">
                  <div className="p-3 bg-white rounded-xl">
                    <Clock className="w-6 h-6 text-[#0071e3]" />
                  </div>
                  <p className="text-sm font-medium">Reduce diagnostic time by up to 40% with pre-arrival visibility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Documentation. Built In.</h2>
            <p className="text-xl text-white/60">Standardized reports for every stakeholder in the mobility ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Warranty Justification", desc: "Standardized PDF exports containing fault logs and cycle counts to validate claims." },
              { title: "Service History", desc: "Complete equipment-level logs of all maintenance, parts, and remote actions." },
              { title: "Funding Packets", desc: "Data-driven proof of usage and reliability for VA and Voc-Rehab funding." }
            ].map((report, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                <FileText className="w-10 h-10 text-[#0071e3] mb-6" />
                <h3 className="text-xl font-bold mb-3">{report.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{report.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0071e3] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-8">Ready to Modernize Your Service Department?</h2>
          <p className="text-xl text-white/80 mb-12">
            Join the network of adaptive mobility dealers using Adapy Pathways to drive efficiency and revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-10 py-5 bg-white text-[#0071e3] rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl">
                Request a Demo
              </button>
            </Link>
            <a href="https://admin.adapy.com" target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Dealer Login
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
