import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";

export function MobilityTicker() {
  const [data, setData] = useState([45, 52, 48, 61, 55, 67, 72, 68, 81, 75, 88, 92, 85, 98, 105, 95, 110, 115, 108, 122, 128, 120, 135, 142, 138, 150, 155, 148, 162, 175]);
  const [showTooltip, setShowTooltip] = useState(false);

  // Animate the sparkline data
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const variation = (Math.random() - 0.5) * 15;
        const nextVal = Math.max(40, Math.min(200, lastVal + variation));
        return [...newData, nextVal];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = Math.max(1, maxValue - minValue);
  const width = 80;
  const height = 20;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - minValue) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div 
      className="relative flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-1.5 transition-all hover:bg-white/10 cursor-help group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold leading-none mb-1 flex items-center gap-1">
          Mobility Moments
          <Info className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-mono font-bold text-white tracking-tight">134,322</span>
          <span className="text-[10px] text-[#0071e3] font-bold">+12.4%</span>
        </div>
      </div>
      
      <div className="w-20 h-6 relative mt-1">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <motion.polyline
            fill="none"
            stroke="#0071e3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            initial={false}
            animate={{ points }}
            transition={{ duration: 1.5, ease: "linear" }}
          />
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071e3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-[110]"
          >
            <h4 className="text-[#0071e3] font-bold text-sm uppercase tracking-widest mb-3">Moment of mobility</h4>
            <p className="text-white text-[15px] font-medium leading-snug mb-4">
              Let's Create a Million Moments of Mobility Together!
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              We've logged <span className="text-white font-bold">134,322</span> adaptive automation cycles—what we call Moments of Mobility—and we're just getting started. Each one represents a real user operating adaptive equipment through Adapy®.
            </p>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-4">
              <p className="text-[13px] text-white/90">
                <span className="text-[#0071e3] font-bold">Our goal:</span> 1 Million "Moments of Mobility" by 2027.
              </p>
            </div>
            <p className="text-white/50 text-[12px] leading-relaxed italic">
              Join us as we transform the future of adaptive mobility—where independence is just a tap away. If you are a user, dealer, manufacturer, CDRS professional, Vehicle Modifier, etc. you can help!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
