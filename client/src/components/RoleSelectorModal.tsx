import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X, User, Store, Brain, Ambulance, Cog } from "lucide-react";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";

interface RoleSelectorModalProps {
  open: boolean;
  onClose: () => void;
}

const roles = [
  { href: "/user-funnel", label: "Personal Use", Icon: User },
  { href: "/dealer-funnel", label: "Dealer", Icon: Store },
  { href: "/contact", label: "CDRS / OT", Icon: Brain },
  { href: "/solutions/nemt", label: "NEMT Fleet", Icon: Ambulance },
  { href: "/contact", label: "Manufacturer", Icon: Cog },
];

export function RoleSelectorModal({ open, onClose }: RoleSelectorModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900 z-[250] overflow-hidden flex flex-col"
          data-testid="modal-role-selector"
        >
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/10 px-6 py-6 flex items-center justify-center">
            <img
              src={adapyLogo}
              alt="Adapy"
              className="h-8 w-auto invert brightness-0"
            />
          </div>

          <div
            className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-black/40 hover:text-black transition-colors"
                data-testid="button-close-role-selector"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Let&rsquo;s Build Your Adapy System
                </h2>
                <p className="text-black/60 mb-12 text-lg">
                  Choose your role to see how Adapy works for you
                </p>

                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                  {roles.map(({ href, label, Icon }) => (
                    <Link key={label} href={href}>
                      <button
                        onClick={onClose}
                        className="w-full min-h-[60px] py-4 px-6 border-2 border-black text-black rounded-2xl font-medium hover:bg-black hover:text-white transition-all text-base leading-relaxed flex items-center justify-center gap-3"
                        data-testid={`button-role-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {label}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-t border-white/10 px-6 py-4 flex items-center justify-between text-white/75 text-xs">
            <div>© 2026 Adapy. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
