import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Headphones,
  ArrowRight,
  Activity,
  AlertCircle,
  FileText,
  Wrench,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function DealerFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      icon: <Activity className="w-8 h-8 text-[#0071e3]" />,
      title: "Real-Time Equipment Data",
      desc: "Live connectivity status and operational telemetry from every Adapy-connected vehicle in your fleet.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0071e3]" />,
      title: "Increase Revenue Opportunities",
      desc: "Add a premium solution that creates new upsell and install opportunities.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#0071e3]" />,
      title: "Simplify the Customer Experience",
      desc: "Reduce control complexity by bringing multiple adaptive functions into one intelligent system.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#0071e3]" />,
      title: "Dealer Support Included",
      desc: "Get onboarding, training, and support to help your team sell and install with confidence.",
    },
  ];

  const dashboardFeatures = [
    {
      icon: <Activity className="w-6 h-6 text-[#0071e3]" />,
      title: "Real-Time Equipment Data",
      description: "Live connectivity status and operational telemetry from every Adapy-connected vehicle in your fleet.",
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-[#0071e3]" />,
      title: "Automated Maintenance Alerts",
      description: "Proactive notifications based on cycle counts, runtime, or diagnostic fault codes.",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0071e3]" />,
      title: "Warranty Justification",
      description: "One-click PDF reports combining session logs and diagnostics to streamline warranty claims.",
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#0071e3]" />,
      title: "Remote Troubleshooting",
      description: "View real-time relay states and sensor readings to diagnose issues without a truck roll.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#0071e3]" />,
      title: "Fleet-Wide Analytics",
      description: "Identify service opportunities and track equipment reliability across your entire customer base.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0071e3]" />,
      title: "VA & Voc-Rehab Friendly",
      description: "Standardized reporting packets designed to meet the rigorous documentation needs of funding sources.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Apply for Dealer Access",
      desc: "Tell us about your dealership and market.",
    },
    {
      number: "2",
      title: "Review the Platform",
      desc: "See how Adapy works, what it supports, and how it fits your customers.",
    },
    {
      number: "3",
      title: "Launch with Support",
      desc: "Get onboarding, training, and the next steps to start offering Adapy.",
    },
  ];

  const faqs = [
    {
      q: "Who is Adapy a fit for?",
      a: "Adapy is designed for dealers and installers who want to offer their customers a premium, unified adaptive mobility control solution. If you serve the adaptive mobility market and want to differentiate your offerings, you're a perfect fit.",
    },
    {
      q: "Do you provide dealer onboarding?",
      a: "Yes. We provide comprehensive onboarding, training, and ongoing support to help your team successfully sell and install Adapy. Our dealer success team is committed to your launch.",
    },
    {
      q: "How do dealers get started?",
      a: "Start by requesting dealer access. We'll review your application, schedule a platform walkthrough, and guide you through the onboarding process. Once approved, you'll have access to all dealer resources and support.",
    },
    {
      q: "Can I see a demo before committing?",
      a: "Absolutely. We offer live platform demos and can walk you through real-world use cases relevant to your customer base. Contact us to schedule your personalized demo.",
    },
    {
      q: "What happens after I request access?",
      a: "Our dealer partnerships team will contact you within 24 hours to confirm your request, answer initial questions, and schedule a platform review. From there, we'll guide you through onboarding at your pace.",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
                Grow Your Dealership with Adapy
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-lg">
                Offer a smarter adaptive mobility experience with connected controls, streamlined setup, and a premium technology platform built for modern mobility dealers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => scrollToSection("form")}
                  className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 flex items-center gap-2"
                >
                  Request Dealer Access <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("demo")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  Watch Dealer Demo
                </button>
              </div>

              <p className="text-sm text-white/60">
                ⏱️ We are currently onboarding a limited number of new dealer partners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#0071e3]/20 to-transparent border border-white/10 p-8">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-24 h-24 text-[#0071e3] mx-auto mb-4 opacity-50" />
                    <p className="text-white/60">Platform Overview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              Adapy Dealer Dashboard
            </span>
            <h2 className="text-5xl font-bold text-black mb-6">
              A Powerful Command Center for Your Service Department
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Turn equipment data into maintenance revenue with real-time fleet monitoring and proactive service alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-black/[0.05] hover:shadow-lg transition-shadow"
              >
                <div className="mb-6 p-3 bg-[#f5f5f7] rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-black/60 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dealers Add Adapy */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              Why Dealers Choose Adapy
            </span>
            <h2 className="text-5xl font-bold text-black mb-6">
              Four Reasons to Add Adapy to Your Offerings
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Adapy gives dealers the tools, platform, and support they need to compete in modern adaptive mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#f5f5f7] rounded-3xl border border-black/[0.05]"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-black/60 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              The Path Forward
            </span>
            <h2 className="text-5xl font-bold mb-6">
              How to Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-2xl mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-1 bg-gradient-to-r from-[#0071e3] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-black/[0.05]"
            >
              <p className="text-black/70 mb-4">
                "Dealers are already installing Adapy in multiple markets."
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0071e3]" />
                <span className="font-medium text-black">Rapid Adoption</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border border-black/[0.05]"
            >
              <p className="text-black/70 mb-4">
                "Expanding dealer presence in the U.S. and Canada."
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0071e3]" />
                <span className="font-medium text-black">Growing Network</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl border border-black/[0.05]"
            >
              <p className="text-black/70 mb-4">
                "Built for the adaptive mobility industry."
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0071e3]" />
                <span className="font-medium text-black">Industry Focused</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scarcity / Offer Section */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Now Accepting New Dealer Partners
            </h2>
            <p className="text-xl text-white/70 mb-8">
              We are selectively expanding our dealer network and prioritizing partners who want to lead with innovation in adaptive mobility.
            </p>

            <ul className="text-left space-y-4 mb-12 max-w-2xl mx-auto">
              {[
                "Dealer onboarding access",
                "Platform walkthrough",
                "Training and support",
                "Opportunity to be considered for future lead distribution",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("form")}
              className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 mx-auto block mb-6"
            >
              Request Dealer Access
            </button>

            <p className="text-sm text-white/60">
              ⏱️ Limited onboarding capacity available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Section Placeholder */}
      <section id="demo" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              See Adapy in Action
            </h2>
            <p className="text-xl text-black/60">
              Watch a 5-minute demo of the Adapy dealer platform.
            </p>
          </div>

          <div className="aspect-video rounded-3xl overflow-hidden bg-black/5 border border-black/10 flex items-center justify-center">
            <div className="text-center">
              <p className="text-black/60 mb-4">Video placeholder</p>
              <p className="text-sm text-black/40">Your dealer demo video will be embedded here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Request Dealer Access
            </h2>
            <p className="text-xl text-black/60">
              Fill out the form below and our dealer partnerships team will be in touch within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/[0.05]">
            <div className="space-y-6">
              <div className="p-8 bg-[#f5f5f7] rounded-2xl border-2 border-dashed border-black/10">
                <p className="text-black/60 text-center">
                  📋 Contact form placeholder
                </p>
                <p className="text-black/40 text-center text-sm mt-2">
                  Your custom form will be integrated here
                </p>
              </div>

              <p className="text-center text-black/60 text-sm">
                We'll collect information about your dealership, current adaptive product offerings, and volume to ensure a great fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-black/60">
              Have questions about becoming an Adapy dealer? We have answers.
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
                className="bg-[#f5f5f7] rounded-2xl overflow-hidden border border-black/[0.05]"
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
            Ready to Grow with Adapy?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join a growing network of innovative dealers transforming adaptive mobility.
          </p>
          <button
            onClick={() => scrollToSection("form")}
            className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0071e3]/30 inline-flex items-center gap-2"
          >
            Request Dealer Access <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
