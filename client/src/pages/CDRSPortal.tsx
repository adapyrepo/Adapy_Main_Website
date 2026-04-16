import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { 
  ClipboardCheck, 
  Activity, 
  TrendingUp, 
  Map, 
  GraduationCap, 
  AlertTriangle, 
  History, 
  FileText, 
  Users, 
  CheckCircle2,
  ChevronRight,
  BarChart,
  Layout,
  ShieldCheck
} from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const reports = [
  { id: 1, title: "Independence Uptime", desc: "Track successful access/egress sessions vs missed days.", icon: <TrendingUp /> },
  { id: 2, title: "Accessibility Success", desc: "Success/failure rate by equipment type (lift, seat, door).", icon: <CheckCircle2 /> },
  { id: 3, title: "Utilization Heatmap", desc: "Sessions by hour and day to identify participation windows.", icon: <Activity /> },
  { id: 4, title: "Community Participation", desc: "Out-of-home session patterns and activity day proxies.", icon: <Map /> },
  { id: 5, title: "Training & Competency", desc: "Post-training milestone success and skill certification.", icon: <GraduationCap /> },
  { id: 6, title: "Safety Risk Signals", desc: "Identify abnormal stop events and unusual session retries.", icon: <AlertTriangle /> },
  { id: 7, title: "Maintenance Impact", desc: "Correlate service completion with improved success rates.", icon: <History /> },
  { id: 8, title: "Prescription Adherence", desc: "Compare prescribed settings to actual usage patterns.", icon: <ClipboardCheck /> },
  { id: 9, title: "Funding / VR Packet", desc: "Auto-assembled justification packets for payers.", icon: <FileText /> },
  { id: 10, title: "Warranty Evidence", desc: "Timeline of failures and diagnostics to support claims.", icon: <ShieldCheck /> },
  { id: 11, title: "Caregiver Burden", desc: "Correlation between independence and assist reduction.", icon: <Users /> },
  { id: 12, title: "Outcomes Dashboard", desc: "Caseload-wide comparison of mobility outcomes.", icon: <Layout /> }
];

export default function CDRSPortal() {
  useSEO({ title: "CDRS Portal — Visibility for Driving Rehab Specialists", description: "Real visibility into how your clients use their adaptive equipment after the prescription — built for CDRS clinicians and OT specialists.", path: "/software/cdrs" });
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f0f4f8]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Adapy Clinician Portal</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              CDRS Portal
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              Objective, defensible outcomes data for the modern Driver Rehabilitation Specialist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                  Request a Demo
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-black/90 transition-all shadow-lg">
                  Clinician Registration
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Caseload Preview Section (Placeholders) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Caseload Command Center</h2>
            {/* Dashboard Mockup */}
            <div className="aspect-[16/10] bg-[#f8fafc] rounded-[2.5rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-14 bg-white border-b border-slate-100 flex items-center px-8 gap-6">
                <div className="w-6 h-6 bg-[#0071e3]/10 rounded flex items-center justify-center">
                  <Layout className="w-3.5 h-3.5 text-[#0071e3]" />
                </div>
                <div className="h-3 w-24 bg-slate-100 rounded-full" />
                <div className="h-3 w-24 bg-slate-100 rounded-full" />
                <div className="ml-auto flex gap-3">
                  <div className="h-7 w-20 bg-[#0071e3]/5 rounded-full" />
                  <div className="h-7 w-7 bg-slate-100 rounded-full" />
                </div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                {/* Stats Tiles */}
                <div className="col-span-12 grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 p-4 space-y-2">
                      <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
                      <div className="h-6 w-1/3 bg-[#0071e3]/10 rounded-full" />
                    </div>
                  ))}
                </div>
                {/* Main Graph Area */}
                <div className="col-span-8 bg-white rounded-3xl border border-slate-100 p-8 flex flex-col">
                  <div className="h-4 w-48 bg-slate-50 rounded-full mb-8" />
                  <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-slate-50">
                    {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#0071e3]/5 rounded-t-md" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">caseload independence trend visualization</span>
                  </div>
                </div>
                {/* Sidebar Alerts */}
                <div className="col-span-4 space-y-4">
                  <div className="h-4 w-32 bg-slate-50 rounded-full mb-2" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-full bg-slate-50 rounded-full" />
                        <div className="h-2 w-2/3 bg-slate-50/50 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
              Interface Preview — Full Clinician Portal accessible via Adapy Pathways for CDRS
            </p>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-24 bg-[#f0f4f8]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Objective Clinician Reporting</h2>
            <p className="text-xl text-black/60">
              A comprehensive suite of reports designed to support clinical decision-making and funding justification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reports.map((report) => (
              <motion.div 
                key={report.id}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col"
              >
                <div className="mb-4 p-3 bg-[#f0f4f8] rounded-xl w-fit text-[#0071e3]">
                  {report.icon}
                </div>
                <h3 className="font-bold mb-2 text-sm">{report.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{report.desc}</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#0071e3] uppercase">Export Ready</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-32">
            {/* Documentation Builder */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Documentation</span>
                <h2 className="text-3xl font-bold mb-6">Payer-Ready Packets</h2>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Auto-assemble medical necessity support letters and VR/VA justification packets. The system pulls objective KPIs and charts from the last 90 days to provide defensible evidence for your prescriptions.
                </p>
                <ul className="space-y-4">
                  {[
                    "Standardized VR/VA templates",
                    "Automated outcome data injection",
                    "Clinician narrative editor",
                    "Caseload-wide progress tracking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-black/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#0071e3]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square bg-[#f0f4f8] rounded-[3rem] p-12 flex items-center justify-center border border-slate-100">
                <FileText className="w-32 h-32 text-[#0071e3]/20" />
              </div>
            </div>

            {/* Dealer Collaboration */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 aspect-square bg-[#1a202c] rounded-[3rem] p-12 flex flex-col justify-center border border-slate-800 relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="h-2 w-24 bg-[#0071e3] rounded-full" />
                  <div className="h-8 w-full bg-white/5 rounded-xl border border-white/10" />
                  <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/10" />
                  <div className="flex justify-end gap-3 pt-4">
                    <div className="h-10 w-32 bg-[#0071e3] rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-[#0071e3] font-bold uppercase tracking-widest text-xs block mb-4">Collaboration</span>
                <h2 className="text-3xl font-bold mb-6">Dealer Connectivity</h2>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Collaborate with mobility dealers without chasing people. Create service requests tied to patient evidence and track progress from "Sent" to "Verified" outcome.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0071e3]/5 rounded-full text-[#0071e3] text-sm font-bold">
                  <Users className="w-4 h-4" />
                  Secure shared report links for funding agencies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0071e3] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-8">Objective Data for Better Outcomes</h2>
          <p className="text-xl text-white/80 mb-12">
            Join the community of CDRS professionals using Adapy to deliver defensible, data-driven mobility solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-10 py-5 bg-white text-[#0071e3] rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl">
                Request a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Contact Specialist
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
