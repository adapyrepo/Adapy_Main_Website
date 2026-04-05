import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { TestimonialScroller } from "@/components/TestimonialScroller";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Activity,
  ShieldCheck,
  Cpu,
  Network,
  Cloud,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Thermometer,
  Battery,
  Navigation,
  Lock,
  X,
  Play,
  User,
  Store,
  Brain,
  Ambulance,
  Cog,
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";

const learningVideos = [
  {
    id: "1",
    title: "Smart Hub Overview",
    description:
      "Learn how the Adapy Smart Hub centralizes your vehicle's controls.",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/4iFLVtzXsSg",
  },
  {
    id: "2",
    title: "Safety & Monitoring",
    description:
      "Discover our proactive safety intelligence and sensor integration.",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/IRsWYQFkg-8",
  },
  {
    id: "3",
    title: "Cloud Intelligence",
    description: "How fleet operators use Adapy for real-time visibility.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/IRsWYQFkg-8",
  },
];

import userPhoto1 from "@assets/modifier_1772655358581.png";
import userPhoto2 from "@assets/Screenshot_2025-04-15_at_4.41.42_PM_1772655386210.png";
import userPhoto3 from "@assets/adapy_copy_1772660123249.png";
import userPhoto4 from "@assets/Screenshot_2026-03-04_at_1.33.58_PM_1772656449413.png";
import phoneHand from "@assets/DSC02786-removebg_1772656599209.png";

const userProfiles = [
  {
    image: userPhoto1,
    name: "ATC Mobility",
    role: "Fully Supports ATC Mobility Conversions",
    quote:
      "Adapy gives me the confidence to take my truck anywhere. The integration is so clean, it feels like it was built into the chassis from day one.",
  },
  {
    image: userPhoto2,
    name: "Transfer Seats",
    role: "Supports the majority of transfer seats/platforms",
    quote:
      "The unified control system means I no longer have to worry about multiple remotes. Everything just works.",
  },
  {
    image: userPhoto3,
    name: "Wheelchair Lifts",
    role: "Fully Support BraunAbility and Ricon Lifts",
    quote:
      "Adapy's seamless integration has completely changed how I interact with my vehicle. It's freedom, redefined.",
  },
  {
    image: userPhoto4,
    name: "Wheelchair Cranes",
    role: "Fully Support Bruno & Harmar",
    quote:
      "My truck adaptation is done! Having Adapy controls for my lift and seat makes every journey so much easier. Truly life-changing.",
  },
];

import { VideoTestimonialScroller } from "@/components/VideoTestimonialScroller";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
import heroVideo from "@assets/Adapy_BG_video_(1)_1773087296929.mp4";
import award1 from "@assets/Globee_Award_1772663910071.png";
import award2 from "@assets/Plaza_Pitch_Award_1772663910071.png";
import award3 from "@assets/SR_50_Award_1772663910072.png";
import award4 from "@assets/US_patent_Award_1772663910072.png";
import award5 from "@assets/UTU_Award_1772663910072.png";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProduct = products?.find((p) => p.isFeatured) || products?.[0];
  const [textIndex, setTextIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<
    (typeof learningVideos)[0] | null
  >(null);

  const handleGetStartedClick = () => {
    setIsRoleSelectorOpen(true);
  };

  const benefitStatements = [
    "Adaptive Equipment, Finally Unified",
    "Too Many Remotes. Too Much Failure",
    "Adaptive Tech Is Broken. We Fixed It.",
    "Stop Juggling Controls.",
    "Outdated Systems Don’t Belong in Modern Mobility.",
    "Complexity Is the Enemy of Independence.",
    "“Good Enough” Isn’t Good Enough Anymore.",
    "This Is What Adaptive Tech Should Have Been.",
    "We Didn’t Add Another Device. We Replaced the Problem.",
    "Adaptive Equipment Should Work Together—or Not Exist at All.",
    "One System. Zero Excuses.",
    "This Is What Happens When Accessibility Is Taken Seriously.",
    "If It Takes Multiple Remotes, It’s Already Failed.",
    "We Didn’t Simplify Adaptive Tech. We Rebuilt It.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % benefitStatements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [benefitStatements.length]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar onGetStarted={handleGetStartedClick} />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex flex-col overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Enhanced Overlay with Spotlight Effect */}
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.5px] z-10" />
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(600px circle at 50% 50%, rgba(0,113,227,0.1), transparent 80%)",
                  "radial-gradient(600px circle at 40% 40%, rgba(0,113,227,0.1), transparent 80%)",
                  "radial-gradient(600px circle at 60% 60%, rgba(0,113,227,0.1), transparent 80%)",
                  "radial-gradient(600px circle at 50% 50%, rgba(0,113,227,0.1), transparent 80%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </div>
          {/* Targeted Vignette: Darker bottom-left, lighter elsewhere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_40%,transparent_70%)] z-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-30" />
        </div>

        <div className="relative z-40 flex flex-col flex-1">
          <div className="flex-1 flex flex-col items-start justify-end text-left px-6 md:px-12 lg:px-24 pb-20 relative">
            <div className="max-w-[400px] w-full flex flex-col items-start justify-center min-h-[180px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start"
              >
                <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[1.1] tracking-tight text-white mb-4 uppercase">
                  Mobility Should Never Operate in Isolation.
                </h1>

                <p className="text-[13px] md:text-[15px] text-white/70 max-w-[350px] mb-6 leading-relaxed">
                  Adapy transforms adaptive vehicles into intelligent, connected
                  environments — delivering proactive safety, unified control,
                  and lifecycle visibility.
                </p>

                <div className="flex flex-row gap-4 justify-start items-center whitespace-nowrap">
                  <button
                    onClick={() => setIsSliderOpen(true)}
                    className="px-6 py-2.5 bg-[#0071e3] text-white rounded-full font-bold text-[14px] hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-[0.97] shadow-xl shadow-[#0071e3]/20"
                  >
                    Explore the Ecosystem
                  </button>
                  <button
                    onClick={() => setIsRoleSelectorOpen(true)}
                    className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-[14px] hover:bg-white/20 transition-all transform hover:scale-105 active:scale-[0.97]"
                  >
                    Watch 2-Min Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="w-full opacity-70 hover:opacity-100 transition-opacity duration-500">
            <TestimonialScroller />
          </div>
        </div>
      </section>

      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
                The Industry Gap
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
                Adaptive Mobility Has Advanced.
                <br />
                The Infrastructure Has Not.
              </h2>
              <p className="text-xl text-black/60 mb-8 leading-relaxed">
                Today’s adaptive vehicles operate in isolation. As mobility
                solutions become more complex, the industry lacks a connected
                backbone.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Equipment functions independently",
                "No centralized monitoring",
                "Limited safety visibility",
                "No lifecycle analytics",
                "Minimal real-time diagnostics",
                "No unified intelligence layer",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-black/[0.03] border border-black/[0.05]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
                  <span className="font-medium text-black/80">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3 — THE ADAPY ECOSYSTEM & SMART HUB */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 text-center max-w-4xl mb-20">
          <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
            The Adapy Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            One Platform. Multiple Layers. Total Visibility.
          </h2>
          <p className="text-xl text-black/60 leading-relaxed">
            At the center of every connected adaptive vehicle is the Adapy Smart
            Hub — the brain of the system. One vehicle. One intelligent control
            layer.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm">
              <Cpu className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Smart Hub</h3>
              <p className="text-black/60 leading-relaxed mb-6">
                The Brain of the Adaptive Vehicle. Centralizes control and
                monitoring across compatible mobility equipment.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-device integration",
                  "Equipment diagnostics",
                  "Usage reporting",
                  "Real-time alerts",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Zap className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm md:mt-8">
              <Network className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Connectivity</h3>
              <p className="text-black/60 leading-relaxed mb-6">
                Seamlessly connects adaptive equipment, control interfaces, and
                safety sensors into one unified environment.
              </p>
              <ul className="space-y-3">
                {[
                  "Harness Kits",
                  "Wireless Controllers",
                  "Safety Sensors",
                  "Environmental Monitoring",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Layers className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-black/[0.05] shadow-sm md:mt-16">
              <Cloud className="w-12 h-12 text-[#0071e3] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Cloud Intelligence</h3>
              <p className="text-black/60 leading-relaxed mb-6">
                Visibility beyond the vehicle. Secure dashboards for dealers,
                manufacturers, and fleet operators.
              </p>
              <ul className="space-y-3">
                {[
                  "Warranty documentation",
                  "Compliance reporting",
                  "Lifecycle analytics",
                  "Fleet management",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <BarChart3 className="w-4 h-4 text-[#0071e3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5 — CONTROL & SAFETY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
                Safety & Monitoring
              </span>
              <h2 className="text-4xl font-bold mb-8">
                Proactive Safety Intelligence
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Thermometer />, label: "Temperature" },
                  { icon: <Battery />, label: "Voltage/Battery" },
                  { icon: <Shield />, label: "CO Detection" },
                  { icon: <Navigation />, label: "GPS Tracking" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-[#f5f5f7] flex flex-col items-center text-center"
                  >
                    <div className="mb-4 text-[#0071e3]">{item.icon}</div>
                    <span className="font-bold text-sm uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-black/60 leading-relaxed text-lg">
                The Adapy platform expands through intelligent monitoring
                modules, creating a layered safety architecture. Safety becomes
                proactive — not reactive.
              </p>
            </div>
            <div className="bg-black text-white p-12 rounded-[3rem] flex flex-col justify-center">
              <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
                Control Integration
              </span>
              <h2 className="text-4xl font-bold mb-8">
                Unified Control Environment
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold mb-2">Harness Kits</h4>
                  <p className="text-white/60">
                    Purpose-built integration kits designed for specific
                    equipment models. Multiple kits can operate within a single
                    installation.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">
                    Wireless Controllers
                  </h4>
                  <p className="text-white/60">
                    For locations where traditional mounting is not possible —
                    such as inside transfer seats — Adapy enables secure
                    wireless integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SCALABLE DEPLOYMENT */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              Scalable Deployment
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              From Individual Vehicles to Fleet Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white border border-black/[0.05]">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Personal Mobility</h3>
              <p className="text-black/60 leading-relaxed">
                Connected, intelligent environments for individual adaptive
                vehicles and dealer networks.
              </p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-black/[0.05]">
              <div className="w-12 h-12 bg-[#0071e3] text-white rounded-2xl flex items-center justify-center mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                NEMT Fleet Intelligence
              </h3>
              <p className="text-black/60 leading-relaxed">
                Fleet-scale monitoring including environmental safety alerts,
                GPS tracking, and adaptive equipment oversight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>

        {/* Phone Hand Background Asset */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-60 pointer-events-none hidden lg:block translate-x-10 translate-y-20">
          <img
            src={phoneHand}
            alt=""
            className="w-full h-full object-contain object-right-bottom brightness-125"
          />
        </div>

        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 leading-[1.1]">
            The Future of Adaptive Mobility Is Connected
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {["Control", "Safety", "Intelligence", "Visibility"].map(
              (word, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-[#0071e3] mb-4" />
                  <span className="text-lg font-bold uppercase tracking-[0.2em]">
                    {word}
                  </span>
                </div>
              ),
            )}
          </div>

          <p className="text-xl text-white/60 mb-12">
            Adapy creates the digital infrastructure layer the adaptive industry
            has been missing. All unified.
          </p>
        </div>
      </section>

      {/* Supporting Top Brands Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Left side text */}
            <div className="flex-shrink-0">
              <div className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block text-white/80">Driving innovation</span>
                <span className="block text-white/80">across adaptive</span>
                <span className="block text-[#0071e3] font-bold">mobility brands</span>
              </div>
            </div>
            
            {/* Right side scrolling logos */}
            <div className="flex-1 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <ScrollingLogos />
            </div>
          </div>
        </div>
      </section>

      {/* USER PROFILES SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              Real Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Designed for People, Powered by Intelligence.
            </h2>
            <p className="text-xl text-black/60 leading-relaxed">
              We build technology that disappears into the background, so you
              can focus on the foreground of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userProfiles.map((profile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-[#f5f5f7]"
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "object-[75%_center]" : i === 1 ? "object-[27%_center]" : i === 2 ? "object-[50%_center]" : i === 3 ? "object-[center_20%]" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-sm font-medium text-white/70 mb-2 italic">
                    "{profile.quote}"
                  </p>
                  <h4 className="text-xl font-bold">{profile.name}</h4>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#0071e3] mt-1">
                    {profile.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialScroller
        onVideoSelect={(video) => setActiveVideo(video)}
      />

      {/* FINAL CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Embrace The Future
          </h2>
          <p className="text-xl text-black/60 mb-12 leading-relaxed">
            Whether you are a user, dealer, manufacturer, healthcare
            professional, or fleet operator — We invite you to join adapy and
            support our mission to improve mobility.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <button className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-lg hover:scale-105 active:scale-95">
                Explore the Platform
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-black/90 transition-all shadow-lg hover:scale-105 active:scale-95">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Vertical Teaser Button */}
      {!isSliderOpen && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => setIsSliderOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-[#0071e3] text-white py-4 px-2 rounded-l-xl shadow-2xl flex items-center gap-2 transition-colors hover:bg-[#0077ed]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <Play className="w-3 h-3 fill-current rotate-90" />
          <span className="font-bold text-[10px] tracking-widest uppercase">
            See How It Works
          </span>
        </motion.button>
      )}

      {/* Video Slider Drawer */}
      <AnimatePresence>
        {isSliderOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSliderOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[120] p-8 shadow-2xl flex flex-col border-l border-black/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-bold text-black">
                    How It Works
                  </h3>
                  <button
                    onClick={() => setIsSliderOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full text-black/70 hover:text-black transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                  {learningVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className="group cursor-pointer space-y-4"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-black/5 bg-black shadow-md">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#0071e3] text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-black group-hover:text-[#0071e3] transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-black/60 text-sm leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-black/10">
                  <button 
                    onClick={() => {
                      setIsSliderOpen(false);
                      setIsRoleSelectorOpen(true);
                    }}
                    className="w-full py-4 bg-[#0071e3] text-white rounded-2xl font-bold hover:bg-[#0077ed] transition-all shadow-lg shadow-[#0071e3]/20"
                  >
                    Watch 2-Min Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Selector Modal */}
      <AnimatePresence>
        {isRoleSelectorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRoleSelectorOpen(false)}
            className="fixed inset-0 bg-slate-900 z-[250] overflow-hidden flex flex-col"
          >
            {/* Header with Logo */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/10 px-6 py-6 flex items-center justify-center">
              <img src={adapyLogo} alt="Adapy" className="h-8 w-auto invert brightness-0" />
            </div>

            {/* Main Content */}
            <div 
              className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsRoleSelectorOpen(false)}
                  className="absolute top-6 right-6 p-2 text-black/40 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Centered Content */}
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Let's Build Your Adapy System</h2>
                  <p className="text-black/60 mb-12 text-lg">Choose your role to see how Adapy works for you</p>
                  
                  <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                    <Link href="/user-funnel">
                      <button 
                        onClick={() => setIsRoleSelectorOpen(false)}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                      >
                        <User className="w-5 h-5 flex-shrink-0" />
                        Personal Use
                      </button>
                    </Link>
                    <Link href="/dealer-funnel">
                      <button 
                        onClick={() => setIsRoleSelectorOpen(false)}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                      >
                        <Store className="w-5 h-5 flex-shrink-0" />
                        Dealer
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button 
                        onClick={() => setIsRoleSelectorOpen(false)}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                      >
                        <Brain className="w-5 h-5 flex-shrink-0" />
                        CDRS / OT
                      </button>
                    </Link>
                    <Link href="/solutions/nemt">
                      <button 
                        onClick={() => setIsRoleSelectorOpen(false)}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                      >
                        <Ambulance className="w-5 h-5 flex-shrink-0" />
                        NEMT Fleet
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button 
                        onClick={() => setIsRoleSelectorOpen(false)}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                      >
                        <Cog className="w-5 h-5 flex-shrink-0" />
                        Manufacturer
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-t border-white/10 px-6 py-4 flex items-center justify-between text-white/60 text-xs">
              <div>© 2026 Adapy. All rights reserved.</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
