import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Smartphone, Search, ShoppingBag } from "lucide-react";
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
    <header className="apple-navbar">
      <div className="max-w-[1024px] mx-auto h-full px-4 flex justify-between items-center">
        {/* Adapy Logo */}
        <Link href="/" className="z-[101] hover:opacity-80 transition-opacity">
          <img src={adapyLogo} alt="Adapy" className="h-4 w-auto brightness-0" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-between flex-1 max-w-[800px] px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="apple-navbar-link"
            >
              {link.name}
            </Link>
          ))}
          <button className="apple-navbar-link p-0">
            <Search className="w-4 h-4" />
          </button>
          <button className="apple-navbar-link p-0">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden z-[101]">
          <button className="text-black/80 hover:text-black transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-black/80 hover:text-black transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button
            className="text-black/80 hover:text-black transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[100] pt-12 px-10 md:hidden overflow-y-auto"
            >
              <nav className="flex flex-col mt-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-2xl font-semibold text-white/90 hover:text-white py-3 border-b border-white/10"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
