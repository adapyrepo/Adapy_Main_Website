import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Smartphone, 
  Settings, 
  Bell, 
  ShieldCheck, 
  Activity, 
  History, 
  HeartPulse,
  Share2
} from "lucide-react";
import { Link } from "wouter";
import appMockup from "@assets/adapy_home_phone_1772663805994.png";
import { useSEO } from "@/hooks/use-seo";

export default function IndividualSolutions() {
  useSEO({
    title: "Adaptive Mobility Solutions for Wheelchair Users & Families",
    description: "Personal mobility environments built around independence, safety, and dignity — for wheelchair users, adaptive drivers, and families with wheelchair accessible vehicles.",
    path: "/solutions/individual",
    image: appMockup,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/" },
      { name: "Individuals & Families", path: "/solutions/individual" },
    ],
    keywords: "wheelchair user mobility, wheelchair accessible vehicle owner, adaptive vehicle for families, wheelchair van solutions, accessible transportation, mobility independence",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Adapy for Individuals & Families",
      provider: { "@type": "Organization", name: "Adapy", url: "https://adapy.com" },
      serviceType: "Personal adaptive mobility platform",
      audience: { "@type": "PeopleAudience", audienceType: "Wheelchair users and families" },
      areaServed: "United States",
    },
  });
  const benefits = [
    {
      title: "Simplified Control",
      desc: "One app for all your equipment. No more juggling multiple remotes for your lift, seat, and doors.",
      icon: <Smartphone className="w-8 h-8 text-[#0071e3]" />
    },
    {
      title: "Predictive Maintenance",
      desc: "Get alerts before issues arise. We track equipment cycles and battery health to keep you moving.",
      icon: <Settings className="w-8 h-8 text-[#0071e3]" />
    },
    {
      title: "Digital Service History",
      desc: "Always know when your vehicle was last serviced. Access complete logs for your dealer in seconds.",
      icon: <History className="w-8 h-8 text-[#0071e3]" />
    },
    {
      title: "Safety Notifications",
      desc: "Real-time alerts for CO detection, extreme temperatures, and battery voltage drops.",
      icon: <Bell className="w-8 h-8 text-[#0071e3]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#f5f5f7]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">Personal Mobility</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Your Mobility, <br />Connected.
            </h1>
            <p className="text-xl md:text-2xl text-black/60 mb-10 leading-relaxed mx-auto max-w-2xl">
              The Adapy App transforms your vehicle into an intelligent environment, putting total control and proactive safety in the palm of your hand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all shadow-lg">
                  Get Started
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-12 opacity-80 hover:opacity-100 transition-opacity">
              <a href="#" className="hover:scale-105 transition-transform bg-black rounded-xl p-0.5 border border-white/10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download the Adapy app on the App Store" loading="lazy" decoding="async" className="h-10 w-auto" />
              </a>
              <a href="#" className="hover:scale-105 transition-transform bg-black rounded-xl p-0.5 border border-white/10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get the Adapy app on Google Play" loading="lazy" decoding="async" className="h-10 w-auto" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Experience */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative flex items-center justify-center">
              <img 
                src={appMockup} 
                alt="Adapy mobile app interface for controlling adaptive wheelchair vehicle equipment"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-w-md drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8">Intelligence in Your Pocket</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
                    <Activity className="w-6 h-6 text-[#0071e3]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Real-Time Equipment Status</h4>
                    <p className="text-black/60">Instantly see if your lift is deployed, your battery is low, or if a service interval is approaching.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
                    <HeartPulse className="w-6 h-6 text-[#0071e3]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Proactive Safety Monitoring</h4>
                    <p className="text-black/60">Our sensors monitor CO levels and temperature, sending push notifications if conditions become unsafe.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
                    <Share2 className="w-6 h-6 text-[#0071e3]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Remote Accessibility</h4>
                    <p className="text-black/60">Open doors and deploy ramps from your phone before you even reach the vehicle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenence Section */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Zero-Guess Maintenance</h2>
            <p className="text-xl text-black/60">We track the health of your adaptive equipment so you don't have to.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
              <History className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Equipment Life-Cycle Tracking</h3>
              <p className="text-black/60 leading-relaxed">Every time you use your lift or ramp, Adapy logs the cycle. This data helps predict when maintenance is needed, preventing unexpected failures.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
              <ShieldCheck className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Warranty Compliance</h3>
              <p className="text-black/60 leading-relaxed">Keep your equipment under warranty by ensuring regular service intervals are met. Adapy provides the proof of service history dealers need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-[#f5f5f7] hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Take Control of Your Independence</h2>
          <p className="text-xl text-white/60 mb-12">Join thousands of users who have upgraded their mobility experience with Adapy.</p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
