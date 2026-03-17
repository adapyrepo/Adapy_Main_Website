import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    setupFee: "$1,495",
    description: "Get started with essential mobility features",
    cta: "Get Started",
    ctaLink: "/contact",
    highlighted: false,
    features: [
      { name: "Adaptive Equipment Controls", included: true },
      { name: "Mobile app access", included: true },
      { name: "Up to 3 devices", included: true },
      { name: "Standard support", included: true },
      { name: "Dashboard Access", included: false },
      { name: "Maintenance Reporting", included: false },
      { name: "GPS Tracking", included: false },
      { name: "Emergency Alert", included: false },
      { name: "Temperature Sensor", included: false },
      { name: "Battery Sensor", included: false },
      { name: "Basic Analytics", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Essential",
    price: "$24",
    period: "/month",
    setupFee: "$1,895",
    description: "The Latest in Smart Controls & Reporting",
    cta: "Start Free Trial",
    ctaLink: "/contact",
    highlighted: false,
    features: [
      { name: "Advanced adaptive equipment controls", included: true },
      { name: "Mobile app access", included: true },
      { name: "Up to 25 devices", included: true },
      { name: "GPS Tracking", included: true },
      { name: "Emergency Alert", included: true },
      { name: "Air Quality Sensor", included: true },
      { name: "Temperature Sensor", included: true },
      { name: "Cloud connectivity", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$48",
    period: "/month",
    setupFee: "$2,495",
    description: "Enjoy the peace of mind knowing your vehicle is connected to the latest in smart mobility",
    cta: "Start Free Trial",
    ctaLink: "/contact",
    highlighted: true,
    features: [
      { name: "Full platform access", included: true },
      { name: "Mobile app access", included: true },
      { name: "Unlimited devices", included: true },
      { name: "Cloud connectivity", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email & chat support", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom integrations available", included: true },
    ],
  },
  {
    name: "NEMT",
    price: "Fleet Pricing Available",
    setupFee: "$3,495",
    monthlyPerVehicle: "$38/month per vehicle",
    description: "Enterprise solution for NEMT fleets and large organizations",
    cta: "Contact Sales",
    ctaLink: "/contact",
    highlighted: false,
    isNEMT: true,
    features: [
      { name: "White-label solutions", included: true },
      { name: "Unlimited devices & users", included: true },
      { name: "Custom fleet management tools", included: true },
      { name: "Advanced compliance reporting", included: true },
      { name: "Real-time fleet tracking", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Dedicated infrastructure", included: true },
      { name: "Full API & custom integrations", included: true },
    ],
  },
];

const allFeatures = [
  "Wheelchair controls",
  "Device management",
  "Mobile app",
  "Cloud connectivity",
  "Analytics",
  "Support level",
  "Customization",
  "Compliance tools",
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-bold mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-white/70 mb-8"
            >
              Choose the right plan for your mobility needs. All plans include 14-day free trial.
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "rounded-2xl p-8 relative overflow-hidden",
                    tier.isNEMT
                      ? "bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 border border-blue-700/50 shadow-2xl"
                      : tier.highlighted
                      ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl scale-105 md:scale-110"
                      : "bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  )}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold py-2 text-center">
                      Most Popular
                    </div>
                  )}

                  <div className={tier.highlighted ? "mt-8" : ""}>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-white/60 text-sm mb-6 h-10">{tier.description}</p>

                    <div className="mb-6">
                      <div className={cn("font-bold mb-1", tier.isNEMT ? "text-2xl" : "text-5xl")}>{tier.price}</div>
                      {tier.isNEMT && <div className="text-white/60 text-sm mt-1">upon request</div>}
                      {!tier.isNEMT && (
                        <>
                          {tier.period && <div className="text-white/60 text-sm">{tier.period}</div>}
                          <div className="text-white/60 text-xs mt-2">Hardware & Installation: {tier.setupFee}</div>
                          <div className="text-blue-400 text-xs mt-1">Ships Next Day</div>
                        </>
                      )}
                    </div>

                    <Link
                      href={tier.ctaLink}
                      className={cn(
                        "block w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors mb-8 text-sm",
                        tier.isNEMT
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                          : tier.highlighted
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                      )}
                    >
                      {tier.cta}
                    </Link>

                    <div className="space-y-4">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {feature.included ? (
                              <Check className="w-5 h-5 text-blue-400" />
                            ) : (
                              <div className="w-5 h-5 rounded border border-white/20" />
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-sm",
                              feature.included ? "text-white" : "text-white/40"
                            )}
                          >
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Detailed Comparison</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                      {pricingTiers.map((tier) => (
                        <th key={tier.name} className="px-6 py-4 text-center text-sm font-semibold text-white">
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Wheelchair Controls", free: true, essential: true, pro: true, nemt: true },
                      { label: "Device Management", free: true, essential: true, pro: true, nemt: true },
                      { label: "Mobile App", free: true, essential: true, pro: true, nemt: true },
                      { label: "Cloud Connectivity", free: false, essential: true, pro: true, nemt: true },
                      { label: "Basic Analytics", free: false, essential: true, pro: true, nemt: true },
                      { label: "Advanced Analytics", free: false, essential: false, pro: true, nemt: true },
                      { label: "Email Support", free: true, essential: true, pro: true, nemt: true },
                      { label: "Priority Support", free: false, essential: false, pro: true, nemt: true },
                      { label: "24/7 Support", free: false, essential: false, pro: false, nemt: true },
                      { label: "Custom Integrations", free: false, essential: false, pro: true, nemt: true },
                      { label: "White-Label", free: false, essential: false, pro: false, nemt: true },
                      { label: "Compliance Reporting", free: false, essential: false, pro: false, nemt: true },
                    ].map((feature, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{feature.label}</td>
                        {[
                          feature.free,
                          feature.essential,
                          feature.pro,
                          feature.nemt,
                        ].map((included, tierIdx) => (
                          <td key={tierIdx} className="px-6 py-4 text-center">
                            {included ? (
                              <Check className="w-5 h-5 text-blue-400 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 rounded border border-white/20 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Can I upgrade or downgrade my plan?",
                  a: "Yes, you can change your plan at any time. Changes take effect at your next billing cycle.",
                },
                {
                  q: "Do you offer annual discounts?",
                  a: "Yes, we offer 20% off annual plans. Contact our sales team for more information.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, wire transfers, and custom payment arrangements for enterprise plans.",
                },
                {
                  q: "Is there a long-term contract required?",
                  a: "No, all plans are month-to-month. Enterprise NEMT plans may include custom terms.",
                },
                {
                  q: "What's included in the free trial?",
                  a: "Your free 14-day trial includes full access to your selected plan with all features enabled.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-white/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-white/70 mb-8">
              Choose your plan and start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors border border-white/10"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}