import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Marc Andrus RRT, MBA",
    role: "Homecare Surveyor for the Joint Commission",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    quote: "I believe there is a substantial need in the market for Adapy and the services it provides for safe and convenient mobility.",
    videoUrl: "#"
  },
  {
    name: "Russ Newton",
    role: "President, NMEDA Canada/ Board Member NMEDA USA",
    image: "/images/russ-newton.jpeg",
    quote: "Throughout my tenure as NMEDA Canada President, few innovations match the potential impact of Adapy's solutions.",
    videoUrl: "#"
  },
  {
    name: "Craig E. Rogers, CDRS, CDI, CDLE",
    role: "Alabama Department of Rehabilitation Services",
    image: "/images/craig-rogers.png",
    quote: "I am encouraged by Adapy's engagement with States like Alabama and Texas, where the implementation of new technology is critical for CDRS professionals.",
    videoUrl: "#"
  },
  {
    name: "Cody Howell",
    role: "President, Howell Ventures, Ltd. (SureGrip)",
    image: "/images/cody-howell.png",
    quote: "Adapy's products address a significant need in the industry by providing adaptive equipment solutions that prioritize safety, reliability, and accessibility.",
    videoUrl: "#"
  },
  {
    name: "Brandon Higgs, OTR, MSOT, CDRS",
    role: "H&T Drivers Rehabilitation Specialists, LLC",
    image: "/images/brandon-higgs.jpeg",
    quote: "Adapy's platform offers an innovative approach to integrating adaptive equipment, providing a higher level of accessibility, customization, and freedom for individuals with disabilities.",
    videoUrl: "#"
  },
  {
    name: "Shawn Carver",
    role: "General Manager, Mobility Works",
    image: "/images/shawn-carver.jpeg",
    quote: "Your product meets a critical need in enhancing the safety, functionality, and data-driven management of adaptive equipment.",
    videoUrl: "#"
  },
  {
    name: "Brian K. Griffin",
    role: "President, Griffin Mobility",
    image: "/images/brian-griffin.png",
    quote: "Adapy's technology fills a vital gap in the adaptive equipment market by offering solutions that not only improve accessibility but also deliver functionality and freedom.",
    videoUrl: "#"
  }
];

export function TestimonialScroller() {
  const controls = useAnimationControls();
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

  return (
    <>
      <div className="bg-transparent py-4 md:py-6 overflow-hidden border-t border-white/5 w-full relative group">
        <div className="relative flex items-center">
          <motion.div
            className="flex whitespace-nowrap gap-8 items-center"
            animate={{
              x: [0, -3000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 100,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedTestimonial(t)}
                className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl min-w-[400px] h-[120px] hover:bg-white/10 transition-colors cursor-pointer group/card"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div className="flex flex-col whitespace-normal flex-1 overflow-hidden">
                  <p className="text-white/80 text-sm italic line-clamp-2 mb-1">"{t.quote}"</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-white font-bold text-xs truncate">{t.name}</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider truncate">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedTestimonial(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 rounded-3xl border border-white/10 p-8 md:p-12 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={selectedTestimonial.image} alt={selectedTestimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-white font-bold">{selectedTestimonial.name}</div>
                  <div className="text-white/60 text-sm">{selectedTestimonial.role}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-white/80 text-lg italic leading-relaxed">"{selectedTestimonial.quote}"</p>
          </motion.div>
        </div>
      )}
    </>
  );
}
