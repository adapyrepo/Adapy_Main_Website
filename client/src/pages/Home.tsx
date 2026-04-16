import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { TestimonialScroller } from "@/components/TestimonialScroller";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Network,
  Cloud,
  AlertTriangle,
  EyeOff,
  Scale,
  Accessibility,
  ArrowRight,
  X,
  User,
  Store,
  Brain,
  Ambulance,
  Cog,
} from "lucide-react";
import { useState } from "react";

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

// Testimonials reframed around the problem each person had before Adapy.
const userProfiles = [
  {
    image: userPhoto1,
    name: "Truck Conversion Owner",
    role: "Before Adapy",
    pain: "Two remotes, a key fob, and a phone app — nothing talked to each other. Half the time something wouldn't respond and I'd have to call my dealer from the parking lot.",
    outcome: "Now everything runs through one interface. The integration feels factory.",
  },
  {
    image: userPhoto2,
    name: "Transfer Seat User",
    role: "Before Adapy",
    pain: "Balancing on the seat with a pendant in each hand was a daily fight. One slip and the pendant was on the floor — or worse, in the door.",
    outcome: "The mobile app is a redundant backup. I never juggle controls again.",
  },
  {
    image: userPhoto3,
    name: "Lift Owner",
    role: "Before Adapy",
    pain: "I had no idea my lift was wearing out until it failed in a parking garage in the rain. There was no warning, no service reminder, nothing.",
    outcome: "I get a notification before things break. My dealer reaches out first.",
  },
  {
    image: userPhoto4,
    name: "Crane User",
    role: "Before Adapy",
    pain: "Operating my crane in snow or summer heat was miserable. I was outside the vehicle, exposed, every single trip.",
    outcome: "I run everything from inside the cab. Weather doesn't decide my day anymore.",
  },
];

import { VideoTestimonialScroller } from "@/components/VideoTestimonialScroller";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
const heroVideo = "/hero-video.mp4";

export default function Home() {
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<
    (typeof learningVideos)[0] | null
  >(null);

  const handleGetStartedClick = () => {
    setIsRoleSelectorOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar onGetStarted={handleGetStartedClick} />
      </div>

      {/* HERO — problem-first */}
      <section className="relative h-screen min-h-[700px] flex flex-col overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.35)_45%,transparent_75%)] z-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 z-30" />
        </div>

        <div className="relative z-40 flex flex-col flex-1">
          <div className="flex-1 flex flex-col items-start justify-end text-left px-6 md:px-12 lg:px-24 pb-20">
            <div className="max-w-[640px] w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start"
              >
                <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-4">
                  The Status Quo Is Costing You
                </span>
                <h1 className="text-[28px] md:text-[44px] lg:text-[56px] font-bold leading-[1.05] tracking-tight text-white mb-5">
                  Every day, adaptive vehicles fail silently —
                  <br className="hidden md:block" />
                  <span className="text-white/80">
                    {" "}and no one knows until it&rsquo;s too late.
                  </span>
                </h1>
                <p className="text-[14px] md:text-[17px] text-white/70 max-w-[520px] mb-8 leading-relaxed">
                  A pendant slammed in a door. A lift that gave no warning. A
                  CO sensor no one was watching. The adaptive industry has
                  advanced — its infrastructure has not.
                </p>

                <button
                  onClick={() => setIsRoleSelectorOpen(true)}
                  className="px-7 py-3 bg-[#0071e3] text-white rounded-full font-bold text-[14px] hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-[0.97] shadow-xl shadow-[#0071e3]/20 inline-flex items-center gap-2"
                  data-testid="button-hero-get-started"
                >
                  See What Changes With Adapy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          <div className="w-full opacity-70 hover:opacity-100 transition-opacity duration-500">
            <TestimonialScroller />
          </div>
        </div>
      </section>

      {/* PROBLEM CHAPTER 1 — Fragmentation */}
      <section className="py-32 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase">
                  Chapter 01 — Fragmentation
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                Every device speaks a different language.
                None of them speak to each other.
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                A modern adaptive vehicle is a stack of equipment from a dozen
                different manufacturers — lifts, ramps, transfer seats, hand
                controls, cranes, securement systems. Each one ships with its
                own pendant, its own remote, its own diagnostic tool. None of
                them share a single signal.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                For the user, that means juggling. For the dealer, that means
                guessing. For the fleet, that means flying blind.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-3">
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
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0071e3] flex-shrink-0" />
                  <span className="font-medium text-white/80 text-sm">
                    {text}
                  </span>
                </div>
              ))}
              <div className="mt-6 p-5 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/30">
                <div className="text-3xl font-bold text-white mb-1">
                  12+
                </div>
                <p className="text-sm text-white/70">
                  separate devices in a typical adaptive setup, each with its
                  own controller{" "}
                  <span className="text-white/40">[source needed]</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM CHAPTER 2 — Invisible failures */}
      <section className="py-32 bg-[#111] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#0071e3]/10 to-transparent border border-white/[0.08] rounded-3xl p-8">
                <EyeOff className="w-10 h-10 text-[#0071e3] mb-6" />
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">
                      ~70%
                    </div>
                    <p className="text-sm text-white/60">
                      of adaptive equipment failures originate from pendant
                      damage — slammed in doors, crushed in seats, dropped on
                      pavement{" "}
                      <span className="text-white/40">[source needed]</span>
                    </p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">
                      0
                    </div>
                    <p className="text-sm text-white/60">
                      usage-cycle data points captured by today&rsquo;s
                      adaptive equipment{" "}
                      <span className="text-white/40">[source needed]</span>
                    </p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">
                      AVG.
                    </div>
                    <p className="text-sm text-white/60">
                      time between first warning sign and total failure:
                      none{" "}
                      <span className="text-white/40">[source needed]</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-6 block">
                Chapter 02 — Invisible Failures
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                You only find out when someone is already stranded.
              </h2>
              <p className="text-xl text-white/60 mb-6 leading-relaxed">
                Adaptive equipment doesn&rsquo;t fail loudly. It fails on a
                Tuesday morning, in a parking garage, in the rain. The pendant
                that&rsquo;s been getting slammed in the door for six months
                finally gives up. The lift that&rsquo;s been laboring on a
                weak motor finally stalls. The CO sensor that nobody was
                watching finally crosses a threshold.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                There is no service alert. There is no usage history. There
                is no warning. The first sign of a problem is the problem
                itself — and by then, someone is already stuck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM CHAPTER 3 — Liability & cost exposure */}
      <section className="py-32 bg-[#0a0a0a] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-6 block">
                Chapter 03 — Liability &amp; Cost Exposure
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                When something goes wrong, no one can prove what happened.
              </h2>
              <p className="text-xl text-white/60 mb-6 leading-relaxed">
                Manufacturers reject warranty claims because the dealer
                can&rsquo;t prove fault. The VA, Voc-Rehab, and Workforce
                Services deny replacement requests because there&rsquo;s no
                documented usage data. NEMT operators face Medicaid clawbacks
                and lawsuit exposure because they can&rsquo;t prove the
                vehicle was safe at the time of incident.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                Without telemetry, every dispute is a guess — and the people
                with the most to lose are the ones with the least
                evidence.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  icon: <Scale className="w-6 h-6" />,
                  title: "Rejected warranty claims",
                  body: "No usage data, no proof of fault. The dealer eats the cost.",
                },
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: "Denied funding requests",
                  body: "VA / Voc-Rehab / Workforce Services need justification. There is none.",
                },
                {
                  icon: <Scale className="w-6 h-6" />,
                  title: "Medicaid audit failures",
                  body: "NEMT operators can\u2019t document vehicle safety at time of trip.",
                },
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: "Lawsuit exposure",
                  body: "Without telemetry, every incident becomes a liability case.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <div className="text-[#0071e3] mb-3">{item.icon}</div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
              <p className="text-xs text-white/40 pt-2">
                Cost of a single equipment-related lawsuit settlement:{" "}
                <span className="text-white/60">[source needed]</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM CHAPTER 4 — Lost independence */}
      <section className="py-32 bg-[#111] text-white border-t border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              {[
                {
                  title: "Depending on others",
                  body: "Asking someone to open a door, lower a lift, position a crane — every single trip.",
                },
                {
                  title: "Operating in the weather",
                  body: "Stuck in rain, snow, or heat to control equipment from outside the vehicle — from your chair, with no shelter.",
                },
                {
                  title: "Juggling pendants mid-transfer",
                  body: "Trying to balance during a transfer with a pendant in each hand.",
                },
                {
                  title: "No one to call",
                  body: "When something fails on the road, the dealer is unreachable until Monday.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Accessibility className="w-10 h-10 text-[#0071e3] mb-6" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase mb-6 block">
                Chapter 04 — Lost Independence
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                The cost isn&rsquo;t just money. It&rsquo;s freedom.
              </h2>
              <p className="text-xl text-white/60 mb-6 leading-relaxed">
                Every dropped pendant. Every trip stood up in the rain. Every
                transfer that needed a second pair of hands. Every silent
                failure that ended someone&rsquo;s day. These aren&rsquo;t
                edge cases — they&rsquo;re the daily texture of life with
                fragmented adaptive equipment.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                The promise of adaptive mobility was independence. The
                reality, for most users, is a daily negotiation with
                equipment that doesn&rsquo;t cooperate and doesn&rsquo;t
                explain itself.
              </p>
              <p className="text-sm text-white/40 mt-8">
                % of adaptive users who report at least one
                equipment-related disruption per week:{" "}
                <span className="text-white/60">[source needed]</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL IMPACT — testimonials reframed around the problem */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              Real Voices, Real Friction
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Before Adapy, this was the daily reality.
            </h2>
            <p className="text-xl text-black/60 leading-relaxed">
              These are the moments people stopped accepting as normal.
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
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "object-[75%_center]" : i === 1 ? "object-[27%_center]" : i === 2 ? "object-[50%_center]" : i === 3 ? "object-[center_20%]" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#0071e3] mb-2">
                    {profile.role}
                  </p>
                  <p className="text-sm font-medium text-white/85 mb-3 italic leading-relaxed">
                    &ldquo;{profile.pain}&rdquo;
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-3">
                    {profile.outcome}
                  </p>
                  <h4 className="text-sm font-bold mt-3">{profile.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialScroller
        onVideoSelect={(video) => setActiveVideo(video)}
      />

      {/* SOLUTION — compressed "What we built in response" (~20%) */}
      <section className="py-28 bg-[#f5f5f7]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-widest text-[#0071e3] uppercase block mb-4">
              What We Built In Response
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              One platform. One signal. Total visibility.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Adapy is the missing infrastructure layer — a Smart Hub in the
              vehicle, connectivity across every device, and a cloud
              intelligence layer that finally tells everyone what&rsquo;s
              actually happening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-black/[0.05] shadow-sm">
              <Cpu className="w-10 h-10 text-[#0071e3] mb-5" />
              <h3 className="text-xl font-bold mb-3">Smart Hub</h3>
              <p className="text-black/60 leading-relaxed text-sm">
                The brain of the adaptive vehicle. Centralizes control and
                monitoring across compatible mobility equipment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-black/[0.05] shadow-sm">
              <Network className="w-10 h-10 text-[#0071e3] mb-5" />
              <h3 className="text-xl font-bold mb-3">Connectivity</h3>
              <p className="text-black/60 leading-relaxed text-sm">
                Harnesses, wireless controllers, and safety sensors that pull
                every device into one unified environment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-black/[0.05] shadow-sm">
              <Cloud className="w-10 h-10 text-[#0071e3] mb-5" />
              <h3 className="text-xl font-bold mb-3">Cloud Intelligence</h3>
              <p className="text-black/60 leading-relaxed text-sm">
                Dashboards, usage reports, and lifecycle analytics for
                dealers, fleets, and the people who fund replacement
                equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND TRUST STRIP */}
      <section className="py-20 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-shrink-0">
              <div className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="block text-white/70">Driving innovation</span>
                <span className="block text-white/70">across adaptive</span>
                <span className="block text-[#0071e3] font-bold">
                  mobility brands
                </span>
              </div>
            </div>
            <div className="flex-1 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 w-full">
              <ScrollingLogos />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING ASK — single role-selector CTA (~10%) */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Find out what changes for you.
          </h2>
          <p className="text-lg text-black/60 mb-10 leading-relaxed">
            The story is different depending on who you are — a wheelchair
            user, a mobility dealer, or a fleet operator. Pick your path
            and we&rsquo;ll show you exactly what shifts.
          </p>
          <button
            onClick={() => setIsRoleSelectorOpen(true)}
            className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-lg hover:bg-[#0077ed] transition-all shadow-lg shadow-[#0071e3]/20 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            data-testid="button-closing-get-started"
          >
            Choose Your Path
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />

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
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/10 px-6 py-6 flex items-center justify-center">
              <img
                src={adapyLogo}
                alt="Adapy"
                className="h-8 w-auto invert brightness-0"
              />
            </div>

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
                <button
                  onClick={() => setIsRoleSelectorOpen(false)}
                  className="absolute top-6 right-6 p-2 text-black/40 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                    Let&rsquo;s Build Your Adapy System
                  </h2>
                  <p className="text-black/60 mb-12 text-lg">
                    Choose your role to see how Adapy works for you
                  </p>

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

            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-t border-white/10 px-6 py-4 flex items-center justify-between text-white/60 text-xs">
              <div>© 2026 Adapy. All rights reserved.</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
