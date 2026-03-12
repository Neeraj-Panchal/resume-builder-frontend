import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Twitter, Linkedin, Github, Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top when a normal page link is clicked
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cross-page smooth scrolling logic for sections like Pricing
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact-footer" className="bg-slate-50 border-t border-slate-200 pt-20 pb-12 mt-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Branding Column */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-2.5 group inline-flex">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                <FileText className="text-white w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="font-black text-2xl tracking-tighter flex items-center">
                <span className="text-slate-900">CV</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Pie</span>
              </div>
            </Link>

            <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
              Crafting careers with modern technology. Create, customize, and download your perfect, ATS-friendly resume in minutes.
            </p>
            <div className="flex gap-4 pt-2">
               <a href="#" className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Twitter size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Linkedin size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Github size={18} /></a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Product */}
            <div>
              <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Product</h4>
              <ul className="space-y-4 text-slate-600 font-medium">
                <li><Link to="/register" onClick={handleNavClick} className="hover:text-purple-600 transition flex items-center gap-2"><Zap size={14} className="text-purple-500"/> Create Resume</Link></li>
                <li><Link to="/" onClick={handleNavClick} className="hover:text-purple-600 transition">View Templates</Link></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-purple-600 transition text-left">Pricing Plans</button></li>
              </ul>
            </div>
            
            {/* Column 2: Platform Links */}
            <div>
              <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Platform</h4>
              <ul className="space-y-4 text-slate-600 font-medium">
                <li><Link to="/about" onClick={handleNavClick} className="hover:text-purple-600 transition">About Us</Link></li>
                <li><Link to="/services" onClick={handleNavClick} className="hover:text-purple-600 transition">Services</Link></li>
                <li><Link to="/dashboard" onClick={handleNavClick} className="hover:text-purple-600 transition">My Dashboard</Link></li>
                <li><Link to="/login" onClick={handleNavClick} className="hover:text-purple-600 transition">User Login</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div>
              <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Contact Us</h4>
              <ul className="space-y-5 text-slate-600 font-medium">
                <li className="flex items-start gap-3">
                  <Mail className="text-purple-500 shrink-0 mt-0.5" size={18} />
                  <a href="mailto:neerajpanchal098@gmail.com" className="hover:text-purple-600 transition break-all">
                    neerajpanchal098@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-purple-500 shrink-0" size={18} />
                  <a href="tel:+919310302340" className="hover:text-purple-600 transition">
                    +91 9310302340
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-purple-500 shrink-0 mt-0.5" size={18} />
                  <span>Faridabad, Haryana<br/>India</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center px-6 max-w-7xl mx-auto">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} CVPie. Innovated with ❤️ in Faridabad. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-semibold text-slate-500">
             <span className="hover:text-purple-600 transition cursor-pointer">Privacy Policy</span>
             <span className="hover:text-purple-600 transition cursor-pointer">Terms of Service</span>
             <span className="hover:text-purple-600 transition cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;