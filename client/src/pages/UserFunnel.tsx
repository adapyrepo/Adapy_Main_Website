import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  CloudRain,
  HandHelping,
  Radio,
  Activity,
  Wrench,
  MessageCircle,
  Smartphone,
  Bell,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import adapyAppScreenshot from "@assets/IMG_D38D5EC67E04-1_1776390060488.jpeg";

export default function UserFunnel() {
  useSEO({ title: "Adaptive Vehicle Independence for Drivers & Families", description: "Reclaim independence behind the wheel. Adapy unifies your adaptive vehicle equipment into one safe, weatherproof, in-cabin control system.", path: "/user-funnel" });
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
        "https://omffhncmajcazsthtccn.supabase.co/functions/v1/api-lead-submit/qualify-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _form_slug: "qualify-form",
            _api_key:
              "31e0c85a9c7850bd625cf2df0348df3ecfc08ae984eeb623940887763ed9445d",
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

      setSubmitMessage(
        data.message || "Thank you! We will be in touch shortly.",
      );
      setFormStep(5);
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

  // Problem chapters — drawn directly from real user-supplied pain points.
  const problemChapters = [
    {
      icon: <HandHelping className="w-7 h-7" />,
      eyebrow: "Chapter 01 — Dependence",
      title: "You shouldn't have to ask someone to start your day.",
      body: "Opening the door. Lowering the lift. Positioning the crane. Every trip begins with a request — to a partner, a parent, a friend, a stranger. Adaptive equipment was supposed to give you independence. Today, for most users, it just rearranges who you depend on.",
      stat: "% of adaptive users who report needing help with vehicle equipment at least weekly",
    },
    {
      icon: <CloudRain className="w-7 h-7" />,
      eyebrow: "Chapter 02 — The Weather Doesn't Care",
      title: "Sitting in the rain to operate your own vehicle.",
      body: "Cranes, ramps, and lifts are still controlled from outside the vehicle on most setups. That means rain. Snow. Summer heat. You're exposed to the weather every time you transfer — stuck out in it from your chair when the entire job could be done from the warmth and safety of your garage or your seat. Users who've made the switch describe it as life-changing.",
      stat: "Average minutes per trip spent operating equipment outdoors",
    },
    {
      icon: <Radio className="w-7 h-7" />,
      eyebrow: "Chapter 03 — Pendant Failure",
      title: "The pendant is the single biggest point of failure.",
      body: "Slammed in a door. Crushed in a transfer seat. Dropped on pavement. Frayed by the cable. The little plastic remote that controls your lift is the most fragile thing in your vehicle — and when it dies, the whole system dies with it. A mobile app that mirrors every pendant function is the redundant backup that should have existed all along.",
      stat: "~70% of adaptive equipment failures originate from pendant damage",
    },
    {
      icon: <Activity className="w-7 h-7" />,
      eyebrow: "Chapter 04 — Mid-Transfer",
      title: "A pendant in each hand is no way to keep your balance.",
      body: "Anyone who's done a transfer knows the moment — half-supported, mid-pivot, trying to operate one pendant for the seat and another for the door. One slip, one dropped controller, and the whole sequence falls apart. The controls should adapt to you, not the other way around.",
      stat: "Reported near-falls per year tied to control juggling during transfers",
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      eyebrow: "Chapter 05 — Preventable Failures",
      title: "By the time it breaks, no one knows why.",
      body: "Adaptive equipment doesn't track its own usage. There's no cycle count. No wear log. No warning before the motor gives up on a Tuesday morning in a parking garage. Every failure that could have been caught with a simple service reminder happens anyway — because the data was never being collected.",
      stat: "Average lead time between first warning sign and complete failure: none",
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      eyebrow: "Chapter 06 — When Something Goes Wrong",
      title: "There's no fast line to your dealer in an emergency.",
      body: "When the lift won't deploy at 7am, your dealer is a voicemail box and a Monday morning callback. There's no chat thread. No diagnostic snapshot. No way to send them what's actually happening on your vehicle right now. You're alone with the problem until business hours resume.",
      stat: "Average time to reach a mobility dealer outside business hours",
    },
  ];

  const solutionPoints = [
    {
      icon: <Smartphone className="w-8 h-8 text-[#0071e3]" />,
      title: "A mobile app that backs up every pendant",
      desc: "Run your lift, ramp, seat, and doors from your phone. When the pendant fails, your day doesn't.",
    },
    {
      icon: <Bell className="w-8 h-8 text-[#0071e3]" />,
      title: "Usage tracking that warns you first",
      desc: "Cycle counts, battery health, and service alerts before something breaks — not after.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#0071e3]" />,
      title: "A direct line to your dealer",
      desc: "Chat your dealer from inside the app, with diagnostic context already attached.",
    },
  ];

  const faqs = [
    {
      q: "Do I need to know if I qualify before reaching out?",
      a: "No. Just tell us where you are and we'll help you understand what's possible.",
    },
    {
      q: "Can Adapy help if I am working with the VA?",
      a: "Yes. Many users pursue Adapy through VA funding. Our team can help guide that process.",
    },
    {
      q: "Do I need to buy directly from Adapy?",
      a: "No. Adapy works with authorized dealers in your area. We help connect you with the right partner.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* HERO — visceral scene */}
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-black to-slate-900 overflow-hidden">
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
                For Adaptive Vehicle Users
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                It&rsquo;s 7am. The lift won&rsquo;t deploy.
                <span className="block text-white/70">Again.</span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
                The pendant got slammed in the door last week. The cable
                feels loose. There was no warning. And your dealer
                won&rsquo;t pick up until 9. You&rsquo;re going to be late
                — and there&rsquo;s nothing you can do about it from
                inside the vehicle.
              </p>

              <button
                onClick={() => scrollToSection("form")}
                className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2 w-fit"
                data-testid="button-hero-cta"
              >
                See If Adapy Could Help
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-white/50 mt-6">
                Funding may be available through the VA, Vocational
                Rehabilitation, or Workforce Services.
              </p>
            </motion.div>

            {/* HERO — phone mockup */}
            <motion.div
              className="lg:col-span-5 hidden lg:flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              aria-hidden="true"
            >
              <div className="relative">
                <div className="absolute -inset-10 bg-[#0071e3]/20 blur-3xl rounded-full -z-10" />
                <div className="w-[320px] h-[680px] rounded-[3rem] bg-black border-[6px] border-slate-800 shadow-2xl overflow-hidden relative">
                  <img
                    src={adapyAppScreenshot}
                    alt="Adapy mobile app — adaptive vehicle remote control"
                    className="absolute inset-0 w-full h-full object-cover"
                    decoding="async"
                    style={{
                      imageRendering: "auto",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                      WebkitFontSmoothing: "antialiased",
                    }}
                  />
                  {/* Subtle glass: top highlight */}
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 pointer-events-none mix-blend-screen opacity-25"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
                    }}
                  />
                  {/* Subtle glass: diagonal sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 65%)",
                    }}
                  />
                  {/* Inner edge highlight */}
                  <div className="absolute inset-0 rounded-[2.6rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
                  {/* Notch overlay */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                    The pendant&rsquo;s backup &mdash; in your pocket
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM NARRATIVE — six chapters (~70%) */}
      <section className="py-32 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-20 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-4">
              The Daily Reality
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
              Six things adaptive users have stopped accepting as normal.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              These aren&rsquo;t edge cases. They&rsquo;re the texture of
              life with fragmented adaptive equipment — every day, for
              everyone using it.
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
              Here&rsquo;s What&rsquo;s Possible
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
              Three things that change the day.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy doesn&rsquo;t replace your equipment. It adds the
              connective layer that should have been there from the
              beginning — so a slammed pendant, a worn motor, or a stuck
              ramp stop deciding your morning.
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

      {/* Trimmed FAQ — only friction-removing questions, placed BEFORE the form */}
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

      {/* Compressed funding pathways — supports the form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-3xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-1">
                You may already qualify for funding.
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Many users pursue Adapy through the VA, Vocational
                Rehabilitation, or Workforce Services. Mention your
                situation in the form and our team can help guide the
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM — the final ask (~10%) */}
      <section id="form" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">
              Tell us about your situation.
            </h2>
            <p className="text-base text-black/60">
              A few quick questions. Our team will follow up with what
              might fit.
            </p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-10 border border-black/[0.05]">
            {formStep < 5 && (
              <div className="mb-10">
                <div className="flex justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center gap-2 ${
                        step <= formStep ? "text-[#0071e3]" : "text-black/30"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
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
            )}

            {/* Step 1 */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <h3 className="text-xl font-bold text-black mb-4">
                  Your name &amp; contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleFormChange("first_name", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    data-testid="input-first-name"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleFormChange("last_name", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    data-testid="input-last-name"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  data-testid="input-email"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  data-testid="input-phone"
                />
                <button
                  type="button"
                  onClick={() => setFormStep(2)}
                  className="w-full py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                  data-testid="button-step-1-continue"
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
                className="space-y-5"
              >
                <h3 className="text-xl font-bold text-black mb-4">
                  Where are you located?
                </h3>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleFormChange("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  data-testid="input-city"
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  value={formData.state}
                  onChange={(e) => handleFormChange("state", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  data-testid="input-state"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                  data-testid="input-country"
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 py-3.5 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="flex-1 py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                    data-testid="button-step-2-continue"
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
                className="space-y-5"
              >
                <h3 className="text-xl font-bold text-black mb-4">
                  Tell us about your situation
                </h3>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    Which best describes you right now?
                  </label>
                  <select
                    value={formData.situation}
                    onChange={(e) =>
                      handleFormChange("situation", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white"
                    data-testid="select-situation"
                  >
                    <option value="">Select an option</option>
                    <option value="I use adaptive mobility equipment now">
                      I use adaptive mobility equipment now
                    </option>
                    <option value="I am exploring options for myself">
                      I am exploring options for myself
                    </option>
                    <option value="I am working with the VA">
                      I am working with the VA
                    </option>
                    <option value="I am working with Vocational Rehabilitation/Workforce Services">
                      I am working with Vocational Rehabilitation/Workforce
                      Services
                    </option>
                    <option value="I'm not sure where to start">
                      I&rsquo;m not sure where to start
                    </option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="flex-1 py-3.5 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStep(4)}
                    className="flex-1 py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all"
                    data-testid="button-step-3-continue"
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
                className="space-y-5"
              >
                <h3 className="text-xl font-bold text-black mb-4">
                  What equipment are you working with?
                </h3>
                <div>
                  <label className="block text-sm font-bold text-black mb-3">
                    What adaptive equipment do you currently use or need
                    help with?
                  </label>
                  <textarea
                    value={formData.adaptive_equipment}
                    onChange={(e) =>
                      handleFormChange("adaptive_equipment", e.target.value)
                    }
                    placeholder="e.g., wheelchair lift, transfer seat, hand controls..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#0071e3] focus:outline-none bg-white min-h-[100px]"
                    data-testid="input-adaptive-equipment"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="flex-1 py-3.5 border-2 border-black text-black rounded-2xl font-bold hover:bg-black/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    data-testid="button-submit"
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
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#0071e3]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Thanks for reaching out.
                </h3>
                <p className="text-black/60 text-base mb-6">
                  {submitMessage ||
                    "Our team will review your information and reach out within 24 hours."}
                </p>
              </motion.div>
            )}

            {formStep < 5 && (
              <p className="text-center text-sm text-black/50 mt-6">
                ✓ This does not obligate you to purchase anything.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
