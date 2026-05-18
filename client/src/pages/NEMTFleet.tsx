import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Activity,
  Thermometer,
  Wind,
  FileText,
  Gavel,
  Radio,
  DollarSign,
  Clock,
  MapPin,
  Navigation,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";

export default function NEMTFleet() {
  useSEO({
    title: "NEMT Fleet Safety & Wheelchair Van Monitoring Platform",
    description: "See invisible risks before they become incidents. Adapy delivers always-on wheelchair lift, ramp, CO, and cabin monitoring across your NEMT and paratransit fleet.",
    path: "/solutions/nemt",
    keywords: "NEMT software, non-emergency medical transportation, paratransit fleet management, wheelchair van fleet, NEMT safety, ADA paratransit, Medicaid transportation, wheelchair accessible fleet monitoring",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Adapy for NEMT and Paratransit Fleets",
        provider: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
        serviceType: "NEMT and paratransit fleet safety, monitoring, and lifecycle platform",
        audience: { "@type": "BusinessAudience", audienceType: "NEMT operators, paratransit agencies, brokerages" },
        areaServed: "United States",
        description: "Always-on monitoring for wheelchair lifts, ramps, cabin temperature, and carbon monoxide across NEMT and paratransit fleets.",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Does Adapy replace my existing NEMT software?", acceptedAnswer: { "@type": "Answer", text: "It can. Adapy is a complete NEMT platform that includes dispatch, scheduling, and billing — plus the in-vehicle monitoring layer your current software doesn't touch." } },
          { "@type": "Question", name: "What kinds of vehicles can Adapy monitor?", acceptedAnswer: { "@type": "Answer", text: "Any wheelchair-accessible NEMT vehicle equipped with adaptive mobility equipment such as lifts, ramps, or transfer seats." } },
          { "@type": "Question", name: "How is the data delivered?", acceptedAnswer: { "@type": "Answer", text: "A cloud dashboard with real-time alerts, historical telemetry, and exportable documentation for compliance, claims, and fleet management." } },
        ],
      },
    ],
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    fleet_size: "",
    wheelchair_vehicles: "",
    state: "",
    adaptive_equipment: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const required = [
      "first_name",
      "last_name",
      "company_name",
      "email",
      "phone",
      "fleet_size",
      "state",
    ] as const;
    const missing = required.filter((f) => !formData[f].trim());
    if (missing.length > 0) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");
    try {
      const apiKey =
        "5e225ecefc065d0e704f84c7c7a352f38c837ecc8fdb57204285cf6e166bc709";
      const response = await fetch(
        "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/fleet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Form-Api-Key": apiKey,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            _form_slug: "fleet",
            _api_key: apiKey,
            ...formData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitMessage(
        data.message || "Thank you! We will be in touch shortly.",
      );
      setSubmitSuccess(true);
      window.setTimeout(() => {
        window.location.href = data.redirect_url || "https://www.adapy.com";
      }, 2000);
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? "Network request failed. Please try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const problemChapters = [
    {
      icon: <Wind className="w-7 h-7" />,
      eyebrow: "Chapter 01 — The Invisible Gas",
      title:
        "Carbon monoxide builds up in the cabin. You won't see it until someone is hurt.",
      body: "Idling vehicles, exhaust leaks, faulty seals — none of it sets off a dispatch alert. CO is colorless and odorless. By the time a medically fragile passenger feels symptoms, the exposure has already happened, and there is no record to defend the trip.",
      stat: "% of NEMT cabins that exceed safe CO thresholds at least once a year",
    },
    {
      icon: <Activity className="w-7 h-7" />,
      eyebrow: "Chapter 02 — Lift Failure Mid-Route",
      title: "The lift jams between pickups. The route is already broken.",
      body: "A passenger is half-loaded. The driver is on the phone with dispatch. The next three trips slip. The hospital marks the patient as a no-show. The Medicaid trip won't bill. And the operator absorbs every minute of cascading cost.",
      stat: "Average revenue lost per mid-route lift failure",
    },
    {
      icon: <Thermometer className="w-7 h-7" />,
      eyebrow: "Chapter 03 — Temperature Extremes",
      title:
        "Medically fragile passengers don't tolerate cabin extremes.",
      body: "Wheelchair-bound passengers can't adjust their position, can't reach a vent, and often can't communicate distress quickly. Without continuous cabin temperature monitoring, an HVAC failure becomes a clinical event before anyone notices.",
      stat: "Cabin temperature variance recorded on a typical NEMT route in summer/winter",
    },
    {
      icon: <Gavel className="w-7 h-7" />,
      eyebrow: "Chapter 04 — Lawsuit Exposure",
      title: "When something goes wrong, you can't prove the vehicle was safe.",
      body: "Plaintiff counsel asks for cabin conditions, equipment usage, and pre-trip documentation. You hand over a manifest and a GPS breadcrumb. They hand the jury a story you can't counter. Settlements close because there is no data to fight with.",
      stat: "Median settlement value for NEMT in-cabin incident litigation",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      eyebrow: "Chapter 05 — Medicaid Clawbacks & Audit Failures",
      title: "Missing documentation = unbilled trips and recouped payments.",
      body: "When auditors arrive, every gap in trip-level evidence is a potential clawback. Equipment usage logs, environmental conditions, and incident timestamps that were never captured become invoices you have to pay back — months after the trip already ran.",
      stat: "Estimated annual Medicaid clawback exposure per 100 vehicles",
    },
    {
      icon: <Radio className="w-7 h-7" />,
      eyebrow: "Chapter 06 — Mid-Shift Chaos",
      title: "Problems surface mid-shift instead of during pre-trip.",
      body: "Battery voltage was trending low for three days. Nobody saw it. The vehicle dies in a parking lot at 11am with a passenger inside. Dispatch scrambles. Drivers reroute. Passengers wait. Every single one of those events was preventable with a single notification at 5am.",
      stat: "Share of breakdowns that were trending in telemetry 24+ hours prior",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      eyebrow: "Chapter 07 — The Compounding Cost",
      title: "One bad day costs more than a year of monitoring.",
      body: "Add it up: the lawsuit retainer, the lost trips, the Medicaid clawback, the insurance premium hike, the bad review, the driver who quits, the contract that doesn't renew. The math on prevention isn't close. The only question is whether you build the visibility before the bad day or after.",
      stat: "Cost ratio of one major incident to one year of fleet-wide monitoring",
    },
  ];

  const badDay = [
    {
      time: "5:42am",
      event:
        "Battery voltage dips below threshold on Vehicle 7. Nobody is watching the data. No alert is fired. Pre-trip inspection passes by sight.",
    },
    {
      time: "8:14am",
      event:
        "Driver picks up a dialysis patient. Cabin CO is climbing — small exhaust leak no one has tested for. Passenger reports a headache. Driver assumes nausea.",
    },
    {
      time: "10:37am",
      event:
        "Lift hesitates on the second drop-off. Driver muscles it through. No service ticket. No usage log. The next operator inherits a failing actuator and doesn't know it.",
    },
    {
      time: "1:08pm",
      event:
        "Vehicle dies in a clinic parking lot. Passenger waits 47 minutes for a backup. Patient's family files a complaint with the broker.",
    },
    {
      time: "Next Tuesday",
      event:
        "Medicaid auditor pulls trip records. There is no environmental data, no equipment usage log, no incident timeline. Three trips are clawed back.",
    },
    {
      time: "Six weeks later",
      event:
        "Letter from plaintiff's counsel. Headache became hospitalization. Discovery requests cabin conditions. You have nothing to send.",
    },
  ];

  const monitoringPoints = [
    {
      icon: <Wind className="w-7 h-7 text-[#0071e3]" />,
      title: "Cabin CO & temperature",
      desc: "Continuous environmental monitoring with real-time alerts before any passenger feels it.",
    },
    {
      icon: <Activity className="w-7 h-7 text-[#0071e3]" />,
      title: "Lift & adaptive equipment usage",
      desc: "Every cycle logged, every fault timestamped — defensible evidence and predictive maintenance in one feed.",
    },
    {
      icon: <FileText className="w-7 h-7 text-[#0071e3]" />,
      title: "Audit-ready documentation",
      desc: "Automated records for Medicaid audits, claims, and incident review — exportable, timestamped, complete.",
    },
  ];

  const faqs = [
    {
      q: "Does Adapy replace my existing NEMT software?",
      a: "It can. Adapy is a complete NEMT platform that includes dispatch, scheduling, and billing — plus the in-vehicle monitoring layer your current software doesn't touch.",
    },
    {
      q: "What kinds of vehicles can Adapy monitor?",
      a: "Any wheelchair-accessible NEMT vehicle equipped with adaptive mobility equipment such as lifts, ramps, or transfer seats.",
    },
    {
      q: "How is the data delivered?",
      a: "A cloud dashboard with real-time alerts, historical telemetry, and exportable documentation for compliance, claims, and fleet management.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-[#0e0f12] to-[#1c1f24] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-red-500 blur-[120px] rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">
                  In-Vehicle Safety Intelligence
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                The trip completed.
                <span className="block text-white/70">
                  Nobody knows what happened inside the cabin.
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
                Carbon monoxide. Lift failures. Cabin temperature. Battery
                health. The risks that hurt NEMT operators most are the
                ones traditional fleet software doesn't track — and
                can't document when an auditor or attorney asks.
              </p>

              <button
                data-testid="button-hero-demo"
                type="button"
                onClick={() => scrollToSection("form")}
                className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2 w-fit"
              >
                See What Your Fleet Is Missing
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-white/50 mt-6">
                A completed trip does not automatically mean a safe trip.
              </p>
            </motion.div>

            {/* HERO — live fleet map card */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              aria-hidden="true"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-[#0071e3]/20 blur-3xl rounded-[3rem] -z-10" />
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">
                        Live Fleet
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-white/50">
                      8 vehicles &middot; 1 alert
                    </span>
                  </div>

                  {/* Map */}
                  <div className="relative h-[280px] rounded-2xl bg-slate-950 border border-white/5 overflow-hidden mb-4">
                    {/* Grid background */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    {/* Roads */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 320 280"
                      fill="none"
                    >
                      <path
                        d="M0 90 Q 80 70, 160 110 T 320 130"
                        stroke="rgba(148,163,184,0.25)"
                        strokeWidth="14"
                      />
                      <path
                        d="M40 0 Q 60 80, 120 140 T 200 280"
                        stroke="rgba(148,163,184,0.18)"
                        strokeWidth="10"
                      />
                      <path
                        d="M0 220 Q 100 200, 180 230 T 320 210"
                        stroke="rgba(148,163,184,0.15)"
                        strokeWidth="8"
                      />
                      {/* Active route */}
                      <path
                        d="M50 180 Q 130 130, 230 90"
                        stroke="#0071e3"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />
                    </svg>
                    {/* Vehicle dots */}
                    {[
                      { x: "70%", y: "30%", color: "bg-[#0071e3]", active: true, label: "V-04" },
                      { x: "20%", y: "65%", color: "bg-emerald-400", active: false },
                      { x: "55%", y: "78%", color: "bg-emerald-400", active: false },
                      { x: "85%", y: "55%", color: "bg-amber-400", active: false },
                      { x: "32%", y: "22%", color: "bg-emerald-400", active: false },
                    ].map((v, i) => (
                      <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: v.x, top: v.y }}
                      >
                        {v.active && (
                          <div
                            className={`absolute inset-0 ${v.color} rounded-full opacity-30 animate-ping`}
                            style={{ width: 24, height: 24, left: -6, top: -6 }}
                          />
                        )}
                        <div
                          className={`relative w-3 h-3 ${v.color} rounded-full border-2 border-slate-950 shadow-lg`}
                        />
                        {v.label && (
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-white bg-[#0071e3] px-1.5 py-0.5 rounded whitespace-nowrap">
                            {v.label}
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Compass */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center">
                      <Navigation className="w-3.5 h-3.5 text-white/70" />
                    </div>
                  </div>

                  {/* Vehicle detail */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#0071e3]" />
                        <span className="text-[12px] font-bold text-white">
                          V-04 &mdash; en route
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                        Cabin OK
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      {[
                        { label: "CO", value: "0 ppm", color: "text-emerald-400" },
                        { label: "Cabin", value: "71°F", color: "text-white" },
                        { label: "Lift", value: "Stowed", color: "text-white" },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="text-center p-1.5 rounded-lg bg-white/[0.03]"
                        >
                          <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-0.5">
                            {s.label}
                          </div>
                          <div className={`font-bold ${s.color}`}>
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase flex items-center justify-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    Live fleet view &mdash; preview
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#15171b] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-20 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-4">
              The Hidden Cost Layer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Seven invisible risks every NEMT operator carries.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              Traditional NEMT software stops at dispatch and billing.
              Everything that happens inside the vehicle — the part that
              creates real liability — runs unmonitored.
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
              >
                <div className="lg:col-span-2">
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

      <section className="py-32 bg-[#1c1f24] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-red-400 uppercase block mb-4">
              Anatomy of a Bad Day
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              How invisible problems become a six-figure incident.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              One realistic timeline. Every step preventable with the
              right alert at the right minute.
            </p>
          </div>

          <div className="relative pl-6 md:pl-10 border-l border-white/10 space-y-10">
            {badDay.map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-[34px] md:-left-[44px] top-1 w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-500/15" />
                <div className="text-sm font-bold tracking-wider text-red-400 uppercase mb-2">
                  {moment.time}
                </div>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  {moment.event}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.03]">
            <p className="text-white/70 leading-relaxed text-lg">
              By Tuesday, none of this is recoverable. By the time the
              letter arrives, the cost is six figures and climbing. Every
              step in this timeline was visible in telemetry — or would
              have been, with cabin and equipment monitoring active.
            </p>
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              What We Monitor & Why It Matters
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
              Three things that change the math on a bad day.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy adds the in-cabin and equipment layer your current
              NEMT software is missing. Same dispatch, same billing — plus
              the visibility that wins audits, defends claims, and
              prevents the incident in the first place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monitoringPoints.map((point, i) => (
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
                  data-testid={`button-faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
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

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-3xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-1">
                The next bad day is already on its way.
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Tell us about your fleet. We'll show you the
                monitoring layer that prevents the incident — and
                documents the trip when prevention isn't enough.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">
              Request a demo.
            </h2>
            <p className="text-base text-black/60">
              Our team will follow up within 24 hours.
            </p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-10 border border-black/[0.05]">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#0071e3]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Demo request received.
                </h3>
                <p className="text-black/60 text-base mb-6">
                  {submitMessage ||
                    "Our team will review your request and be in touch within 24 hours."}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      First Name *
                    </label>
                    <input
                      data-testid="input-first-name"
                      type="text"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={(e) =>
                        handleFormChange("first_name", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Last Name *
                    </label>
                    <input
                      data-testid="input-last-name"
                      type="text"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleFormChange("last_name", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Company Name *
                  </label>
                  <input
                    data-testid="input-company"
                    type="text"
                    placeholder="Company Name"
                    value={formData.company_name}
                    onChange={(e) =>
                      handleFormChange("company_name", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Email *
                    </label>
                    <input
                      data-testid="input-email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Phone *
                    </label>
                    <input
                      data-testid="input-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        handleFormChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Fleet Size *
                    </label>
                    <input
                      data-testid="input-fleet-size"
                      type="text"
                      placeholder="# of vehicles"
                      value={formData.fleet_size}
                      onChange={(e) =>
                        handleFormChange("fleet_size", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Wheelchair Vehicles
                    </label>
                    <input
                      data-testid="input-wheelchair-vehicles"
                      type="text"
                      placeholder="# wheelchair accessible"
                      value={formData.wheelchair_vehicles}
                      onChange={(e) =>
                        handleFormChange(
                          "wheelchair_vehicles",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      State *
                    </label>
                    <input
                      data-testid="input-state"
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        handleFormChange("state", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    data-testid="textarea-notes"
                    value={formData.adaptive_equipment}
                    onChange={(e) =>
                      handleFormChange(
                        "adaptive_equipment",
                        e.target.value,
                      )
                    }
                    placeholder="Tell us about your fleet, current challenges, or questions..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white min-h-[100px]"
                  />
                </div>
                <button
                  data-testid="button-submit-nemt"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request a Demo"
                  )}
                </button>
                {submitError && (
                  <p
                    data-testid="text-submit-error"
                    className="text-sm text-red-600 text-center"
                  >
                    {submitError}
                  </p>
                )}
                <p className="text-center text-black/50 text-sm">
                  ✓ Your information is kept confidential.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
