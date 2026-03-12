import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, Target, Zap, ShieldCheck, Users, 
  Sparkles, ArrowRight, Twitter, Linkedin, Github, 
  Mail, Phone, Menu, X, MapPin
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  const navigateToHomeSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToFooter = () => {
    setIsMobileMenuOpen(false);
    const footer = document.getElementById('contact-footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;

  // Animation Variants
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const floatAnimation = { y: [-15, 15], transition: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } };
  const floatAnimationReverse = { y: [15, -15], transition: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-200 overflow-hidden relative">
      
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <motion.div animate={floatAnimation} className="absolute top-20 left-10 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] -z-10"></motion.div>
        <motion.div animate={floatAnimationReverse} className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] -z-10"></motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] -z-20"></div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 mb-6 font-bold text-sm border border-purple-100">
              <Sparkles size={16} /> Our Story
            </span>
            <h1 className="text-5xl lg:text-[72px] font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
              Empowering Careers <br />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Smart Design.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              We started CVPie with a simple belief: everyone deserves a resume that truly reflects their potential. No more fighting with word processors. Just clean, ATS-friendly, and stunning professional profiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. MISSION & VISION SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <div>
                <h3 className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-3">Our Mission</h3>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900">To bridge the gap between talent and opportunity.</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                Recruitment systems are evolving, and so should your resume. Our mission is to provide job seekers with tools that not only look beautiful to the human eye but are perfectly structured for Applicant Tracking Systems (ATS). 
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Based in Faridabad, India, our team of passionate developers and designers are constantly innovating to bring you the most seamless resume-building experience on the web.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-[40px] transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <motion.div animate={floatAnimation} className="relative z-10">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" alt="Team collaborating on career growth" className="w-full aspect-square md:aspect-video lg:aspect-square object-cover rounded-[40px] shadow-2xl border-[8px] border-white" />
                <motion.div animate={floatAnimationReverse} className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-4">
                   <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0"><Target size={24} /></div>
                   <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Accuracy</p><p className="text-base font-black text-slate-900">ATS Optimized</p></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-lg text-slate-500 font-medium">The principles that guide everything we build.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: <Zap size={28}/>, title: "Speed & Simplicity", desc: "Your time is valuable. We focus on frictionless, fast, and highly intuitive workflows." },
              { icon: <ShieldCheck size={28}/>, title: "Data Privacy", desc: "Your career data belongs to you. We employ top-tier security to keep it private and safe." },
              { icon: <Users size={28}/>, title: "User-Centric", desc: "Every feature we add is directly inspired by feedback from professionals like you." }
            ].map((value, i) => (
              <motion.div key={i} variants={fadeUp} className="p-8 rounded-3xl border border-slate-100 hover:border-purple-200 bg-white hover:bg-purple-50/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-900 rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-purple-500/30 rounded-full blur-[60px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Be part of our journey.</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">Create your account today and experience the easiest way to build a professional, job-winning resume.</p>
              <Link to="/register">
                <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition duration-300 flex items-center gap-2 mx-auto">
                  Start Building <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
};

export default About;