import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation and scroll to top if already on the page
  const handleNavClick = (path, e) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Handle cross-page scrolling (e.g., from About page to Home page footer)
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Slight delay to ensure Home page loads before scrolling
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 🌟 NEW CREATIVE FLOATING NAVBAR 🌟 */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent py-2'}`}>
        <nav className="w-full px-6 sm:px-12 md:px-20 py-3 flex justify-between items-center">

          <Link to="/" onClick={(e) => handleNavClick('/', e)} className="flex items-center">
            <img src="/cv_logo_2.png" alt="CV Pie Logo" className="h-12 w-auto object-contain" />
            <div className="font-medium text-4xl tracking-tighter flex items-center">
              {/* <span className="text-slate-900">CV&nbsp;</span> */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Pie</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 md:gap-20">
            <Link to="/" onClick={(e) => handleNavClick('/', e)} className={`text-xl font-medium transition-all ${isActive('/') ? 'text-purple-600 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-black'}`}>HOME</Link>

            <Link to="/about" onClick={(e) => handleNavClick('/about', e)} className={`text-xl font-medium transition-all ${isActive('/about') ? 'text-purple-600 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-black'}`}>ABOUT</Link>

            <Link to="/services" onClick={(e) => handleNavClick('/services', e)} className={`text-xl font-medium transition-all ${isActive('/services') ? 'text-purple-600 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-black'}`}>SERVICES</Link>

            <Link to="/contact" onClick={(e) => handleNavClick('/contact', e)} className={`text-xl font-medium transition-all ${isActive('/contact') ? 'text-purple-600 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-black'}`}>CONTACT US</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="px-2 py-1.5 rounded-md text-md font-medium transition-all border-2 border-black text-black hover:bg-black hover:border-black hover:text-white">Log in</Link>
            <Link to="/register" className="px-2 py-1.5 rounded-md text-md font-medium transition-all border-2 border-black bg-black text-white hover:bg-transparent hover:text-black hover:border-black">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-900 p-2 focus:outline-none">
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* 🌟 MOBILE MENU SLIDE-IN DRAWER 🌟 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl z-[120] flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <span className="font-black text-xl tracking-tight text-slate-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-6 font-bold text-lg text-slate-700 flex-1">
                <Link to="/" onClick={(e) => handleNavClick('/', e)} className={`transition-colors ${isActive('/') ? 'text-purple-600' : 'hover:text-purple-600'}`}>Home</Link>
                <Link to="/about" onClick={(e) => handleNavClick('/about', e)} className={`transition-colors ${isActive('/about') ? 'text-purple-600' : 'hover:text-purple-600'}`}>About</Link>
                <Link to="/services" onClick={(e) => handleNavClick('/services', e)} className={`transition-colors ${isActive('/services') ? 'text-purple-600' : 'hover:text-purple-600'}`}>Services</Link>
                <Link to="/contact" onClick={(e) => handleNavClick('/contact', e)} className="text-left hover:text-purple-600 transition">Contact Us</Link>
              </div>
              <div className="p-6 border-t border-slate-100 flex flex-col gap-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 font-bold rounded-xl transition-all border-2 border-black text-black hover:bg-purple-600 hover:border-purple-600 hover:text-white">Log in</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 font-bold rounded-xl transition-all border-2 border-purple-600 bg-purple-600 text-white hover:bg-transparent hover:text-black hover:border-black">Get Started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;