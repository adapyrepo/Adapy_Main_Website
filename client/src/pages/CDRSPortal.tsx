import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { useState } from "react";
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
  ChevronDown,
  Layout,
  ShieldCheck,
  EyeOff,
  FileX,
  Hourglass,
  Clipboard,
  Stethoscope,
  ArrowRight,
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
  { id: 12, title: "Outcomes Dashboard", desc: "Caseload-wide comparison of mobility outcomes.", icon: <Layout /> },
];

export default function CDRSPortal() {
  useSEO({
    keywords: "CDRS, certified driver rehabilitation specialist, driver rehab software, occupational therapy driving evaluation, adaptive driving evaluation, ADED, driver rehabilitation program",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Adapy CDRS Portal",
      provider: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
      serviceType: "Software for Certified Driver Rehabilitation Specialists and Occupational Therapists",
      audience: { "@type": "BusinessAudience", audienceType: "CDRS, OTs, Driver Rehabilitation Programs" },
      areaServed: "United States",
      description: "Real-world driving data and equipment visibility for CDRS clinicians and OTs working with adaptive drivers.",
    },
    title: "CDRS Portal — Driver Rehab & Adaptive Driving Specialist Tools",
    description:
      "Occupational therapists and CDRS clinicians prescribe adaptive equipment with no visibility into how it's actually used. Adapy gives you objective outcomes data, justification packets, and progress tracking.",
    path: "/software/cdrs",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Software", path: "/" },
      { name: "CDRS Portal", path: "/software/cdrs" },
    ],
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const problemChapters = [
    {
      icon: <EyeOff className="w-7 h-7" />,
      eyebrow: "Chapter 01 — Zero Optics",
      title: "You prescribe the equipment. Then you go blind.",
      body: "An OT or CDRS spends hours evaluating a client, matching them to the right lift, the right transfer seat, the right control scheme. The day the vehicle leaves the bay, your visibility ends. You have no idea if the client is using the prescribed configuration, struggling with it, or quietly working around it. The clinical decision was yours — the outcome data isn't.",
      stat: "% of adaptive prescriptions with any post-delivery usage data flowing back to the prescribing clinician",
    },
    {
      icon: <FileX className="w-7 h-7" />,
      eyebrow: "Chapter 02 — Justification by Memory",
      title: "Funders want evidence. You're handing them a narrative.",
      body: "VR counselors, VA reviewers, and private payers all ask the same question: prove this equipment is medically necessary and being used. Today, the answer is a clinician letter built from intake notes and a phone call to the family. There's no objective usage log, no session count, no proof of independence delivered. Strong cases get denied because the documentation reads like advocacy instead of evidence.",
      stat: "Average hours per justification packet currently assembled by hand",
    },
    {
      icon: <Hourglass className="w-7 h-7" />,
      eyebrow: "Chapter 03 — Progress in the Dark",
      title: "Re-eval day is the first time you see what really happened.",
      body: "The patient comes back six months later and you find out — for the first time — that the lift has been failing twice a week, that they've stopped using the powered door entirely, that a family member has quietly become the operator. None of that should be a re-eval surprise. Tracking progress between visits is the difference between a coaching relationship and a one-shot prescription.",
      stat: "Months between scheduled re-evaluations for most adaptive driving clients",
    },
    {
      icon: <Clipboard className="w-7 h-7" />,
      eyebrow: "Chapter 04 — The Goal Sheet Goes Stale",
      title: "Treatment goals you can't measure aren't goals.",
      body: "\"Independent vehicle ingress 5 of 7 days.\" \"Successful lift operation without caregiver assist.\" These are the outcomes that matter — and the ones every clinician writes into a plan of care. But without instrumentation in the vehicle, you have no way to count, compare, or trend them. The goal sheet becomes a document, not a measurement.",
      stat: "% of OT-defined functional mobility goals currently tracked with objective data",
    },
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      eyebrow: "Chapter 05 — Safety Signals You Never See",
      title: "Near-misses don't show up in your chart.",
      body: "Repeated abnormal stops. Three failed attempts before a successful transfer. A lift that's been retried 40 times in a week. These are the early warning signs of a client whose situation is changing — physically, cognitively, or environmentally. Today they're invisible to the clinician who could intervene. They surface as an incident, an injury, or a 'why didn't I know' phone call from a family.",
      stat: "Average time between the first risk signal and the eventual safety event",
    },
    {
      icon: <Users className="w-7 h-7" />,
      eyebrow: "Chapter 06 — Cut Out of the Loop",
      title: "The dealer fixes it. You're the last to know.",
      body: "When equipment fails or gets reconfigured at the dealer, the prescribing clinician is rarely notified. Settings change. Components get swapped. The vehicle that comes back is no longer the one you prescribed — and the next time you see the client, you're working from outdated assumptions. A shared thread between clinician and dealer should be the floor, not the ceiling.",
      stat: "% of post-delivery service events communicated back to the prescribing clinician",
    },
  ];

  const solutionPoints = [
    {
      icon: <Activity className="w-8 h-8 text-[#0071e3]" />,
      title: "Objective usage data per client",
      desc: "Sessions, success rates, equipment uptime, and trend lines — pulled directly from the vehicle, not the family.",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#0071e3]" />,
      title: "Auto-assembled justification packets",
      desc: "VR, VA, and private-payer templates populated with the last 90 days of evidence. Edit the narrative, export the PDF.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#0071e3]" />,
      title: "Progress tracking between visits",
      desc: "Watch goals close, catch regressions early, and walk into re-eval day already knowing the story.",
    },
  ];

  const faqs = [
    {
      q: "Do my clients need to buy Adapy directly through me?",
      a: "No. Adapy is delivered through authorized mobility dealers. The clinician portal is a free clinical layer on top of any vehicle equipped with Adapy.",
    },
    {
      q: "Is the data HIPAA-handled?",
      a: "The portal is built for clinical use with appropriate access controls. We can walk your team through the security model on a demo call.",
    },
    {
      q: "Can I use the justification packets with the VA?",
      a: "Yes. The templates are designed to support VR, VA, and private-payer documentation requests. Most clinicians edit the auto-generated narrative before submitting.",
    },
    {
      q: "What if my client already has a vehicle I didn't prescribe?",
      a: "If the vehicle has Adapy installed, you can be added to that client's care team and start receiving outcomes data right away.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* HERO — problem first */}
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-[#0e0f12] to-[#1c1f24] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-6">
                For OTs &amp; Certified Driver Rehabilitation Specialists
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                You prescribed the equipment.
                <span className="block text-white/70">
                  Then you lost visibility.
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
                The day the vehicle leaves the evaluation bay, the data
                stops. You can&rsquo;t see whether your client is using
                what you prescribed, whether the equipment is failing,
                whether the goals you wrote into the plan of care are
                being met. You&rsquo;re flying blind until the next
                re-eval &mdash; and so is the funder writing the check.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2"
                    data-testid="button-hero-cta"
                  >
                    See What Visibility Looks Like
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/15 transition-all"
                    data-testid="button-hero-secondary"
                  >
                    Clinician Registration
                  </button>
                </Link>
              </div>

              <p className="text-sm text-white/50 mt-6">
                Free clinical portal for credentialed OTs and CDRS
                clinicians.
              </p>
            </motion.div>

            {/* HERO — clinician snapshot card */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              aria-hidden="true"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-[#0071e3]/20 blur-3xl rounded-[3rem] -z-10" />
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-[#0071e3]" />
                      </div>
                      <div>
                        <div className="h-2.5 w-24 bg-white/20 rounded-full mb-1.5" />
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-emerald-400 uppercase px-2.5 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                      On Track
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Independence", value: "92%", color: "text-emerald-400" },
                      { label: "Sessions", value: "47", color: "text-white" },
                      { label: "Goals Met", value: "5/6", color: "text-[#0071e3]" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <div className="text-[9px] font-bold tracking-[0.12em] text-white/40 uppercase mb-1.5">
                          {stat.label}
                        </div>
                        <div className={`text-xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                        90-Day Independence Trend
                      </span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 88, 92].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#0071e3]/60 to-[#0071e3]/30 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, label: "Lift cycles +24% MoM" },
                      { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, label: "Caregiver assist down 60%" },
                      { icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />, label: "Door retry rate ↑ — review" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/5"
                      >
                        {row.icon}
                        <span className="text-[11px] text-white/70 font-medium">
                          {row.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                    Single client snapshot &mdash; preview
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM NARRATIVE — six chapters (~70%) */}
      <section className="py-32 bg-[#15171b] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-20 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-4">
              The Clinical Reality
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Six gaps every adaptive driving clinician knows by heart.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              These aren&rsquo;t edge cases. They&rsquo;re the texture of
              practicing adaptive mobility without instrumentation in the
              vehicle.
            </p>
          </div>

          <div className="space-y-6">
            {problemChapters.map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06]"
                data-testid={`chapter-${i}`}
              >
                <div className="lg:col-span-2 flex lg:block items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center flex-shrink-0">
                    {chapter.icon}
                  </div>
                </div>
                <div className="lg:col-span-10">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
                    {chapter.eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-white/65 leading-relaxed text-base md:text-lg mb-5">
                    {chapter.body}
                  </p>
                  <p className="text-sm text-white/40 border-t border-white/10 pt-4">
                    {chapter.stat}{" "}
                    <span className="text-white/30">[source needed]</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION — three pillars (~20%) */}
      <section className="py-28 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              What Changes With Adapy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
              Three things that change clinical practice.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy doesn&rsquo;t change how you evaluate or prescribe.
              It adds the visibility and documentation layer that should
              have existed all along &mdash; so the prescription
              you&rsquo;re proudest of doesn&rsquo;t disappear into a
              data black hole the moment the keys are handed over.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutionPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 bg-white rounded-3xl border border-black/[0.05] shadow-sm"
              >
                <div className="mb-5">{point.icon}</div>
                <h3 className="text-lg font-bold text-black mb-3 leading-snug">
                  {point.title}
                </h3>
                <p className="text-black/60 leading-relaxed text-sm">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
                Caseload Command Center
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                One view of the equipment you&rsquo;ve prescribed.
              </h2>
            </div>
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
                <div className="col-span-12 grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 p-4 space-y-2">
                      <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
                      <div className="h-6 w-1/3 bg-[#0071e3]/10 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="col-span-8 bg-white rounded-3xl border border-slate-100 p-8 flex flex-col">
                  <div className="h-4 w-48 bg-slate-50 rounded-full mb-8" />
                  <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-slate-50">
                    {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#0071e3]/5 rounded-t-md" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                      caseload independence trend visualization
                    </span>
                  </div>
                </div>
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
              Interface preview &mdash; full clinician portal accessible
              via Adapy Pathways for CDRS
            </p>
          </div>
        </div>
      </section>

      {/* REPORTS GRID */}
      <section className="py-24 bg-[#f0f4f8]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-4">
              The Reports Funders Ask For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Twelve report types, every one defensible.
            </h2>
            <p className="text-lg text-black/60">
              Each report is built from real vehicle data, exportable as
              a PDF, and ready to drop into a funding packet or a
              progress note.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col"
                data-testid={`report-${report.id}`}
              >
                <div className="mb-4 p-3 bg-[#f0f4f8] rounded-xl w-fit text-[#0071e3]">
                  {report.icon}
                </div>
                <h3 className="font-bold mb-2 text-sm">{report.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">
                  {report.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#0071e3] uppercase">
                    Export Ready
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — friction removal before final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">
              Quick answers before you reach out.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#f5f5f7] rounded-2xl overflow-hidden border border-black/[0.05]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                  data-testid={`button-faq-${i}`}
                >
                  <span className="text-base font-bold text-black text-left">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0071e3] transition-transform flex-shrink-0 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-5 pt-0 border-t border-black/[0.05]">
                    <p className="text-black/70 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA (~10%) */}
      <section className="py-24 bg-[#0071e3] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <Stethoscope className="w-12 h-12 mx-auto mb-6 text-white/80" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stop prescribing into a black hole.
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Get the visibility, documentation, and progress data your
            clinical practice already deserves &mdash; and that your
            clients&rsquo; funders are increasingly going to require.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button
                className="px-10 py-5 bg-white text-[#0071e3] rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl"
                data-testid="button-final-demo"
              >
                Request a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button
                className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                data-testid="button-final-contact"
              >
                Talk to a Clinician Specialist
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
