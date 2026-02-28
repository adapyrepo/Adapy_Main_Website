import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  Truck, 
  ShieldAlert, 
  Activity, 
  Wrench, 
  Map, 
  BarChart3, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Clock,
  Battery,
  ChevronRight,
  Zap,
  ShieldCheck
} from "lucide-react";

const fleetFeatures = [
  {
    title: "Equipment-Aware Telematics",
    description: "Real-time visibility into lift cycle counts, interrupted sessions, and equipment-level fault codes.",
    icon: <Activity className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Passenger Safety Alerts",
    description: "Instant notification for equipment failure during loading/unloading or critical overcurrent events.",
    icon: <ShieldAlert className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Incident Reconstruction",
    description: "Detailed timestamped reports of equipment state and vehicle telemetry during safety events.",
    icon: <FileText className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Preventive Maintenance",
    description: "Automated service triggers based on actual lift cycles and runtime, not just odometer readings.",
    icon: <Wrench className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Risk-Based Monitoring",
    description: "Identify high-risk idle scenarios, battery irregularities, and after-hours vehicle activity.",
    icon: <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
  },
  {
    title: "Fleet Reliability Analytics",
    description: "Compare equipment performance across your fleet and forecast lifecycle maintenance needs.",
    icon: <BarChart3 className="w-6 h-6 text-[#0071e3]" />
  }
];

export default function NEMTFleet() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f8fafc]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Mobility Fleet Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              NEMT & Fleet Services
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              Advanced adaptive-equipment-aware safety monitoring for wheelchair-accessible NEMT fleets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                  Request a Demo
                </button>
              </Link>
              <Link href="/platform">
                <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-black/90 transition-all shadow-lg">
                  Explore the Platform
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fleet Command Center Preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Fleet Command Center</h2>
            {/* Dashboard Mockup */}
            <div className="aspect-[16/10] bg-[#0f172a] rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-8 gap-6">
                <div className="w-6 h-6 bg-[#0071e3] rounded flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="h-3 w-32 bg-slate-800 rounded-full" />
                <div className="ml-auto flex gap-3">
                  <div className="h-8 w-24 bg-[#0071e3]/20 border border-[#0071e3]/30 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#0071e3]">LIVE FLEET</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                {/* Stats */}
                <div className="col-span-12 grid grid-cols-4 gap-4">
                  {[
                    { label: "Vehicles Online", val: "24/25", color: "text-green-400" },
                    { label: "Critical Faults", val: "02", color: "text-red-400" },
                    { label: "Idling Alerts", val: "05", color: "text-orange-400" },
                    { label: "Lift Cycles Today", val: "142", color: "text-blue-400" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{stat.label}</div>
                      <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.val}</div>
                    </div>
                  ))}
                </div>
                {/* Map Placeholder */}
                <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10">
                    <Map className="w-full h-full p-12" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest relative z-10">Active Fleet Map Visualization</span>
                </div>
                {/* Sidebar Alerts */}
                <div className="col-span-4 space-y-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Priority Safety Alerts</div>
                  {[
                    { type: "Lift Stall", vehicle: "V-102", time: "2m ago" },
                    { type: "Idle Limit", vehicle: "V-205", time: "15m ago" },
                    { type: "Low Voltage", vehicle: "V-118", time: "1h ago" }
                  ].map((alert, i) => (
                    <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white">{alert.type}</div>
                        <div className="text-[10px] text-slate-500">{alert.vehicle}</div>
                      </div>
                      <div className="text-[10px] text-slate-600">{alert.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobility Specific Safety Features */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mobility-Specific Safety Intelligence</h2>
            <p className="text-xl text-black/60">
              Go beyond generic GPS tracking. Monitor the equipment that matters for passenger safety and operational compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
              >
                <div className="mb-6 p-3 bg-slate-50 rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Awareness Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Equipment Intelligence</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Total Visibility into Every Mobility Cycle</h2>
              <p className="text-lg text-black/60 mb-8 leading-relaxed">
                Adapy monitors the actual usage sessions of lifts, ramps, and securement systems. Detect malfunctions before they result in passenger injury or vehicle downtime.
              </p>
              <div className="space-y-4">
                {[
                  "Lift cycle count & runtime tracking",
                  "Interrupted cycle & stall detection",
                  "Battery & voltage health monitoring",
                  "Automated safety escalation routing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#0071e3]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black rounded-[3rem] p-12 text-white relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#0071e3] rounded-xl">
                     <Activity className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Active Lift Session</div>
                     <div className="text-lg font-bold">V-104 Deploying</div>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-white/40 uppercase">Cycle Success Rate</span>
                     <span className="text-[#0071e3]">99.2%</span>
                   </div>
                   <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: "99.2%" }}
                       className="h-full bg-[#0071e3]"
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Total Cycles</div>
                     <div className="text-xl font-mono font-bold">1,482</div>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Health</div>
                     <div className="text-xl font-mono font-bold text-green-400">OPTIMAL</div>
                   </div>
                 </div>
               </div>
               <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#0071e3] blur-[100px] rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident & Defensibility */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Risk Management</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Defensible Incident Documentation</h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            Protect your fleet with timestamped evidence. Our Incident Reconstruction Reports provide a detailed snapshot of equipment state, telemetry, and diagnostic history during any safety event.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <Clock className="w-8 h-8 text-[#0071e3] mx-auto mb-4" />
              <div className="font-bold mb-2">Telemetry History</div>
              <p className="text-sm text-white/40">Vehicle state leading up to the event.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <Zap className="w-8 h-8 text-[#0071e3] mx-auto mb-4" />
              <div className="font-bold mb-2">Equipment Logs</div>
              <p className="text-sm text-white/40">Specific relay and sensor states.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <ShieldCheck className="w-8 h-8 text-[#0071e3] mx-auto mb-4" />
              <div className="font-bold mb-2">Maintenance Proof</div>
              <p className="text-sm text-white/40">Verified service history for the device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Compliance & Analytics Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Fleet Safety Overview Report",
               "High-Risk Vehicles Analysis",
               "Lift Usage & Cycle Counts",
               "Idle Time & Risk Heatmaps",
               "Fault Code Frequency Report",
               "Maintenance Compliance Audit",
               "Warranty Evidence Timeline",
               "Equipment Reliability Forecast"
             ].map((report, i) => (
               <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-[#0071e3]/30 transition-all group">
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-[#0071e3]/10 transition-colors">
                     <FileText className="w-4 h-4 text-slate-400 group-hover:text-[#0071e3]" />
                   </div>
                   <span className="font-medium text-slate-700">{report}</span>
                 </div>
                 <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">PDF + CSV</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0071e3] text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">Deploy the Industry's Most Advanced Mobility Fleet Platform</h2>
          <p className="text-xl text-white/80 mb-12">
            Contact our fleet services team to discover how equipment-aware monitoring can transform your passenger safety and operational efficiency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-10 py-5 bg-white text-[#0071e3] rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl">
                Request a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Contact Fleet Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
