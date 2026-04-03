import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  Zap,
  Users,
  Smartphone,
  Heart,
  ArrowRight,
  AlertCircle,
  Settings,
  Bell,
  History,
  HeartPulse,
} from "lucide-react";
import { useState } from "react";

export default function UserFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    situation: "",
    adaptive_equipment: "",
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");
    try {
      const response = await fetch(
        "https://zxjxflneozbhwbixcvic.supabase.co/functions/v1/api-lead-submit/qualify-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Form-Api-Key":
              "31e0c85a9c7850bd625cf2df0348df3ecfc08ae984eeb623940887763ed9445d",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            situation: formData.situation,
            adaptive_equipment: formData.adaptive_equipment,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitMessage(data.message || "Thank you! We will be in touch shortly.");
      setFormStep(5);
      window.setTimeout(() => {
        window.location.href = data.redirect_url || "https://www.adapy.com";
      }, 1800);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const painPoints = [
    {
      title: "Multiple Remotes & Controls",
      desc: "Managing several different controls for different adaptive equipment is exhausting.",
    },
    {
      title: "Inconsistent Experiences",
      desc: "Each device works differently, making your mobility experience unpredictable.",
    },
    {
      title: "Extra Dependence",
      desc: "Complex setups often mean relying on others for things you should be able to do independently.",
    },
    {
      title: "Unnecessary Complexity",
      desc: "Adaptive mobility shouldn't require constant troubleshooting or extra steps.",
    },
  ];

  const benefits = [
    {
      icon: <Smartphone className="w-8 h-8 text-[#0071e3]" />,
      title: "Simplified Control",
      desc: "One app for all your equipment. No more juggling multiple remotes for your lift, seat, and doors.",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#0071e3]" />,
      title: "Predictive Maintenance",
      desc: "Get alerts before issues arise. We track equipment cycles and battery health to keep you moving.",
    },
    {
      icon: <Bell className="w-8 h-8 text-[#0071e3]" />,
      title: "Safety Notifications",
      desc: "Real-time alerts for CO detection, extreme temperatures, and battery voltage drops.",
    },
    {
      icon: <History className="w-8 h-8 text-[#0071e3]" />,
      title: "Digital Service History",
      desc: "Always know when your vehicle was last serviced. Access complete logs for your dealer in seconds.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Tell Us About Your Setup",
      desc: "Answer a few simple questions so we can understand your needs.",
    },
    {
      number: "2",
      title: "We Review Your Options",
      desc: "We help determine the best next step based on your location, goals, and possible funding path.",
    },
    {
      number: "3",
      title: "We Help Connect You",
      desc: "If there is a fit, we help connect you with the right dealer or next step in your area.",
    },
  ];

  const qualificationSteps = [
    {
      number: "1",
      title: "We Review Your Inquiry",
      desc: "Our team carefully reviews what you've shared about your needs.",
    },
    {
      number: "2",
      title: "We Identify Next Steps",
      desc: "We help determine the best path based on your situation and location.",
    },
    {
      number: "3",
      title: "We Connect & Support",
      desc: "We connect you with education, a dealer, or funding guidance when available.",
    },
  ];

  const faqs = [
    {
      q: "Do I need to know if I qualify before reaching out?",
      a: "No. We're here to help you explore your options. You don't need to have all the answers—just reach out, and we'll guide you through what's possible.",
    },
    {
      q: "Can Adapy help if I am working with the VA?",
      a: "Yes. Many users pursue Adapy through VA funding. Our team can help guide that process and connect you with resources.",
    },
    {
      q: "What if I am still exploring my options?",
      a: "That's exactly what this process is for. Tell us where you are, and we'll help you understand what might work for your situation.",
    },
    {
      q: "Will someone help me understand the process?",
      a: "Absolutely. Our team is here to support you at every step—no jargon, no pressure, just straightforward guidance.",
    },
    {
      q: "Do I need to buy directly from Adapy?",
      a: "No. Adapy works with authorized dealers in your area. We help connect you with the right partner who can support your needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-black to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
                Stop Juggling Controls. Start Moving Freely.
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-lg">
                Adapy brings your vehicle's adaptive equipment into one simple, connected system—designed around your independence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => scrollToSection("form")}
                  className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2 w-fit"
                >
                  See If You Qualify <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("demo")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  Watch How It Works
                </button>
              </div>

              <p className="text-sm text-white/60">
                ℹ️ You may qualify for Adapy through programs such as the VA or Vocational Rehabilitation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Validation Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Adaptive mobility should feel simpler.
            </h2>
            <p className="text-xl text-black/60">
              For many wheelchair users, everyday vehicle access means managing multiple controls, extra steps, and unnecessary complexity. Adapy was designed to help reduce that burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#f5f5f7] rounded-2xl border border-black/[0.05]"
              >
                <h3 className="text-lg font-bold text-black mb-2">{point.title}</h3>
                <p className="text-black/60 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              One System. A Simpler Experience.
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Adapy helps bring adaptive equipment into one connected experience, giving you a more streamlined and intuitive way to interact with your vehicle environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-black/[0.05]"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-black/60 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              How It Works
            </h2>
            <p className="text-xl text-black/60">
              A simple, supportive process to explore if Adapy is right for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-black/60">{step.desc}</p>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-1 bg-gradient-to-r from-[#0071e3] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-black mb-6">
              You May Already Qualify
            </h2>
            <p className="text-xl text-black/60 mb-12 leading-relaxed">
              In many cases, Adapy may be pursued through programs such as the VA, Vocational Rehabilitation, Workforce Services, or other funding pathways. We can help you begin the process and understand your next steps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Funding pathways may be available",
                "We help guide the process",
                "We can connect you with local support",
              ].map((point, i) => (
                <div
                  key={i}
                  className="p-8 bg-white rounded-2xl border border-black/[0.05]"
                >
                  <div className="flex items-center gap-3 justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[#0071e3]" />
                  </div>
                  <p className="text-black/70 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              See How Adapy Works
            </h2>
            <p className="text-xl text-black/60">
              Watch how Adapy creates a more connected and simplified adaptive mobility experience.
            </p>
          </div>

          <div className="aspect-video rounded-3xl overflow-hidden bg-black/5 border border-black/10 flex items-center justify-center">
            <div className="text-center">
              <p className="text-black/60 mb-4">Video placeholder</p>
              <p className="text-sm text-black/40">
                Your product demo video will be embedded here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              See If Adapy May Be a Fit for You
            </h2>
            <p className="text-xl text-black/60">
              Tell us a little about your situation and our team can help guide the next step.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/[0.05]">
            {/* Form Steps */}
            <div className="mb-12">
              <div className="flex justify-between mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center gap-2 ${
                      step <= formStep ? "text-[#0071e3]" : "text-black/30"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step <= formStep
                          ? "bg-[#0071e3] text-white"
                          : "bg-black/10 text-black/50"
                      }`}
                    >
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1 */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Let's Start With Your Name & Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) => handleFormChange("first_name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={(e) => handleFormChange("last_name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                />
                <button
                  onClick={() => setFormStep(2)}
                  className="w-full py-4 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2 */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Where Are You Located?
                </h3>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleFormChange("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  value={formData.state}
                  onChange={(e) => handleFormChange("state", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormStep(1)}
                    className="flex-1 py-4 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setFormStep(3)}
                    className="flex-1 py-4 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Tell Us About Your Situation
                </h3>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    Which best describes your current situation?
                  </label>
                  <select
                    value={formData.situation}
                    onChange={(e) => handleFormChange("situation", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7]"
                  >
                    <option value="">Select an option</option>
                    <option value="using">I use adaptive mobility equipment now</option>
                    <option value="exploring">
                      I am exploring options for myself
                    </option>
                    <option value="va">I am working with the VA</option>
                    <option value="vr">
                      I am working with Vocational Rehabilitation / Workforce
                      Services
                    </option>
                    <option value="unsure">I'm not sure where to start</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormStep(2)}
                    className="flex-1 py-4 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setFormStep(4)}
                    className="flex-1 py-4 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {formStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Tell Us More About Your Needs
                </h3>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    What adaptive equipment do you currently use or need help
                    with?
                  </label>
                  <textarea
                    value={formData.adaptive_equipment}
                    onChange={(e) => handleFormChange("adaptive_equipment", e.target.value)}
                    placeholder="e.g., wheelchair lift, transfer seat, hand controls..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-[#f5f5f7] min-h-[100px]"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormStep(3)}
                    className="flex-1 py-4 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "See If I Qualify"
                    )}
                  </button>
                </div>
                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
              </motion.div>
            )}

            {/* Step 5 - Confirmation */}
            {formStep === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#0071e3]" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  Thanks for reaching out!
                </h3>
                <p className="text-black/60 text-lg mb-8">
                  {submitMessage || "Our team will review your information and reach out within 24 hours with next steps and support options in your area."}
                </p>
                <p className="text-sm text-black/50">
                  You can expect to hear from us soon.
                </p>
              </motion.div>
            )}

            {formStep < 5 && (
              <p className="text-center text-sm text-black/50 mt-8">
                ✓ This does not obligate you to purchase anything.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              What Happens Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualificationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-black/60">{step.desc}</p>

                {i < qualificationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-1 bg-gradient-to-r from-[#0071e3] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Questions? We're Here to Help
            </h2>
            <p className="text-xl text-black/60">
              Find answers to common questions about Adapy for individual users.
            </p>
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
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                >
                  <span className="text-lg font-bold text-black text-left">
                    {faq.q}
                  </span>
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

      {/* Final CTA */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore Your Options?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            The first step is simple—tell us about your situation, and we'll help guide what comes next.
          </p>
          <button
            onClick={() => scrollToSection("form")}
            className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 inline-flex items-center gap-2"
          >
            See If You Qualify <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
