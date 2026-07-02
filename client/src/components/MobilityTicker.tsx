import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Info, Share2, Mail, Link2, Check, ChevronRight } from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiWhatsapp } from "react-icons/si";

// Deterministic per-day pseudo-random in [200, 250]
function dailyIncrement(dayIndex: number) {
  let h = dayIndex * 2654435761;
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  const r = (h >>> 0) / 4294967296;
  return 200 + Math.floor(r * 51); // 200..250
}

const BASE_COUNT = 218707;
const BASE_DATE = Date.UTC(2026, 3, 17); // April 17, 2026
const MS_PER_DAY = 86_400_000;

function computeMomentCount(now: number) {
  const daysSince = Math.floor((now - BASE_DATE) / MS_PER_DAY);
  let total = BASE_COUNT;
  for (let i = 0; i < daysSince; i++) {
    total += dailyIncrement(i);
  }
  // Smoothly accumulate today's increment across the day
  if (daysSince >= 0) {
    const todayInc = dailyIncrement(daysSince);
    const fraction = ((now - BASE_DATE) % MS_PER_DAY) / MS_PER_DAY;
    total += Math.floor(todayInc * fraction);
  }
  return total;
}

export function MobilityTicker() {
  // Pre-built data with a distinct up-down-up movement
  const [data, setData] = useState([
    40, 50, 65, 80, 100, 120, 140, 150, // Up
    140, 120, 100, 85, 70, 60, 55, 65,  // Down
    80, 100, 125, 150, 180, 210, 240, 260 // Back Up
  ]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [momentCount, setMomentCount] = useState(() => computeMomentCount(Date.now()));

  const shareUrl = "https://www.adapy.com";
  const shareMessage =
    "Discover Adapy — adaptive mobility technology on a mission to create one million Moments of Mobility for wheelchair users before 2028. Learn how we're making independence just a tap away.";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMessage = encodeURIComponent(shareMessage);

  const shareTargets = [
    {
      name: "Facebook",
      testId: "share-facebook",
      icon: <SiFacebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
    },
    {
      name: "X",
      testId: "share-x",
      icon: <SiX className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      testId: "share-linkedin",
      icon: <SiLinkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      testId: "share-whatsapp",
      icon: <SiWhatsapp className="w-4 h-4" />,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareMessage} ${shareUrl}`)}`,
    },
    {
      name: "Email",
      testId: "share-email",
      icon: <Mail className="w-4 h-4" />,
      href: `mailto:?subject=${encodeURIComponent("Learn more about Adapy's mission")}&body=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  // Recompute the live count on a steady cadence
  useEffect(() => {
    const tick = setInterval(() => {
      setMomentCount(computeMomentCount(Date.now()));
    }, 60_000);
    return () => clearInterval(tick);
  }, []);

  const formattedCount = momentCount.toLocaleString();

  // Animate the sparkline data with volatility that preserves the overall shape
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        
        // Random variation with a slight upward bias to maintain momentum at the end
        const variation = (Math.random() - 0.4) * 25; 
        
        const nextVal = Math.max(40, Math.min(280, lastVal + variation));
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
      onMouseLeave={() => {
        setShowTooltip(false);
        setShowShare(false);
      }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold leading-none mb-1 flex items-center gap-1">
          Mobility Moments
          <Info className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-mono font-bold text-white tracking-tight">{formattedCount}</span>
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
              We've logged <span className="text-white font-bold">{formattedCount}</span> adaptive automation cycles—what we call Moments of Mobility—and we're just getting started. Each one represents a real user operating adaptive equipment through Adapy®.
            </p>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-4">
              <p className="text-[13px] text-white/90">
                <span className="text-[#0071e3] font-bold">Our goal:</span> 1 Million "Moments of Mobility" by 2028.
              </p>
            </div>
            <p className="text-white/50 text-[12px] leading-relaxed italic mb-4">
              Join us as we transform the future of adaptive mobility—where independence is just a tap away. If you are a user, dealer, manufacturer, CDRS professional, Vehicle Modifier, etc. you can help!
            </p>

            <button
              type="button"
              onClick={() => setShowShare((v) => !v)}
              aria-expanded={showShare}
              className="w-full flex items-center justify-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-bold rounded-xl px-4 py-2.5 transition-colors"
              data-testid="button-share-mission"
            >
              <Share2 className="w-4 h-4" />
              Help Share Our Mission
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${showShare ? "rotate-90" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {showShare && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/50 text-[11px] leading-relaxed mt-4 mb-3">
                    Invite others to learn more about Adapy and our mission to help wheelchair users one million times before 2028.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {shareTargets.map((target) => (
                      <a
                        key={target.name}
                        href={target.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white/80 hover:text-white text-[12px] font-medium transition-colors"
                        data-testid={target.testId}
                      >
                        {target.icon}
                        {target.name}
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white/80 hover:text-white text-[12px] font-medium transition-colors"
                      data-testid="button-share-copy"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Link2 className="w-4 h-4" />
                      )}
                      {copied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
