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
    <div className="bg-white py-12 overflow-hidden border-b border-black/5">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-black/40">
          Trusted by Industry Leaders
        </p>
      </div>
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              className="h-8 md:h-12 w-auto grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
