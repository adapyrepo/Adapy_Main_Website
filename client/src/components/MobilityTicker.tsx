import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, Share2, Mail, Link2, Check, ChevronRight } from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiWhatsapp } from "react-icons/si";

import { useMobilityMoments } from "@/lib/mobilityMoments";

export function MobilityTicker() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const { formattedCount } = useMobilityMoments();

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
        </div>
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
