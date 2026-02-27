import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Adaptive Vehicle Owner",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    quote: "Adapy unified all my equipment into one simple interface. It changed how I interact with my van daily.",
    videoUrl: "#"
  },
  {
    name: "Michael R.",
    role: "NEMT Fleet Manager",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    quote: "The safety monitoring and GPS tracking give us peace of mind. We can proactively manage our fleet's health.",
    videoUrl: "#"
  },
  {
    name: "David K.",
    role: "Mobility Dealer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    quote: "The Adapy platform is the missing layer in the industry. It makes every installation cleaner and smarter.",
    videoUrl: "#"
  }
];

export function TestimonialScroller() {
  const controls = useAnimationControls();

  return (
    <div className="bg-transparent py-4 md:py-6 overflow-hidden border-t border-white/5 w-full relative group">
      <div className="relative flex items-center">
        <motion.div
          className="flex whitespace-nowrap gap-8 items-center"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl min-w-[400px] hover:bg-white/10 transition-colors cursor-pointer group/card"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
              </div>
              <div className="flex flex-col whitespace-normal">
                <p className="text-white/80 text-sm italic line-clamp-2 mb-1">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-xs">{t.name}</span>
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
