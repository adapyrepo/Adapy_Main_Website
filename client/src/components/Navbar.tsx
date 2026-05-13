import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  Accessibility,
  Wrench,
  Bus,
  Stethoscope,
  Grid3x3,
  Radio,
  Cable,
  Gamepad2,
  Shield,
  Smartphone,
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
import { MobilityTicker } from "./MobilityTicker";
import { RoleSelectorModal } from "./RoleSelectorModal";

interface DropdownLink {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownLink[];
  featured?: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}

const navItems: NavItem[] = [
  {
    name: "Who it's for",
    dropdown: [
      {
        title: "Drivers & Families",
        description: "Independence behind the wheel — without the daily friction.",
        href: "/user-funnel",
        icon: <Accessibility className="w-5 h-5" />,
      },
      {
        title: "Mobility Dealers",
        description: "Stop eating warranty disputes. Start owning the data.",
        href: "/dealer-funnel",
        icon: <Wrench className="w-5 h-5" />,
      },
      {
        title: "NEMT Fleets",
        description: "See the invisible risks before they become incidents.",
        href: "/solutions/nemt",
        icon: <Bus className="w-5 h-5" />,
      },
      {
        title: "CDRS & Clinicians",
        description: "Visibility into how your clients actually use their equipment.",
        href: "/software/cdrs",
        icon: <Stethoscope className="w-5 h-5" />,
      },
    ],
    featured: {
      eyebrow: "Not sure where you fit?",
      title: "Talk to our team",
      body: "We'll point you to the right starting place in under 5 minutes.",
      href: "/contact",
      cta: "Contact us",
    },
  },
  {
    name: "Platform",
    dropdown: [
      {
        title: "Platform Overview",
        description: "How the unified control architecture works.",
        href: "/platform",
        icon: <Grid3x3 className="w-5 h-5" />,
      },
      {
        title: "Smart Hub",
        description: "The brain of every adaptive vehicle.",
        href: "/hardware/smart-hub",
        icon: <Radio className="w-5 h-5" />,
      },
      {
        title: "Harness Integration",
        description: "Plug into existing OEM and aftermarket equipment.",
        href: "/hardware/harness-integration",
        icon: <Cable className="w-5 h-5" />,
      },
      {
        title: "Wireless Controllers",
        description: "One device, every function — no more pendants.",
        href: "/hardware/wireless-controllers",
        icon: <Gamepad2 className="w-5 h-5" />,
      },
      {
        title: "Safety Modules",
        description: "Always-on monitoring for lifts, ramps, and cabin conditions.",
        href: "/hardware/safety-modules",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        title: "Mobile App",
        description: "Control and visibility in your pocket.",
        href: "/products",
        icon: <Smartphone className="w-5 h-5" />,
      },
      {
        title: "Dealer Dashboard",
        description: "Fleet-wide install, diagnostic, and warranty data.",
        href: "/software/dealer",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  { name: "Request a Quote", href: "/pricing" },
  {
    name: "Resources",
    dropdown: [
      {
        title: "Blog",
        description: "Stories, research, and field notes from adaptive mobility.",
        href: "/blog",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        title: "Contact",
        description: "Talk to a human about your situation.",
        href: "/contact",
        icon: <MessageSquare className="w-5 h-5" />,
      },
      {
        title: "Pricing & Quote",
        description: "Get a custom quote for your vehicle or fleet.",
        href: "/pricing",
        icon: <Tag className="w-5 h-5" />,
      },
    ],
  },
];

interface NavbarProps {
  onGetStarted?: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      setIsRoleModalOpen(true);
    }
  };

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
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
        scrolled
          ? "bg-black/90 backdrop-blur-lg border-white/10 shadow-lg py-2"
          : "bg-black/80 backdrop-blur-md border-white/10 py-4",
      )}
      data-testid="header-main"
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          data-testid="link-home-logo"
        >
          <img src={adapyLogo} alt="Adapy" className="h-8 w-auto invert brightness-0" />
        </Link>

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
                    location === item.href
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white",
                  )}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.name ? null : item.name)
                  }
                  className={cn(
                    "px-4 py-2 text-[14px] font-medium flex items-center gap-1 transition-colors rounded-full",
                    activeDropdown === item.name
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white",
                  )}
                  data-testid={`button-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      activeDropdown === item.name && "rotate-180",
                    )}
                  />
                </button>
              )}

              <AnimatePresence>
                {activeDropdown === item.name && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className={cn(
                      "absolute top-full mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
                      item.featured
                        ? "left-0 w-[680px] grid grid-cols-[1.4fr_1fr]"
                        : item.dropdown.length > 4
                          ? "left-1/2 -translate-x-1/2 w-[560px] grid grid-cols-2 p-3"
                          : "left-1/2 -translate-x-1/2 w-[340px] p-3",
                    )}
                  >
                    <div
                      className={cn(
                        "grid gap-1",
                        item.featured ? "p-4" : item.dropdown.length > 4 ? "" : "",
                      )}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                          data-testid={`link-dropdown-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {sub.icon && (
                            <div className="text-white/50 group-hover/item:text-[#0071e3] transition-colors flex-shrink-0 mt-0.5">
                              {sub.icon}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-[14px] font-semibold text-white group-hover/item:text-[#0071e3] transition-colors">
                              {sub.title}
                            </div>
                            {sub.description && (
                              <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                {sub.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    {item.featured && (
                      <div className="bg-white/[0.04] border-l border-white/10 p-6 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-3">
                            {item.featured.eyebrow}
                          </div>
                          <div className="text-[18px] font-semibold text-white mb-2">
                            {item.featured.title}
                          </div>
                          <p className="text-[13px] text-white/60 leading-relaxed">
                            {item.featured.body}
                          </p>
                        </div>
                        <Link
                          href={item.featured.href}
                          className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-[#0071e3] text-white rounded-full font-medium text-[13px] hover:bg-[#0077ed] transition-colors"
                          data-testid="link-nav-featured-cta"
                        >
                          {item.featured.cta}
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
            <MobilityTicker />
          </div>
          <a
            href="https://my.adapy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-4 py-2 text-white/70 hover:text-white transition-colors"
            data-testid="link-login"
          >
            <span className="text-[14px] font-medium">Login</span>
          </a>
          <button
            onClick={handleGetStarted}
            className="hidden sm:flex items-center justify-center px-6 py-2 bg-[#0071e3] text-white rounded-full font-medium text-[14px] hover:bg-[#0077ed] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#0071e3]/20"
            data-testid="button-get-started"
          >
            Get started
          </button>

          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
                <nav className="flex flex-col gap-8">
                  {navItems.map((item) => (
                    <div key={item.name} className="flex flex-col gap-4 text-left">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-2xl font-bold text-white hover:text-[#0071e3] transition-colors"
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <div className="text-white/40 uppercase tracking-widest text-xs font-bold">
                            {item.name}
                          </div>
                          <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                            {item.dropdown?.map((sub) => (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                className="group"
                                data-testid={`link-mobile-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                              >
                                <div className="text-lg font-semibold text-white group-hover:text-[#0071e3] transition-colors">
                                  {sub.title}
                                </div>
                                {sub.description && (
                                  <div className="text-sm text-white/50 leading-snug">
                                    {sub.description}
                                  </div>
                                )}
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
                  href="https://my.adapy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-all"
                  data-testid="link-mobile-login"
                >
                  Login
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleGetStarted();
                  }}
                  className="w-full py-4 bg-[#0071e3] text-white rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-[#0077ed] transition-all"
                  data-testid="button-mobile-get-started"
                >
                  Get started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <RoleSelectorModal
        open={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </header>
  );
}
