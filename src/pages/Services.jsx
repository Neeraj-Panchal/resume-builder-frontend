import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, ArrowRight, Zap, Target, ShieldCheck,
  Twitter, Linkedin, Github, Mail, Phone, MapPin, Menu, X, Sparkles, LayoutTemplate, CheckCircle2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const scrollToFooter = () => {
    setIsMobileMenuOpen(false);
    const footer = document.getElementById('contact-footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAtsClick = () => {
    toast('ATS Score Checker is currently in process and will be available very soon!', {
      icon: '🚧',
      style: { borderRadius: '10px', background: '#0f172a', color: '#fff' },
    });
  };

  const isActive = (path) => location.pathname === path;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-purple-200 relative pb-20">
      <Toaster position="top-center" />
      
      <Navbar />

      {/* HERO SECTION */}
      <div className="pt-40 pb-16 px-6 text-center">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Services</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          Choose the right tool to accelerate your career growth. From building modern resumes to intelligent tracking algorithms.
        </motion.p>
      </div>

      {/* SERVICES CARDS */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        
        {/* 1. Resume Builder Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/50 hover:border-purple-300 transition-all group flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LayoutTemplate size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Resume Builder</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Create stunning, professional resumes in minutes. Use our pre-designed templates tailored for modern recruitment standards. Real-time preview and instant PDF downloads.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><CheckCircle2 size={18} className="text-emerald-500"/> Multiple Pro Templates</li>
              <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><CheckCircle2 size={18} className="text-emerald-500"/> Unlimited Edits & Downloads</li>
              <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><CheckCircle2 size={18} className="text-emerald-500"/> Direct Email to Recruiters</li>
            </ul>
          </div>
          <button onClick={() => navigate('/register')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            Start Building <ArrowRight size={18}/>
          </button>
        </motion.div>

        {/* 2. ATS Score Checker Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/30 transition-all"></div>
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-slate-800 text-blue-400 border border-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <span className="bg-blue-500/20 border border-blue-500/50 text-blue-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 animate-pulse">
                <Sparkles size={12}/> Coming Soon
              </span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">ATS Score Check</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Upload your existing resume and let our intelligent algorithm analyze it against Applicant Tracking Systems. Get actionable feedback to bypass HR filters instantly.
            </p>
            <ul className="space-y-3 mb-8 opacity-80">
              <li className="flex items-center gap-2 text-sm font-medium text-slate-300"><ShieldCheck size={18} className="text-blue-400"/> Keyword Optimization Match</li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-300"><ShieldCheck size={18} className="text-blue-400"/> Formatting Readability Score</li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-300"><ShieldCheck size={18} className="text-blue-400"/> Actionable Improvement Tips</li>
            </ul>
          </div>
          <button onClick={handleAtsClick} className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-sm z-10">
            Check Availability
          </button>
        </motion.div>

      </div>

      {/* 🌟 FOOTER 🌟 */}
      <Footer />
    </div>
  );
};

export default Services;