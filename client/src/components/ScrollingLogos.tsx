import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const logos = [
  { name: "Brand 1", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+1" },
  { name: "Brand 2", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+2" },
  { name: "Brand 3", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+3" },
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
    <div className="bg-[#1d1d1f]/90 backdrop-blur-md py-4 md:py-6 overflow-hidden border-t border-white/5 w-full relative group">
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
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              className="h-5 md:h-8 w-auto grayscale invert opacity-40 hover:opacity-100 transition-all duration-300 mx-4"
            />
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
