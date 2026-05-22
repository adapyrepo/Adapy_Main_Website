import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Activity,
  Thermometer,
  Wind,
  FileText,
  Gavel,
  DollarSign,
  Clock,
  MapPin,
  Navigation,
  Truck,
  AlertTriangle,
  Building2,
  TrendingUp,
  Heart,
  Siren,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";

export default function NEMTFleet() {
  useSEO({
    title: "Carbon Monoxide Monitoring for NEMT & Paratransit Fleets",
    description: "After West Valley City, advocacy groups are lobbying for mandatory CO detectors in every paratransit vehicle. Adapy delivers always-on CO, cabin, and equipment monitoring before regulation forces your hand — and before the next preventable death.",
    path: "/solutions/nemt",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/platform" },
      { name: "NEMT Fleets", path: "/solutions/nemt" },
    ],
    keywords: "NEMT carbon monoxide monitoring, paratransit CO detector mandate, wheelchair van CO sensor, NEMT safety regulation, West Valley City paratransit, U.S. Access Board vehicle accessibility, NEMT fleet safety platform, ADA paratransit monitoring, Medicaid transportation compliance",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Adapy CO & Cabin Monitoring for NEMT and Paratransit Fleets",
        provider: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
        serviceType: "Carbon monoxide, cabin environment, and adaptive equipment monitoring for NEMT and paratransit fleets",
        audience: { "@type": "BusinessAudience", audienceType: "NEMT operators, paratransit agencies, brokerages" },
        areaServed: "United States",
        description: "Always-on carbon monoxide, cabin temperature, lift, and battery monitoring built for NEMT and paratransit operators preparing for incoming CO-detector regulation.",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Why is CO monitoring suddenly a NEMT priority?", acceptedAnswer: { "@type": "Answer", text: "After the February 2026 West Valley City incident — where three disabled adults died of suspected CO poisoning inside a service vehicle left running in a garage — advocacy groups are actively lobbying for mandatory CO detectors in all paratransit vehicles and stricter no-idling rules for enclosed garages." } },
          { "@type": "Question", name: "Will the U.S. Access Board mandate CO detectors in paratransit vehicles?", acceptedAnswer: { "@type": "Answer", text: "The Access Board periodically updates Accessibility Guidelines for Transportation Vehicles. The 2016 updates focused on physical access; future iterations are widely expected to incorporate environmental safety features such as CO monitoring, particularly for vehicles serving vulnerable populations." } },
          { "@type": "Question", name: "Does Adapy replace my existing NEMT software?", acceptedAnswer: { "@type": "Answer", text: "It can. Adapy is a complete NEMT platform that includes dispatch, scheduling, and billing — plus the in-vehicle CO and equipment monitoring layer your current software doesn't touch." } },
          { "@type": "Question", name: "What does Adapy monitor inside the cabin?", acceptedAnswer: { "@type": "Answer", text: "Cabin carbon monoxide, cabin temperature, lift and ramp cycles, transfer seat and harness usage, battery voltage, and equipment fault codes — continuously, with real-time alerts and exportable audit logs." } },
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
        "Carbon monoxide is colorless, odorless, and detectable long before it becomes fatal — but only if a sensor is present.",
      body: "An idling van in a garage. A cracked exhaust seal. A failing catalytic converter. None of it sets off a dispatch alert. By the time a medically fragile passenger feels symptoms, exposure has already happened — and the trip log has no record of cabin air quality to show what conditions were inside the vehicle.",
      stat: "CO becomes lethal at levels passengers cannot detect without sensors",
    },
    {
      icon: <Siren className="w-7 h-7" />,
      eyebrow: "Chapter 02 — The Regulation Is Coming",
      title:
        "Advocacy groups are actively lobbying for mandatory CO detectors in every paratransit vehicle.",
      body: "The West Valley City tragedy turned a long-running safety concern into a national policy fight. Disability rights groups, NEMT brokers, and state Medicaid offices are pushing for CO-detector mandates, stricter no-idling rules in enclosed garages, and updated U.S. Access Board guidelines for accessible transportation vehicles. Operators who wait for the rule to be written will retrofit under deadline.",
      stat: "The U.S. Access Board last updated vehicle accessibility guidelines in 2016 — environmental safety is widely expected in the next revision",
    },
    {
      icon: <Thermometer className="w-7 h-7" />,
      eyebrow: "Chapter 03 — Cabin Extremes Hit Medically Fragile Riders First",
      title:
        "Wheelchair users can't reposition, can't reach a vent, and often can't communicate distress in time.",
      body: "An HVAC failure on a hot afternoon. A locked-up climate system on a winter morning. For a typical commuter, it's an inconvenience. For a dialysis patient or a non-verbal passenger strapped into a wheelchair tie-down, it becomes a clinical event before the driver notices.",
      stat: "Cabin temperature swings inside a stationary NEMT van can reach dangerous levels in under 30 minutes",
    },
    {
      icon: <Activity className="w-7 h-7" />,
      eyebrow: "Chapter 04 — Equipment Fails Without Warning",
      title:
        "Lift jams mid-loading. The route is already broken — and so is the trust.",
      body: "A passenger is half-loaded. The driver is on the phone with dispatch. The next three trips slip. The hospital marks the patient a no-show. The Medicaid trip won't bill. The operator absorbs every minute of cascading cost. And nobody — driver, dispatcher, mechanic — can tell you whether the lift had been throwing fault codes for a week.",
      stat: "A meaningful share of breakdowns are visible in telemetry 24+ hours before they strand a passenger",
    },
    {
      icon: <Gavel className="w-7 h-7" />,
      eyebrow: "Chapter 05 — You Can't Defend What You Didn't Record",
      title:
        "Plaintiff counsel will ask for cabin conditions. Today, you can only hand over a GPS breadcrumb.",
      body: "After an incident, discovery requests come fast: cabin CO levels, cabin temperature, lift cycle logs, fault codes, pre-trip inspection evidence. Operators without that data settle — because the absence of monitoring is itself read as negligence. Post-West Valley City, juries no longer accept \"we didn't have sensors\" as a defense.",
      stat: "In-cabin incident litigation against transportation providers can reach high six and seven figures",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      eyebrow: "Chapter 06 — Medicaid Audits & Broker Scorecards",
      title:
        "Missing trip-level evidence is becoming a documented clawback risk.",
      body: "Brokers are tightening scorecards. State Medicaid offices are tightening audits. Every gap in environmental, equipment, and inspection data is a potential clawback — months after the trip already ran. Proactive monitoring is moving from \"nice to have\" to a precondition for keeping the contract.",
      stat: "Trip-level evidence gaps create direct clawback and contract-renewal exposure",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      eyebrow: "Chapter 07 — One Bad Day Costs More Than A Decade of Sensors",
      title:
        "The math on prevention isn't close. The only question is whether you build visibility before the incident or after.",
      body: "Add it up: the wrongful-death retainer, the state investigation, the contract that doesn't renew, the insurance premium that doubles, the news headlines that follow your brand for years, the drivers who quit, the families who refuse the service. CO monitoring hardware is a rounding error against a single preventable fatality.",
      stat: "The cost of monitoring an entire fleet for a decade is a fraction of one wrongful-death settlement",
    },
  ];

  const incidentTimeline = [
    {
      label: "Feb 6, 2026 · West Valley City, Utah",
      text: "Three disabled adults are found dead inside a service vehicle parked in a residential garage. Authorities cite suspected carbon monoxide poisoning from the vehicle being left running in an enclosed space.",
    },
    {
      label: "Days After",
      text: "Local and national outlets — Fox13, the Salt Lake Tribune — pick up the story. Disability rights groups demand answers about safety standards across paratransit and adaptive transportation services.",
    },
    {
      label: "Weeks After",
      text: "Advocacy organizations begin lobbying state legislatures and the U.S. Access Board for mandatory CO detectors in all paratransit vehicles and stricter no-idling enforcement in enclosed garages.",
    },
    {
      label: "Now",
      text: "Brokers, Medicaid offices, and major NEMT contracts are revisiting safety scorecards. Operators with in-cabin monitoring are surfacing it in RFP responses; operators without it should expect harder questions on the next renewal.",
    },
  ];

  const advocacySignals = [
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: "Disability rights organizations",
      body: "Lobbying for CO detectors as a required safety standard in every vehicle that transports disabled or medically fragile passengers.",
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#0071e3]" />,
      title: "U.S. Access Board",
      body: "Periodically updates Accessibility Guidelines for Transportation Vehicles. The 2016 update addressed physical access; future revisions are widely expected to include environmental safety.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      title: "Brokers & state Medicaid offices",
      body: "Tightening safety scorecards, audit requirements, and no-idling enforcement in enclosed garages. Documentation expectations are rising faster than most fleets are responding.",
    },
  ];

  const badDay = [
    {
      time: "7:51am — Garage",
      event:
        "A van is left idling inside an enclosed bay for ten minutes while the driver finishes paperwork. There is no CO sensor in the cabin. Nobody is breathing the air yet, but the trip's safety record is already written.",
    },
    {
      time: "8:14am — First Pickup",
      event:
        "Driver picks up a dialysis patient. A small, weeks-old exhaust leak is venting under the floor. Cabin CO is climbing. The passenger reports a headache. The driver assumes nausea from the trip.",
    },
    {
      time: "9:02am — Second Pickup",
      event:
        "Cabin temperature climbs as the HVAC struggles. The wheelchair passenger can't reposition or reach a vent. They go quiet. The driver doesn't notice the change.",
    },
    {
      time: "11:23am — Drop-Off",
      event:
        "The lift hesitates. The driver muscles it through and skips the service ticket. The fault code is never escalated. The next operator inherits the failing actuator.",
    },
    {
      time: "Next Tuesday — Audit",
      event:
        "Medicaid auditor pulls trip records. There is no environmental data, no equipment usage log, no inspection timestamp. Multiple trips are clawed back.",
    },
    {
      time: "Six Weeks Later — Letter",
      event:
        "Plaintiff's counsel sends a discovery request for cabin air quality, lift cycle logs, and pre-trip inspection evidence. You have a manifest and a GPS breadcrumb. They have a story for the jury.",
    },
  ];

  const monitoringPoints = [
    {
      icon: <Wind className="w-7 h-7 text-[#0071e3]" />,
      title: "Cabin CO monitoring with real-time alerts",
      desc: "Continuous carbon monoxide and cabin air quality sensing across every vehicle — alerts fire before passengers feel symptoms, and before regulators ask why you didn't have sensors.",
    },
    {
      icon: <Thermometer className="w-7 h-7 text-[#0071e3]" />,
      title: "Cabin temperature & equipment telemetry",
      desc: "Continuous temperature, lift cycle, ramp, transfer seat, and battery telemetry — every event timestamped and routed to dispatch, maintenance, and the cloud.",
    },
    {
      icon: <FileText className="w-7 h-7 text-[#0071e3]" />,
      title: "Audit-ready, mandate-ready documentation",
      desc: "Exportable trip-level records for Medicaid audits, broker scorecards, incident review, and the CO monitoring requirements headed your way — already in the format regulators want.",
    },
  ];

  const faqs = [
    {
      q: "Why is CO monitoring suddenly a NEMT priority?",
      a: "After the February 2026 West Valley City incident — where three disabled adults died of suspected CO poisoning inside a service vehicle left running in an enclosed garage — advocacy groups began actively lobbying for mandatory CO detectors in all paratransit vehicles and stricter no-idling rules in enclosed garages.",
    },
    {
      q: "Will the U.S. Access Board mandate CO detectors in paratransit vehicles?",
      a: "The Access Board periodically updates Accessibility Guidelines for Transportation Vehicles. The 2016 update focused on physical access; future iterations are widely expected to incorporate environmental safety features such as CO monitoring, particularly for vehicles serving medically fragile populations.",
    },
    {
      q: "Does Adapy replace my existing NEMT software?",
      a: "It can. Adapy is a complete NEMT platform that includes dispatch, scheduling, and billing — plus the in-vehicle CO and equipment monitoring layer your current software doesn't touch.",
    },
    {
      q: "What does Adapy monitor inside the cabin?",
      a: "Cabin carbon monoxide, cabin temperature, lift and ramp cycles, transfer seat and harness usage, battery voltage, and equipment fault codes — continuously, with real-time alerts and exportable audit logs.",
    },
    {
      q: "How fast can we deploy across an existing fleet?",
      a: "Adapy installs onto existing wheelchair-accessible NEMT vehicles using universal harness integration — no rewiring, no OEM warranty conflicts. Most fleets start seeing live data on the first vehicle within a single service appointment.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="relative min-h-screen flex items-center pt-32 pb-16 bg-gradient-to-b from-[#0e0f12] to-[#1c1f24] overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-7">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs md:text-[13px] text-red-400 font-semibold tracking-wide">
                  Post–West Valley City · CO Detector Mandates Being Lobbied
                </span>
              </div>

              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold text-white mb-5 leading-[1.02] tracking-tight">
                Three lives. One enclosed garage.
                <span className="block text-white/85">
                  Zero CO sensors required.
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-white/65 mb-7 leading-snug max-w-2xl font-medium">
                The West Valley City tragedy turned a long-running paratransit safety
                concern into a national policy fight — and your fleet is in its path.
              </p>

              <p className="text-[15px] md:text-base text-white/55 mb-8 leading-relaxed max-w-2xl">
                February 2026: three medically fragile passengers died of suspected
                carbon monoxide poisoning inside a service vehicle left running in
                an enclosed garage. Advocacy groups are now lobbying for mandatory
                CO detectors in every paratransit vehicle. Adapy delivers always-on
                cabin CO, temperature, and equipment monitoring — before the rule
                lands on your desk, and before the next preventable death.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-10">
                <button
                  data-testid="button-hero-demo"
                  type="button"
                  onClick={() => scrollToSection("form")}
                  className="px-7 py-3.5 bg-[#0071e3] text-white rounded-full font-bold text-base hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center justify-center gap-2 w-fit"
                >
                  Get Ahead of the Mandate
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  data-testid="button-hero-read-incident"
                  type="button"
                  onClick={() => scrollToSection("incident")}
                  className="px-5 py-3.5 text-white/80 hover:text-white font-semibold text-base flex items-center justify-center gap-2 w-fit transition-colors"
                >
                  Read what happened
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-xl border-t border-white/10 pt-6">
                <div data-testid="stat-hero-deaths">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">3</div>
                  <div className="text-[11px] md:text-xs text-white/50 leading-tight uppercase tracking-wider">
                    Disabled adults · Feb 2026
                  </div>
                </div>
                <div data-testid="stat-hero-sensors">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">0</div>
                  <div className="text-[11px] md:text-xs text-white/50 leading-tight uppercase tracking-wider">
                    CO sensors mandated today
                  </div>
                </div>
                <div data-testid="stat-hero-pressure">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">2016</div>
                  <div className="text-[11px] md:text-xs text-white/50 leading-tight uppercase tracking-wider">
                    Last Access Board update
                  </div>
                </div>
              </div>

              <p className="text-[11px] md:text-xs text-white/40 mt-5">
                Source: Salt Lake Tribune &amp; Fox13 reporting, Feb 6, 2026.
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

      {/* The Incident — West Valley City */}
      <section id="incident" className="py-32 bg-[#0e0f12] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-14 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-red-400 uppercase block mb-4">
              The Incident That Changed the Conversation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Three disabled adults. One running engine. One enclosed garage. Zero monitoring.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              According to reporting from the Salt Lake Tribune and Fox13,
              three disabled men died of suspected carbon monoxide poisoning
              after being left inside a running vehicle parked in a garage
              while being transported by a service provider for disabled
              adults. Investigators have pointed to a deadly buildup of CO
              from an engine left running in an enclosed space — the exact
              category of environmental hazard that real-time cabin
              monitoring is designed to detect long before it becomes fatal.
            </p>
          </div>

          <div className="relative pl-6 md:pl-10 border-l border-red-500/30 space-y-10 mb-14">
            {incidentTimeline.map((moment, i) => (
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
                  {moment.label}
                </div>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  {moment.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.04]">
            <p className="text-white/80 leading-relaxed text-lg italic">
              "Many life-threatening environmental conditions are detectable
              long before they become fatal."
            </p>
            <p className="text-white/50 leading-relaxed text-sm mt-3">
              — Adapy, <a href="/blog/safety-first-proactive-monitoring-fleet-operations" className="text-[#0071e3] hover:underline">Safety First: Proactive Monitoring in Fleet Operations</a>
            </p>
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
              Seven risks every NEMT operator carries today — starting with the one in the air.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              Traditional NEMT software stops at dispatch and billing.
              Carbon monoxide, cabin temperature, lift faults, and battery
              telemetry — the part of the trip that now defines both
              liability and the next round of regulation — runs
              unmonitored.
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
                    {chapter.stat}
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
              How an invisible cabin becomes a wrongful-death lawsuit.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              One realistic timeline inside a typical NEMT shift. Every step
              preventable with the right alert at the right minute — and the
              right data on file when the discovery request lands.
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
              have been, with cabin CO and equipment monitoring active.
            </p>
          </div>
        </div>
      </section>

      {/* The Mandate Is Coming — Advocacy & Regulation */}
      <section className="py-32 bg-[#0e0f12] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase block mb-4">
              The Mandate Is No Longer Hypothetical
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Three forces are moving in the same direction at the same time.
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              Safety regulations historically evolve in the wake of
              high-profile incidents. West Valley City is now that incident.
              The lobbying, the broker scorecards, and the regulatory review
              cycles are already in motion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {advocacySignals.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-5">
                  {signal.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {signal.title}
                </h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  {signal.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-amber-400/20 bg-amber-400/[0.04]">
            <p className="text-white/85 leading-relaxed text-lg">
              The U.S. Access Board last revised Accessibility Guidelines for
              Transportation Vehicles in 2016, focused on physical access.
              Environmental safety features — CO monitoring chief among them —
              are widely expected in the next revision.
              {" "}
              <a
                href="https://www.access-board.gov/ada/vehicles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071e3] hover:underline"
              >
                See current guidelines →
              </a>
            </p>
            <p className="text-white/55 leading-relaxed text-sm mt-3">
              Operators who deploy CO and cabin monitoring now retrofit on
              their schedule, not the regulator's.
            </p>
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              The Adapy Answer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
              CO monitoring, cabin telemetry, and audit-ready records — running on every vehicle, every trip.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy adds the in-cabin layer that traditional NEMT software
              doesn't touch. Same dispatch, same billing — plus continuous
              carbon monoxide monitoring, cabin and equipment telemetry, and
              the trip-level evidence that wins audits, defends claims, and
              prevents the incident before it happens.
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
                Deploy before the mandate. Document before the lawsuit.
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Tell us about your fleet. We'll show you the CO and cabin
                monitoring layer that prevents the next incident — and
                produces the trip-level evidence regulators and brokers
                will be asking for.
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
