import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  FileWarning,
  Search,
  UserX,
  TrendingDown,
  Clock,
  FileStack,
  BarChart3,
  ShieldCheck,
  Bell,
  LayoutDashboard,
  FileCheck,
  AlertCircle,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { MhmdaNotice } from "@/components/MhmdaNotice";

export default function DealerFunnel() {
  useSEO({ title: "Software for Mobility Dealers — Stop Eating Warranty Disputes", description: "Adapy gives mobility dealers the diagnostic data, warranty evidence, and lifecycle visibility to stop losing margin to invisible failures.", path: "/dealer-funnel" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    city: "",
    state: "",
    country: "",
    situation: "",
    adaptive_equipment: "",
  });
  const [mhmdaConsent, setMhmdaConsent] = useState(false);
  const [mhmdaConsentAt, setMhmdaConsentAt] = useState<string>("");

  const isWashingtonResident = /^(wa|washington)$/i.test(
    formData.state.trim(),
  );

  const handleConsentChange = (checked: boolean) => {
    setMhmdaConsent(checked);
    setMhmdaConsentAt(checked ? new Date().toISOString() : "");
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const required = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "company_name",
      "city",
      "state",
      "country",
      "situation",
    ] as const;
    const missing = required.filter((f) => !formData[f].trim());
    if (missing.length > 0) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    if (isWashingtonResident && !mhmdaConsent) {
      setSubmitError(
        "Please review and accept the Washington consumer health data notice to continue.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");
    try {
      const response = await fetch(
        "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/qualify-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            _form_slug: "qualify-form",
            _api_key:
              "31e0c85a9c7850bd625cf2df0348df3ecfc08ae984eeb623940887763ed9445d",
            ...formData,
            mhmda_consent: mhmdaConsent,
            mhmda_consent_at: mhmdaConsentAt || null,
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

  // Problem chapters drawn from real dealer pain.
  const problemChapters = [
    {
      icon: <FileWarning className="w-7 h-7" />,
      eyebrow: "Chapter 01 — Warranty Disputes",
      title: "You can't win a warranty fight without data.",
      body: "The lift fails. The customer is upset. You file the claim. The manufacturer asks, in writing, for proof the equipment was used within spec. You don't have it. No one does. The claim is denied — and you eat the part, the labor, and the relationship.",
      stat: "% of adaptive equipment warranty claims rejected for insufficient documentation",
    },
    {
      icon: <Search className="w-7 h-7" />,
      eyebrow: "Chapter 02 — Blind Diagnostics",
      title: "Every service call starts from zero.",
      body: "Your tech rolls a truck to a customer's driveway with no telemetry, no failure history, no idea what the equipment was doing 10 minutes before it stopped. They open the panel and start guessing. The customer watches the bill grow.",
      stat: "Average minutes per service visit spent reproducing the failure",
    },
    {
      icon: <UserX className="w-7 h-7" />,
      eyebrow: "Chapter 03 — The Blame Lands on You",
      title: "Customers blame the dealer for hardware you never touched.",
      body: "A pendant from a third-party manufacturer fails. A cable shorted out before the customer ever bought the vehicle. None of it was your install — but you sold them the system, so you own the problem. Without telemetry, you can't even prove what you didn't do.",
      stat: "Share of negative dealer reviews tied to third-party component failures",
    },
    {
      icon: <TrendingDown className="w-7 h-7" />,
      eyebrow: "Chapter 04 — Revenue You Can't See",
      title: "You have no idea what's installed across your customer base.",
      body: "Service contracts you could be selling. Aging equipment that should be replaced. Funding cycles closing in two months. Cross-sell opportunities sitting in vehicles you serviced last year. None of it is visible — so none of it gets quoted.",
      stat: "Estimated annual upsell revenue lost per dealer due to lack of installed-base visibility",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      eyebrow: "Chapter 05 — Reactive Service",
      title: "You hear about the problem when the customer is already stranded.",
      body: "There is no preventive trigger. No usage threshold that pushes a service reminder. No motor-current trend line. The first time you learn something is wrong is when the phone rings — and by then the customer is in a parking lot, already angry. Auto-pilot maintenance push notifications would change the entire service economics of your shop.",
      stat: "Cost difference between proactive and reactive service per incident",
    },
    {
      icon: <FileStack className="w-7 h-7" />,
      eyebrow: "Chapter 06 — Documentation Chaos",
      title: "Every install is bespoke. Every warranty packet is manual.",
      body: "Photographs in someone's phone. Install notes on paper. VA and Voc-Rehab justification rebuilt from scratch every time. Your team spends hours assembling packets that should generate themselves — and the funding agencies still ask for more.",
      stat: "Hours per warranty/funding packet without standardized reporting",
    },
  ];

  const solutionPoints = [
    {
      icon: <BarChart3 className="w-8 h-8 text-[#0071e3]" />,
      title: "A live picture of your installed base",
      desc: "Every Adapy-connected vehicle in one dashboard — telemetry, cycle counts, fault history, and service triggers across your entire customer base.",
    },
    {
      icon: <Bell className="w-8 h-8 text-[#0071e3]" />,
      title: "Auto-pilot maintenance alerts",
      desc: "Push notifications fire on usage thresholds and diagnostic codes — so service is something you sell ahead of, not react to.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#0071e3]" />,
      title: "One-click warranty & funding packets",
      desc: "Standardized PDF reports built for manufacturer warranty disputes and VA / Voc-Rehab / Workforce Services justification.",
    },
  ];

  const faqs = [
    {
      q: "How does Adapy help with warranty disputes?",
      a: "Every Adapy-connected device generates a usage and diagnostic record. When a manufacturer asks for proof of fault or proper use, you export a standardized packet in seconds — no manual assembly, no missing data.",
    },
    {
      q: "Do you provide dealer onboarding?",
      a: "Yes. We provide onboarding, training, and ongoing support so your sales and service teams can sell, install, and support Adapy with confidence.",
    },
    {
      q: "What happens after I request access?",
      a: "Our dealer partnerships team will contact you within 24 hours to confirm your application, walk through the platform, and outline the onboarding path.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* HERO — dealer pain, not growth pitch */}
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
                For Mobility Dealers
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                The warranty was denied.
                <span className="block text-white/70">
                  And it&rsquo;s your problem now.
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
                The manufacturer wanted usage data. You didn&rsquo;t have
                it. The customer wants to know why their lift failed. You
                can&rsquo;t tell them. You&rsquo;ve eaten the part, the
                labor, and the review — and the next claim is already
                opening.
              </p>

              <button
                onClick={() => scrollToSection("form")}
                className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2 w-fit"
                data-testid="button-hero-cta"
              >
                See How Adapy Changes That
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-white/50 mt-6">
                Currently onboarding a limited number of dealer partners.
              </p>
            </motion.div>

            {/* HERO — warranty evidence packet card */}
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
                  <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/10">
                    <div>
                      <div className="text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase">
                        Warranty Claim
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        #WC-2026-0418
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.12em] text-emerald-400 uppercase px-2.5 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full flex items-center gap-1">
                      <FileCheck className="w-3 h-3" />
                      Approved
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      { label: "Vehicle", value: "F-150 / 2024 Mobility" },
                      { label: "Component", value: "Power lift assembly" },
                      { label: "Failure mode", value: "Motor stall — cycle 1,847" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-[11px]">
                        <span className="text-white/40 font-medium">{row.label}</span>
                        <span className="text-white/85 font-semibold">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                        Pre-Failure Telemetry
                      </span>
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[55, 60, 58, 65, 70, 78, 85, 92, 88, 95, 70, 30].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t ${
                            i >= 9 ? "bg-amber-400/60" : "bg-[#0071e3]/40"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-[9px] text-white/40 mt-2 text-center">
                      Motor draw climbed for 14 days before failure
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, label: "Cycle log attached (1,847 cycles)" },
                      { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, label: "Fault codes — exported to OEM" },
                      { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, label: "Install record + tech notes" },
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
                    Auto-built warranty packet &mdash; preview
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM NARRATIVE — six dealer-pain chapters (~70%) */}
      <section className="py-32 bg-[#15171b] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-20 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-4">
              The Daily Reality In Your Shop
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Six things adaptive mobility dealers stop accepting
              eventually.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              Warranty disputes you can&rsquo;t win, service calls you
              can&rsquo;t scope, customer blame you can&rsquo;t deflect.
              The infrastructure to fix it has never existed — until now.
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

      {/* SOLUTION — compressed (~20%) */}
      <section className="py-28 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              What Changes With Adapy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
              Three things that flip the dealer economics.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy gives your service department the missing layer:
              telemetry on every install, automated alerts that turn
              service into a push channel, and standardized documentation
              that wins warranty and funding fights you used to lose.
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

      {/* DEALER COMMAND CENTER preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
                Dealer Command Center
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                One view of every install you&rsquo;ve ever shipped.
              </h2>
              <p className="text-lg text-black/60 mt-4 max-w-2xl mx-auto">
                Live diagnostics, warranty evidence, and service alerts
                across your entire customer base &mdash; not a phone call
                at a time.
              </p>
            </div>
            <div className="aspect-[16/10] bg-[#f8fafc] rounded-[2.5rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-14 bg-white border-b border-slate-100 flex items-center px-8 gap-6">
                <div className="w-6 h-6 bg-[#0071e3]/10 rounded flex items-center justify-center">
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#0071e3]" />
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
                    <div
                      key={i}
                      className="h-24 bg-white rounded-2xl border border-slate-100 p-4 space-y-2"
                    >
                      <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
                      <div className="h-6 w-1/3 bg-[#0071e3]/10 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="col-span-8 bg-white rounded-3xl border border-slate-100 p-8 flex flex-col">
                  <div className="h-4 w-48 bg-slate-50 rounded-full mb-8" />
                  <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-slate-50">
                    {[40, 55, 50, 70, 65, 85, 75, 95, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#0071e3]/5 rounded-t-md"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                      install health &amp; warranty trend visualization
                    </span>
                  </div>
                </div>
                <div className="col-span-4 space-y-4">
                  <div className="h-4 w-32 bg-slate-50 rounded-full mb-2" />
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 bg-white rounded-2xl border border-slate-100 flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-50 shrink-0" />
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
              Interface preview &mdash; full dealer dashboard included
              with every Adapy partnership
            </p>
          </div>
        </div>
      </section>

      {/* Trimmed FAQ — placed BEFORE the form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">
              Quick answers before you apply.
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

      {/* Compressed scarcity nudge — banner near the form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-3xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-1">
                Limited dealer onboarding slots open right now.
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                We&rsquo;re selectively expanding the dealer network with
                partners who want to lead in adaptive mobility. Onboarding
                includes platform walkthrough, training, and consideration
                for future lead distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM — the final ask (~10%) */}
      <section id="form" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">
              Request dealer access.
            </h2>
            <p className="text-base text-black/60">
              Our partnerships team will follow up within 24 hours.
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
                  Application received.
                </h3>
                <p className="text-black/60 text-base mb-6">
                  {submitMessage ||
                    "Our dealer partnerships team will review your application and be in touch within 24 hours."}
                </p>
                <p className="text-sm text-black/50">
                  Redirecting you shortly...
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
                      required
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
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    data-testid="input-email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Phone Number *
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
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Company / Dealership Name *
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
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      City *
                    </label>
                    <input
                      data-testid="input-city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleFormChange("city", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      State *
                    </label>
                    <input
                      data-testid="input-state"
                      type="text"
                      placeholder="State / Province"
                      value={formData.state}
                      onChange={(e) =>
                        handleFormChange("state", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Country *
                    </label>
                    <input
                      data-testid="input-country"
                      type="text"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) =>
                        handleFormChange("country", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                      required
                    />
                  </div>
                </div>
                {isWashingtonResident && (
                  <MhmdaNotice
                    consent={mhmdaConsent}
                    onConsentChange={handleConsentChange}
                  />
                )}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Situation *
                  </label>
                  <select
                    data-testid="select-situation"
                    value={formData.situation}
                    onChange={(e) =>
                      handleFormChange("situation", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="I currently sell adaptive mobility equipment">
                      I currently sell adaptive mobility equipment
                    </option>
                    <option value="I am looking to add adaptive products to my lineup">
                      I am looking to add adaptive products to my lineup
                    </option>
                    <option value="I am a fleet or commercial dealer exploring Adapy">
                      I am a fleet or commercial dealer exploring Adapy
                    </option>
                    <option value="I was referred by an existing Adapy partner">
                      I was referred by an existing Adapy partner
                    </option>
                    <option value="I'm not sure yet but want to learn more">
                      I&rsquo;m not sure yet but want to learn more
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Adaptive Equipment (optional)
                  </label>
                  <textarea
                    data-testid="textarea-equipment"
                    value={formData.adaptive_equipment}
                    onChange={(e) =>
                      handleFormChange("adaptive_equipment", e.target.value)
                    }
                    placeholder="Tell us about the adaptive equipment you currently work with..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white min-h-[100px]"
                  />
                </div>
                <button
                  data-testid="button-submit-dealer"
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    (isWashingtonResident && !mhmdaConsent)
                  }
                  className="w-full py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Dealer Access"
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
                  ✓ Your information is kept confidential. We&rsquo;ll be
                  in touch within 24 hours.
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
