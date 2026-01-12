import { motion } from "framer-motion";

const logos = [
  { name: "Brand 1", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+1" },
  { name: "Brand 2", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+2" },
  { name: "Brand 3", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+3" },
  { name: "Brand 4", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+4" },
  { name: "Brand 5", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+5" },
  { name: "Brand 6", url: "https://placehold.co/200x80/000000/FFFFFF?text=BRAND+6" },
];

export function ScrollingLogos() {
  return (
    <div className="bg-[#1d1d1f]/90 backdrop-blur-md py-8 md:py-12 overflow-hidden border-t border-white/5 w-full">
      <div className="relative flex items-center">
        <motion.div
          className="flex whitespace-nowrap gap-24 items-center"
          animate={{
            x: [0, -1500],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              className="h-10 md:h-16 w-auto grayscale invert opacity-40 hover:opacity-100 transition-all duration-300 mx-8"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
