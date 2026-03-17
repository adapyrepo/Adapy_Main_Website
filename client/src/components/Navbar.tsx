import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, UserCircle, Grid3x3, Smartphone, LayoutDashboard, Zap, Shield, Brain, Eye, Radio } from "lucide-react";
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
    icon?: React.ReactNode;
  }[];
}

interface NavItemExtended extends NavItem {
  features?: {
    title: string;
    description?: string;
    href?: string;
    icon?: React.ReactNode;
  }[];
}

const navItems: NavItemExtended[] = [
  {
    name: "Platform",
    dropdown: [
      { title: "Platform Overview", description: "Unified control architecture", href: "/platform", icon: <Grid3x3 className="w-5 h-5" /> },
      { title: "Hardware", description: "Smart Hub & integrations", href: "/hardware/smart-hub", icon: <Radio className="w-5 h-5" /> },
      { title: "Mobile App", description: "Control on the go", href: "/products", icon: <Smartphone className="w-5 h-5" /> },
      { title: "Dashboard", description: "Fleet intelligence & monitoring", href: "/products", icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
    features: [
      { title: "Compatible Devices", href: "#", icon: <Zap className="w-5 h-5" /> },
      { title: "Safety", href: "#", icon: <Shield className="w-5 h-5" /> },
      { title: "Intelligence", href: "#", icon: <Brain className="w-5 h-5" /> },
      { title: "Visibility", href: "#", icon: <Eye className="w-5 h-5" /> },
    ],
  },
  {
    name: "Solutions",
    dropdown: [
      { title: "Individual Adaptive Vehicles", description: "Personal mobility environments", href: "/solutions/individual" },
      { title: "NEMT Fleet Intelligence", description: "Fleet-scale safety & monitoring", href: "/solutions/nemt" },
      { title: "Government & VA", description: "Compliance & reporting automation", href: "/solutions/government" },
      { title: "Mobility Dealers", description: "Scale your installation workflow", href: "/software/dealer" },
      { title: "CDRS Portal", description: "Client equipment visibility", href: "/software/cdrs" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  {
    name: "Resources",
    dropdown: [
      { title: "Help Center", description: "Getting started & troubleshooting", href: "/resources/help" },
      { title: "Documentation", description: "Technical guides & API reference", href: "/resources/docs" },
      { title: "Community", description: "Connect with other Adapy users", href: "/resources/community" },
      { title: "Contact Us", description: "Reach out with any questions", href: "/contact" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [platformSubmenu, setPlatformSubmenu] = useState<"default" | "hardware" | "mobileapp" | "dashboard">("default");
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
    setPlatformSubmenu("default");
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
                    className={cn(
                      "absolute top-full mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl",
                      item.name === "Platform" ? "left-0 w-[600px]" : "left-1/2 -translate-x-1/2 w-72"
                    )}
                  >
                    {item.name === "Platform" ? (
                      <div className="grid grid-cols-2 gap-0 -mx-6 -my-6">
                        <div className="bg-white/[0.03] px-6 py-6 rounded-l-2xl border-r border-white/10">
                          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-6">Platform</h3>
                          <div className="grid gap-4">
                            {item.dropdown.map((sub) => (
                              (sub.title === "Hardware" || sub.title === "Mobile App" || sub.title === "Dashboard") ? (
                                <button
                                  key={sub.title}
                                  onClick={() => {
                                    if (sub.title === "Hardware") {
                                      setPlatformSubmenu(platformSubmenu === "hardware" ? "default" : "hardware");
                                    } else if (sub.title === "Mobile App") {
                                      setPlatformSubmenu(platformSubmenu === "mobileapp" ? "default" : "mobileapp");
                                    } else if (sub.title === "Dashboard") {
                                      setPlatformSubmenu(platformSubmenu === "dashboard" ? "default" : "dashboard");
                                    }
                                  }}
                                  className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left w-full"
                                >
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    {sub.icon}
                                  </div>
                                  <div>
                                    <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                      {sub.title}
                                    </div>
                                  </div>
                                </button>
                              ) : (
                                <Link
                                  key={sub.title}
                                  href={sub.href}
                                  className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                                >
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    {sub.icon}
                                  </div>
                                  <div>
                                    <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                      {sub.title}
                                    </div>
                                  </div>
                                </Link>
                              )
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/[0.08] px-6 py-6 rounded-r-2xl">
                          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-6">
                            {platformSubmenu === "hardware" ? "Hardware" : platformSubmenu === "mobileapp" ? "Mobile App" : platformSubmenu === "dashboard" ? "Dashboard" : "Key Features"}
                          </h3>
                          <div className="grid gap-4">
                            {platformSubmenu === "hardware" ? (
                              <>
                                <Link href="/hardware/smart-hub" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Radio className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Smart Hub
                                  </div>
                                </Link>
                                <Link href="/hardware/harness-integration" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Radio className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Harness Integration
                                  </div>
                                </Link>
                                <Link href="/hardware/wireless-controllers" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Radio className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Wireless Controllers
                                  </div>
                                </Link>
                                <Link href="/hardware/safety-modules" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Radio className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Safety Modules
                                  </div>
                                </Link>
                              </>
                            ) : platformSubmenu === "mobileapp" ? (
                              <>
                                <Link href="/products" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Smartphone className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Overview
                                  </div>
                                </Link>
                                <a href="#" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Smartphone className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Download iOS
                                  </div>
                                </a>
                                <a href="#" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <Smartphone className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Download Android
                                  </div>
                                </a>
                              </>
                            ) : platformSubmenu === "dashboard" ? (
                              <>
                                <Link href="#" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <LayoutDashboard className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Individual User
                                  </div>
                                </Link>
                                <Link href="/software/dealer" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <LayoutDashboard className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Dealer
                                  </div>
                                </Link>
                                <Link href="#" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <LayoutDashboard className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    Driving Rehab Specialist
                                  </div>
                                </Link>
                                <Link href="/solutions/nemt" className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    <LayoutDashboard className="w-5 h-5" />
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    NEMT
                                  </div>
                                </Link>
                              </>
                            ) : (
                              item.features?.map((feature) => (
                                <a
                                  key={feature.title}
                                  href={feature.href}
                                  className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                                >
                                  <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                                    {feature.icon}
                                  </div>
                                  <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                                    {feature.title}
                                  </div>
                                </a>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
            <MobilityTicker />
          </div>
          <a 
            href="https://admin.adapy.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:flex items-center px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[14px] font-medium">Login</span>
          </a>
          <Link href="/contact" className="hidden sm:flex items-center justify-center px-6 py-2 bg-[#0071e3] text-white rounded-full font-medium text-[14px] hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#0071e3]/20">
            Get started
          </Link>
          
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
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  Login
                </a>
                <Link
                  href="/contact"
                  className="w-full py-4 bg-[#0071e3] text-white rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-[#0077ed] transition-all"
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
