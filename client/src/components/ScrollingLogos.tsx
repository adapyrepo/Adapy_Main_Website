import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import braunabilityLogo from "@assets/braunability_1772217975241.png";
import brunoLogo from "@assets/bussani-mobility-bruno_logo_1772218097103.png";
import riconLogo from "@assets/ricon-logo-png-transparent_1772218202005.png";

const logos = [
  { name: "BraunAbility", url: braunabilityLogo },
  { name: "Bruno", url: brunoLogo },
  { name: "Ricon", url: riconLogo },
  { name: "Brand 4", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+4" },
  { name: "Brand 5", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+5" },
  { name: "Brand 6", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+6" },
];

export function ScrollingLogos() {
  const controls = useAnimationControls();

  const handleManualScroll = (direction: 'left' | 'right') => {
    controls.stop();
    controls.start({
      x: direction === 'left' ? 0 : -1000,
      transition: { duration: 2, ease: "easeOut" }
    }).then(() => {
      controls.start({
        x: [0, -1000],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 80,
            ease: "linear",
          },
        }
      });
    });
  };

  return (
    <div className="bg-transparent py-4 md:py-6 overflow-hidden border-t border-white/5 w-full relative group">
      <button 
        onClick={() => handleManualScroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="relative flex items-center">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={controls}
          initial={{ x: 0 }}
          onViewportEnter={() => {
            controls.start({
              x: [0, -1000],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 80,
                  ease: "linear",
                },
              }
            });
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center h-8 md:h-12 w-40 mx-4">
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-full max-w-full object-contain grayscale invert opacity-40 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <button 
        onClick={() => handleManualScroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
