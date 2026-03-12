import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="fixed top-4 w-full z-50 px-4 md:px-6 flex justify-center">
        <nav className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.12)] rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-300">
          
          <Link to="/" onClick={(e) => handleNavClick('/', e)} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-1.5 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <FileText className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="font-black text-xl tracking-tighter flex items-center">
              <span className="text-slate-900">CV</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Pie</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
            <Link to="/" onClick={(e) => handleNavClick('/', e)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/') ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'}`}>Home</Link>
            <Link to="/about" onClick={(e) => handleNavClick('/about', e)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/about') ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'}`}>About</Link>
            <Link to="/services" onClick={(e) => handleNavClick('/services', e)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/services') ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'}`}>Services</Link>
            <Link to="/contact" onClick={(e) => handleNavClick('/contact', e)} className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition-all">Contact Us</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-slate-600 hover:text-purple-600 text-sm font-bold transition">Log in</Link>
            <Link to="/register" className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-slate-900/20 hover:-translate-y-0.5">
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
                <Link to="/contact" onClick={(e) => handleNavClick('/contact',e)} className="text-left hover:text-purple-600 transition">Contact Us</Link>
              </div>
              <div className="p-6 border-t border-slate-100 flex flex-col gap-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 border border-slate-200 text-slate-700 font-bold rounded-xl transition hover:bg-slate-50">Log in</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition hover:bg-purple-700">Get Started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;