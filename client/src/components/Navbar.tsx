import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Search, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Store", href: "/products" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Support", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-black/5">
      {/* Top Bar */}
      <div className="bg-[#1d1d1f] py-3 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src={adapyLogo} alt="Adapy" className="h-6 md:h-8 w-auto invert brightness-0" />
          </Link>

          {/* Mission Statement */}
          <p className="hidden lg:block text-[13px] font-medium text-white/60 tracking-tight uppercase">
            Pioneering independence through smart technology
          </p>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a href="tel:+18005550199" className="flex items-center gap-2 text-[14px] font-semibold text-white hover:text-[#0071e3] transition-colors">
              <Phone className="w-4 h-4" />
              <span>1-800-555-0199</span>
            </a>
            <Link href="/contact">
              <button className="hidden sm:block px-5 py-2 bg-[#0071e3] text-white rounded-full font-medium text-[13px] hover:bg-[#0077ed] transition-all">
                Get a Quote
              </button>
            </Link>
            <button className="text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-11 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto h-full flex justify-center items-center relative">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium text-black/80 hover:text-black transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2">
            <button
              className="text-black/80 hover:text-black transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[110px] bg-white border-b border-black/5 z-[99] md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-black/80 hover:text-black border-b border-black/5 pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
