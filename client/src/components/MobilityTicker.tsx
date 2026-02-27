import { motion } from "framer-motion";

export function MobilityTicker() {
  // Pre-built data for the sparkline (month of mobility moments)
  const data = [45, 52, 48, 61, 55, 67, 72, 68, 81, 75, 88, 92, 85, 98, 105, 95, 110, 115, 108, 122, 128, 120, 135, 142, 138, 150, 155, 148, 162, 175];
  
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const width = 80;
  const height = 20;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - minValue) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-1.5 transition-all hover:bg-white/10">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold leading-none mb-1">Mobility Moments</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-mono font-bold text-white tracking-tight">75,482</span>
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
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Subtle area fill */}
          <motion.path
            d={`M 0,${height} L ${points} L ${width},${height} Z`}
            fill="url(#sparkline-gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071e3" stopOpacity="1" />
              <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
