import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Activity,
  Wrench,
  Thermometer,
  Battery,
  MapPin,
  Wind,
  Eye,
  TrendingDown,
  FileText,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";

export default function NEMTFleet() {
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
    const required = ["first_name", "last_name", "company_name", "email", "phone", "fleet_size", "state"] as const;
    const missing = required.filter((f) => !formData[f].trim());
    if (missing.length > 0) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");
    try {
      const response = await fetch(
        "https://omffhncmajcazsthtccn.supabase.co/functions/v1/api-lead-submit/qualify-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _form_slug: "qualify-form",
            _api_key: "31e0c85a9c7850bd625cf2df0348df3ecfc08ae984eeb623940887763ed9445d",
            ...formData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitMessage(data.message || "Thank you! We will be in touch shortly.");
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

  const hiddenRisks = [
    {
      icon: <Wind className="w-6 h-6 text-red-500" />,
      title: "Carbon Monoxide Exposure",
      desc: "Invisible and odorless, CO buildup in vehicles is a real danger that goes undetected without proper monitoring.",
    },
    {
      icon: <Activity className="w-6 h-6 text-red-500" />,
      title: "Lift & Equipment Failures",
      desc: "If a wheelchair lift malfunctions during loading or unloading, you may never know it happened until a complaint or claim.",
    },
    {
      icon: <Battery className="w-6 h-6 text-red-500" />,
      title: "Battery Voltage Issues",
      desc: "Low voltage can cause equipment failures, stranded vehicles, and missed routes—problems that start before you see them.",
    },
    {
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      title: "Temperature Extremes",
      desc: "Passengers in wheelchairs are especially vulnerable to extreme heat or cold inside the vehicle.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "Compliance Blind Spots",
      desc: "Without data on in-vehicle conditions, documenting safety compliance becomes guesswork.",
    },
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      title: "No In-Vehicle Visibility",
      desc: "A completed trip does not automatically mean a safe trip. Most fleets have zero visibility into what happens inside the vehicle.",
    },
  ];

  const features = [
    {
      icon: <Wind className="w-8 h-8 text-[#0071e3]" />,
      title: "Carbon Monoxide",
      desc: "Help protect passengers and drivers from invisible in-vehicle danger. Continuous CO monitoring with real-time alerts.",
    },
    {
      icon: <Activity className="w-8 h-8 text-[#0071e3]" />,
      title: "Adaptive Equipment Usage",
      desc: "Track lift and mobility equipment usage to improve accountability, maintenance scheduling, and fleet reliability.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#0071e3]" />,
      title: "GPS + Vehicle Context",
      desc: "Know not just where your vehicles are, but what is happening inside them in real time.",
    },
    {
      icon: <Battery className="w-8 h-8 text-[#0071e3]" />,
      title: "Battery Voltage",
      desc: "Catch voltage issues before they become breakdowns or service interruptions that disrupt your routes.",
    },
    {
      icon: <Thermometer className="w-8 h-8 text-[#0071e3]" />,
      title: "Temperature",
      desc: "Monitor environmental conditions that affect passenger comfort, safety, and regulatory compliance.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#0071e3]" />,
      title: "Service & Maintenance Insights",
      desc: "Predictive maintenance based on actual usage data—not just mileage or calendar intervals.",
    },
  ];

  const comparisonRows = [
    { label: "Dispatch", traditional: true, adapy: false },
    { label: "Scheduling", traditional: true, adapy: false },
    { label: "Billing", traditional: true, adapy: false },
    { label: "GPS Tracking", traditional: true, adapy: true },
    { label: "Carbon Monoxide Monitoring", traditional: false, adapy: true },
    { label: "Adaptive Equipment Monitoring", traditional: false, adapy: true },
    { label: "Battery Voltage Monitoring", traditional: false, adapy: true },
    { label: "Temperature Monitoring", traditional: false, adapy: true },
    { label: "Predictive Service Insight", traditional: false, adapy: true },
    { label: "In-Vehicle Safety Visibility", traditional: false, adapy: true },
  ];

  const businessOutcomes = [
    {
      icon: <TrendingDown className="w-8 h-8 text-[#0071e3]" />,
      title: "Reduce Liability Exposure",
      desc: "Document in-vehicle conditions and equipment performance to protect your company from claims.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#0071e3]" />,
      title: "Strengthen Safety Oversight",
      desc: "Move beyond trip-level tracking. Gain real-time awareness of passenger safety conditions.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#0071e3]" />,
      title: "Improve Fleet Reliability",
      desc: "Predictive maintenance based on actual equipment usage reduces breakdowns and missed routes.",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#0071e3]" />,
      title: "Document Critical Conditions",
      desc: "Automated logs for CO levels, temperature, battery health, and equipment events—always available when needed.",
    },
    {
      icon: <Eye className="w-8 h-8 text-[#0071e3]" />,
      title: "Visibility Beyond Dispatch Data",
      desc: "Know what happens between pickup and dropoff. Fill the gap your current software cannot cover.",
    },
    {
      icon: <Activity className="w-8 h-8 text-[#0071e3]" />,
      title: "Reduce Avoidable Problems",
      desc: "Catch voltage drops, equipment wear, and environmental hazards before they become costly service events.",
    },
  ];

  const faqs = [
    {
      q: "Is Adapy a dispatch platform?",
      a: "No. Adapy is not dispatch, scheduling, or billing software. Adapy is the intelligence and monitoring layer that works inside the vehicle—tracking safety conditions, equipment usage, and environmental data that dispatch platforms cannot see.",
    },
    {
      q: "Does Adapy replace my existing NEMT software?",
      a: "No. Adapy complements your existing NEMT platform. Your dispatch software manages trips. Adapy monitors what happens during those trips—carbon monoxide, equipment usage, battery health, temperature, and more.",
    },
    {
      q: "What kinds of vehicles can Adapy monitor?",
      a: "Adapy is designed for wheelchair-accessible vehicles and any NEMT fleet vehicle equipped with adaptive mobility equipment such as lifts, ramps, and transfer seats.",
    },
    {
      q: "Can Adapy help with safety and maintenance visibility?",
      a: "Yes. Adapy provides real-time monitoring of in-vehicle conditions, predictive maintenance insights based on actual equipment usage, and automated documentation for compliance and safety oversight.",
    },
    {
      q: "How does Adapy handle data and reporting?",
      a: "Adapy provides a cloud-based dashboard with real-time alerts, historical data, automated reports, and exportable documentation for compliance, claims, and fleet management.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-black to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-red-500 blur-[120px] rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">In-Vehicle Safety Intelligence</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
                What You Don't See in Your NEMT Vehicles Is What's Costing You the Most.
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
                Real-time monitoring for carbon monoxide, adaptive equipment usage, GPS, battery health, temperature, and in-vehicle safety—built specifically for NEMT fleets.
              </p>

              <div className="flex flex-row gap-4 mb-8">
                <button
                  data-testid="button-hero-demo"
                  type="button"
                  onClick={() => scrollToSection("form")}
                  className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2"
                >
                  Book a Demo <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  data-testid="button-hero-how"
                  type="button"
                  onClick={() => scrollToSection("features")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  See How Adapy Works
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-white/50">
                <span>Fleet Software Tracks Trips.</span>
                <span className="text-[#0071e3] font-bold">Adapy Tracks What Actually Matters.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              The Hidden Risks in Every NEMT Vehicle
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto mb-4">
              Most NEMT companies can track trips and vehicles. But they still have zero visibility into what happens inside the vehicle between pickup and dropoff.
            </p>
            <p className="text-lg text-red-600 font-semibold">
              A completed trip does not automatically mean a safe trip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiddenRisks.map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-[#f5f5f7] rounded-2xl border border-black/[0.05]"
              >
                <div className="mb-4">{risk.icon}</div>
                <h3 className="text-lg font-bold text-black mb-2">{risk.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{risk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Adapy Is Not Fleet Management Software
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Traditional NEMT platforms manage trips. Adapy monitors what is happening inside the vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white/80 mb-6">Traditional NEMT Software</h3>
              <ul className="space-y-4">
                {["Scheduling", "Dispatch", "Billing", "Basic GPS"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60">
                    <Check className="w-5 h-5 text-white/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[#0071e3]/10 border border-[#0071e3]/30">
              <h3 className="text-xl font-bold text-[#0071e3] mb-6">Adapy</h3>
              <ul className="space-y-4">
                {[
                  "Carbon Monoxide Monitoring",
                  "Adaptive Equipment Monitoring",
                  "Battery Voltage Monitoring",
                  "Temperature Monitoring",
                  "Vehicle Intelligence",
                  "Safety Data & Reports",
                  "Equipment Usage Data",
                  "Condition Monitoring",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-[#0071e3] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-white/50 mt-12 text-lg italic max-w-2xl mx-auto">
            "NEMT software helps run the trip. Adapy helps protect what happens during the trip."
          </p>
        </div>
      </section>

      <section id="features" className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              What Adapy Monitors
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Real-time intelligence from inside every vehicle in your fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 bg-white rounded-3xl border border-black/[0.05]"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-black/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Traditional NEMT Platforms vs. Adapy
            </h2>
            <p className="text-xl text-black/60">
              See where your current software ends—and where Adapy begins.
            </p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl overflow-hidden border border-black/[0.05]">
            <div className="grid grid-cols-3 gap-0 p-6 border-b border-black/[0.05] bg-black text-white rounded-t-3xl">
              <div className="font-bold text-sm">Capability</div>
              <div className="font-bold text-sm text-center">Traditional NEMT</div>
              <div className="font-bold text-sm text-center text-[#0071e3]">Adapy</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-0 p-6 ${i < comparisonRows.length - 1 ? "border-b border-black/[0.05]" : ""}`}
              >
                <div className="text-sm font-medium text-black">{row.label}</div>
                <div className="flex justify-center">
                  {row.traditional ? (
                    <Check className="w-5 h-5 text-black/40" />
                  ) : (
                    <X className="w-5 h-5 text-black/20" />
                  )}
                </div>
                <div className="flex justify-center">
                  {row.adapy ? (
                    <Check className="w-5 h-5 text-[#0071e3]" />
                  ) : (
                    <X className="w-5 h-5 text-black/20" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Why NEMT Companies Add Adapy
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Protect passengers. Protect drivers. Protect your company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessOutcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 bg-white rounded-3xl border border-black/[0.05]"
              >
                <div className="mb-6">{outcome.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{outcome.title}</h3>
                <p className="text-black/60 leading-relaxed">{outcome.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              See What Your Fleet Is Missing
            </h2>
            <p className="text-xl text-black/60">
              Request a demo and learn how Adapy gives NEMT operators visibility beyond dispatch, GPS, and trip data.
            </p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12 border border-black/[0.05]">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#0071e3]" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  Demo Request Received!
                </h3>
                <p className="text-black/60 text-lg mb-8">
                  {submitMessage || "Our team will review your request and be in touch within 24 hours."}
                </p>
                <p className="text-sm text-black/50">
                  Redirecting you shortly...
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">First Name *</label>
                    <input
                      data-testid="input-first-name"
                      type="text"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={(e) => handleFormChange("first_name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Last Name *</label>
                    <input
                      data-testid="input-last-name"
                      type="text"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) => handleFormChange("last_name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Company Name *</label>
                  <input
                    data-testid="input-company"
                    type="text"
                    placeholder="Company Name"
                    value={formData.company_name}
                    onChange={(e) => handleFormChange("company_name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Email *</label>
                    <input
                      data-testid="input-email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Phone *</label>
                    <input
                      data-testid="input-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Fleet Size *</label>
                    <input
                      data-testid="input-fleet-size"
                      type="text"
                      placeholder="# of vehicles"
                      value={formData.fleet_size}
                      onChange={(e) => handleFormChange("fleet_size", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Wheelchair Vehicles</label>
                    <input
                      data-testid="input-wheelchair-vehicles"
                      type="text"
                      placeholder="# wheelchair accessible"
                      value={formData.wheelchair_vehicles}
                      onChange={(e) => handleFormChange("wheelchair_vehicles", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">State *</label>
                    <input
                      data-testid="input-state"
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => handleFormChange("state", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Notes (optional)</label>
                  <textarea
                    data-testid="textarea-notes"
                    value={formData.adaptive_equipment}
                    onChange={(e) => handleFormChange("adaptive_equipment", e.target.value)}
                    placeholder="Tell us about your fleet, current challenges, or questions..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white min-h-[100px]"
                  />
                </div>
                <button
                  data-testid="button-submit-nemt"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0071e3] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <p data-testid="text-submit-error" className="text-sm text-red-600 text-center">{submitError}</p>
                )}
                <p className="text-center text-black/50 text-sm">
                  See how Adapy helps NEMT operators gain visibility beyond dispatch, GPS, and trip data.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden border border-black/[0.05]"
              >
                <button
                  data-testid={`button-faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                >
                  <span className="text-lg font-bold text-black text-left">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0071e3] transition-transform flex-shrink-0 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-8 pb-6 pt-0 border-t border-black/[0.05]">
                    <p className="text-black/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Dispatch Software Runs the Route. Adapy Monitors the Risk.
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Add the intelligence layer your NEMT vehicles have been missing.
          </p>
          <button
            data-testid="button-final-cta"
            type="button"
            onClick={() => scrollToSection("form")}
            className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 inline-flex items-center gap-2"
          >
            Book a Demo <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
