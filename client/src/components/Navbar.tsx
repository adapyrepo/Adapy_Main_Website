import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
import { MobilityTicker } from "./MobilityTicker";

interface NavItem {
  name: string;
  href?: string;
  dropdown?: {
    title: string;
    description: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  { name: "Platform", href: "/platform" },
  {
    name: "Hardware",
    dropdown: [
      { title: "Smart Hub", description: "The brain of the adaptive vehicle", href: "/hardware/smart-hub" },
      { title: "Harness Integration", description: "Seamless equipment connectivity", href: "/hardware/harness-integration" },
      { title: "Wireless Controllers", description: "Flexible mounting-free control", href: "/hardware/wireless-controllers" },
      { title: "Safety Modules", description: "Proactive environmental protection", href: "/hardware/safety-modules" },
    ],
  },
  {
    name: "Software",
    dropdown: [
      { title: "Dealer Dashboard", description: "Operational visibility & tracking", href: "/software/dealer" },
      { title: "CDRS Portal", description: "Client equipment visibility", href: "/software/cdrs" },
      { title: "Manufacturer Analytics", description: "Real-world performance data", href: "/software/analytics" },
    ],
  },
  {
    name: "Solutions",
    dropdown: [
      { title: "Individual Adaptive Vehicles", description: "Personal mobility environments", href: "/solutions/individual" },
      { title: "Dealer Networks", description: "Scale your installation workflow", href: "/solutions/dealers" },
      { title: "NEMT Fleet Intelligence", description: "Fleet-scale safety & monitoring", href: "/solutions/nemt" },
      { title: "Government & VA", description: "Compliance & reporting automation", href: "/solutions/government" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [location, isOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
        scrolled 
          ? "bg-black/90 backdrop-blur-lg border-white/10 shadow-lg py-2" 
          : "bg-black/80 backdrop-blur-md border-white/10 py-4"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={adapyLogo} alt="Adapy" className="h-8 w-auto invert brightness-0" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-[14px] font-medium transition-colors rounded-full",
                    location === item.href ? "text-white bg-white/10" : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className={cn(
                    "px-4 py-2 text-[14px] font-medium flex items-center gap-1 transition-colors rounded-full",
                    activeDropdown === item.name ? "text-white bg-white/10" : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === item.name && "rotate-180")} />
                </button>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === item.name && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="grid gap-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className="group/item p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                        >
                          <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                            {sub.title}
                          </div>
                          <div className="text-[12px] text-white/50 leading-tight mt-0.5">
                            {sub.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden xl:block">
            <MobilityTicker />
          </div>
          <a 
            href="https://admin.adapy.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors group"
          >
            <UserCircle className="w-5 h-5 group-hover:text-[#0071e3] transition-colors" />
            <span className="text-[14px] font-medium">Login</span>
          </a>
          
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black z-[99] lg:hidden flex flex-col p-8 pt-24"
            >
              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <div key={item.name} className="flex flex-col gap-4 text-left">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-2xl font-bold text-white hover:text-[#0071e3] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-white/40 uppercase tracking-widest text-xs">
                            {item.name}
                          </div>
                          <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                            {item.dropdown?.map((sub) => (
                              <Link key={sub.title} href={sub.href} className="group">
                                <div className="text-lg font-semibold text-white group-hover:text-[#0071e3] transition-colors">
                                  {sub.title}
                                </div>
                                <div className="text-sm text-white/50">{sub.description}</div>
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              
              <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                <a 
                  href="https://admin.adapy.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <UserCircle className="w-6 h-6" />
                  Login
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
