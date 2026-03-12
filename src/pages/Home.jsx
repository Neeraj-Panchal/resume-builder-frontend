import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FileText, ArrowRight, UserPlus, CreditCard, LayoutTemplate, 
  Edit3, Download, Star, Sparkles, ShieldCheck, Zap, 
  ChevronRight, ChevronDown, CheckCircle2, Building, Briefcase,
  Twitter, Linkedin, Github, Lock, Crown, X, 
  Mail, Phone, MapPin, Menu 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Apni nayi image import kar rahe hain (path check kar lena)
import heroIllustration from '../assets/images/recruitement-home.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFaq, setOpenFaq] = useState(0);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  // Smooth Scroll Function for Specific Sections
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Image float animation
  const floatAnimation = {
    y: [-10, 10],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Expanded FAQs Array
  const faqs = [
    { q: "Is my data secure with CVPie?", a: "Yes, we use enterprise-grade encryption and secure JWT authentication to ensure your personal data is never compromised." },
    { q: "Can I download my resume for free?", a: "We offer a basic free tier that allows standard PDF downloads. Premium templates require a subscription." },
    { q: "Do you support ATS formatting?", a: "Absolutely. All our templates are designed specifically to pass through Applicant Tracking Systems flawlessly, ensuring recruiters see your profile." },
    { q: "Can I edit my resume after creating it?", a: "Yes! Your resume is saved in our secure cloud. You can log in anytime from any device to make updates and download the latest version." },
    { q: "How many resumes can I build?", a: "You can create multiple tailored versions of your resume for different job applications directly from your dashboard." }
  ];

  const testimonials = [
    { text: "This resume builder helped me land my dream job! The templates are modern and the interface is incredibly user-friendly.", name: "Sarah Johnson", role: "Software Engineer at Google" },
    { text: "I've tried many resume builders, but this one stands out. The live preview feature is a game-changer.", name: "Michael Chen", role: "Marketing Manager at Microsoft" },
    { text: "Beautiful templates and seamless editing experience. Highly recommend to anyone looking for a professional resume.", name: "Emily Davis", role: "UX Designer at Apple" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-200 relative">
      
      {/* 🌟 TEMPLATES PREVIEW MODAL 🌟 */}
      <AnimatePresence>
        {showTemplatesModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <LayoutTemplate className="text-purple-600" size={24} />
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Template Library</h2>
                </div>
                <button onClick={() => setShowTemplatesModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-700">
                  <X size={20} strokeWidth={2.5}/>
                </button>
              </div>

              {/* Modal Body - Wireframes */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* 1. Modern (Free) */}
                  <div className="group bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all p-4 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-900">Modern</h3>
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Free</span>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4 relative overflow-hidden flex flex-col opacity-80">
                      <div className="h-2 w-full rounded-t-sm absolute top-0 left-0 bg-purple-500" />
                      <div className="h-4 w-1/2 bg-slate-300 rounded mt-4" />
                      <div className="h-1.5 w-1/3 rounded bg-purple-400 mt-1" />
                      <div className="h-1 w-full bg-slate-200 rounded mt-4" />
                      <div className="flex gap-4 mt-4">
                        <div className="w-1/2 space-y-2"><div className="h-1.5 w-full bg-slate-200 rounded"/><div className="h-1.5 w-3/4 bg-slate-200 rounded"/></div>
                        <div className="w-1/2 space-y-2"><div className="h-1.5 w-full bg-slate-200 rounded"/><div className="h-1.5 w-2/3 bg-slate-200 rounded"/></div>
                      </div>
                    </div>
                    <button onClick={() => navigate('/register')} className="w-full mt-4 bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold transition">
                      Use This Template
                    </button>
                  </div>

                  {/* 2. Creative (Pro) */}
                  <div className="group bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all p-4 flex flex-col h-[400px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 z-10 relative">
                      <h3 className="font-bold text-slate-900">Creative Split</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Crown size={12}/> Pro</span>
                    </div>
                    
                    {/* Pro Blur Overlay */}
                    <div className="absolute inset-0 z-20 bg-slate-900/5 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all group-hover:bg-slate-900/10 pt-10">
                       <div className="bg-white p-3 rounded-full shadow-lg mb-2"><Lock size={20} className="text-slate-700" /></div>
                    </div>

                    <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex grayscale-[40%]">
                      <div className="w-1/3 h-full bg-slate-800 p-2 space-y-2"><div className="h-3 w-full rounded bg-purple-500"/><div className="h-1.5 w-3/4 bg-slate-600 rounded mt-4"/></div>
                      <div className="flex-1 space-y-2 p-3 bg-slate-50"><div className="h-2 w-3/4 bg-slate-300 rounded"/><div className="h-1.5 w-full bg-slate-200 rounded"/></div>
                    </div>
                    <button onClick={() => navigate('/register')} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-sm font-bold transition z-30 relative shadow-md">
                      Unlock with Pro
                    </button>
                  </div>

                  {/* 3. Executive (Pro) */}
                  <div className="group bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all p-4 flex flex-col h-[400px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 z-10 relative">
                      <h3 className="font-bold text-slate-900">Executive</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Crown size={12}/> Pro</span>
                    </div>

                    {/* Pro Blur Overlay */}
                    <div className="absolute inset-0 z-20 bg-slate-900/5 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all group-hover:bg-slate-900/10 pt-10">
                       <div className="bg-white p-3 rounded-full shadow-lg mb-2"><Lock size={20} className="text-slate-700" /></div>
                    </div>

                    <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 flex flex-col items-center opacity-80 grayscale-[40%]">
                      <div className="h-3 w-2/3 bg-slate-800 rounded" />
                      <div className="h-1.5 w-1/2 bg-slate-400 rounded mt-2" />
                      <div className="h-0.5 w-full bg-slate-800 mt-3" />
                      <div className="w-full space-y-1.5 mt-3 text-left">
                        <div className="h-1.5 w-1/3 bg-slate-400 rounded" />
                        <div className="h-1 w-full bg-slate-200 rounded" />
                        <div className="h-1 w-full bg-slate-200 rounded" />
                      </div>
                    </div>
                    <button onClick={() => navigate('/register')} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-sm font-bold transition z-30 relative shadow-md">
                      Unlock with Pro
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* HERO WRAPPER */}
      <div className="relative h-screen min-h-[700px] flex flex-col bg-white pt-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* 2. HERO CONTENT */}
        <main className="flex-1 flex items-center relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content Area */}
            <div className="w-full lg:w-[55%] text-left pt-10 lg:pt-0">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 mb-6 font-bold text-sm border border-purple-100">
                <Star size={16} fill="currentColor" /> Welcome to CVPie
              </motion.div>

              <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-5xl lg:text-[70px] font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
                Crafting Your <br className="hidden lg:block"/> Career With <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Modern Tech</span>
              </motion.h1>

              <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-lg lg:text-xl text-slate-500 mb-10 font-medium max-w-lg">
                Step into the future of recruitment. Build stunning, ATS-friendly resumes in minutes with CVPie's intelligent, real-time builder.
              </motion.p>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
                <Link to="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/30 transition flex items-center justify-center gap-2">
                    Build Resume Now <ArrowRight size={20} />
                  </button>
                </Link>
                <button 
                  onClick={() => setShowTemplatesModal(true)}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <LayoutTemplate size={20} /> View Templates
                </button>
              </motion.div>
            </div>

            {/* Right Image Area */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[45%] relative flex justify-center lg:justify-end pb-10 lg:pb-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-purple-400/20 rounded-full blur-[80px]"></div>
              <motion.img 
                src={heroIllustration} 
                alt="CVPie Professional Resume Building" 
                animate={floatAnimation}
                className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] drop-shadow-2xl rounded-2xl object-contain"
              />
            </motion.div>

          </div>
        </main>

        {/* INFINITE MARQUEE */}
        <div className="w-full bg-slate-50 py-4 border-t border-slate-200 overflow-hidden flex items-center relative z-20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 mx-6">
                <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-sm"><Building size={16}/> Trusted by Global Tech Companies</span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-sm"><CheckCircle2 size={16}/> ATS Friendly Formats</span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-sm"><Briefcase size={16}/> 95% Interview Success Rate</span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-sm"><Zap size={16}/> Built for Professionals</span>
                <span className="text-purple-300">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AI STRATEGY / FEATURES */}
      <section id="features" className="relative py-24 bg-[#0a0514] text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h4 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-3">Core Features</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-16">AI-Powered Strategy</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={32} className="text-purple-300"/>, title: "Intelligent Design", desc: "Our algorithm formats your data perfectly, ensuring HR managers and ATS systems can easily parse your professional history." },
              { icon: <ShieldCheck size={32} className="text-purple-300"/>, title: "Secure Cloud Storage", desc: "Your data is encrypted and saved in real-time. Access your resume securely from any device, anywhere in the world." },
              { icon: <Sparkles size={32} className="text-purple-300"/>, title: "Live Preview", desc: "Watch your resume build itself as you type. Real-time rendering ensures you know exactly what the final PDF will look like." }
            ].map((feat, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-[32px] text-left hover:bg-white/10 hover:border-purple-500/50 transition duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30 group-hover:scale-110 transition duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                <p className="text-purple-100/70 leading-relaxed font-medium">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. OUR PROCESS */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 uppercase tracking-tight">Our Process</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">From absolute beginner to interview-ready in just a few clicks. Follow our streamlined workflow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Create Account", sub: "Secure Registration", items: ["Sign up with email", "Verify your identity", "Access cloud storage"] },
              { num: "2", title: "Select Plan", sub: "Flexible Pricing", items: ["Choose Basic or Premium", "Unlock Pro templates", "Razorpay secure checkout"] },
              { num: "3", title: "Input Details", sub: "Dynamic Forms", items: ["Add work experience", "List your education", "Highlight key skills"] },
              { num: "4", title: "Export & Apply", sub: "Instant Delivery", items: ["Download HD PDF", "Direct email to HR", "Shareable web link"] }
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="border border-slate-200 p-8 rounded-2xl hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-100 transition duration-300 relative overflow-hidden group bg-white">
                <div className="text-purple-600 font-black text-6xl mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition duration-300 origin-left">{step.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-purple-600 font-bold text-sm mb-6">{step.sub}</p>
                <ul className="space-y-3">
                  {step.items.map((item, i) => <li key={i} className="flex items-center gap-2 text-slate-600 text-sm font-medium"><ChevronRight size={14} className="text-purple-500" /> {item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS BANNER */}
      <section className="py-20 bg-[#060b19] border-y border-purple-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-left mb-10 md:mb-0 max-w-xl">
            <h4 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-2">Proven Results</h4>
            <h2 className="text-4xl font-extrabold text-white mb-4">Innovation That Drives Growth</h2>
            <p className="text-purple-200/60 font-medium">We've helped over 50,000 professionals rebuild their careers with modern tools and smart layouts.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-white">
            <div><h3 className="text-5xl font-black mb-1">50k+</h3><p className="text-purple-400 font-bold text-sm">Resumes Built</p></div>
            <div><h3 className="text-5xl font-black mb-1">99%</h3><p className="text-purple-400 font-bold text-sm">Uptime</p></div>
            <div><h3 className="text-5xl font-black mb-1">24/7</h3><p className="text-purple-400 font-bold text-sm">Support Access</p></div>
            <div><h3 className="text-5xl font-black mb-1">4.9</h3><p className="text-purple-400 font-bold text-sm">User Rating</p></div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight">
              Frequently <br/><span className="text-purple-600">Asked</span> <br/>Questions
            </h2>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${openFaq === i ? 'border-purple-600 shadow-md bg-purple-50/30' : 'border-slate-200 hover:border-purple-400'}`}>
                <div className="flex justify-between items-center">
                  <h4 className={`font-bold text-lg transition-colors ${openFaq === i ? 'text-purple-700' : 'text-slate-900'}`}>{faq.q}</h4>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className={`transition-colors ${openFaq === i ? 'text-purple-600' : 'text-slate-400'}`} /></motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Subscription Plans</h2>
            <p className="text-lg text-slate-500 font-medium">Start for free, upgrade when you need more power.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-stretch gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1 bg-white border border-slate-200 rounded-[24px] p-8 flex flex-col shadow-sm">
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 mb-2">Standard Plan</h3>
                <div className="flex items-baseline gap-1"><span className="text-5xl font-black text-slate-900">Free</span></div>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">Perfect to get started and build a solid foundation.</p>
              </div>
              <ul className="space-y-4 text-sm font-medium text-slate-600 flex-1 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 1 Standard Template</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 2 Basic Color Palettes</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Unlimited PDF Downloads</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Direct Email Sending</li>
                <li className="flex items-center gap-3 opacity-40"><Lock size={16} /> Premium Pro Templates</li>
                <li className="flex items-center gap-3 opacity-40"><Lock size={16} /> Advanced Color Themes</li>
              </ul>
              <Link to="/register" className="block text-center w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">Get Started Free</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-[1.1] bg-[#0f172a] rounded-[24px] p-8 flex flex-col relative shadow-2xl border border-slate-700 transform md:-translate-y-4">
              <div className="absolute top-0 right-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-b-lg shadow-md flex items-center gap-1"><Sparkles size={12} /> Recommended</div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">Resume Pro <Crown size={20} className="text-yellow-400 fill-yellow-400" /></h3>
                <div className="flex items-baseline gap-1 text-white"><span className="text-xl">₹</span><span className="text-6xl font-black">99</span><span className="text-slate-400 text-sm">/lifetime</span></div>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">Unlock everything and stand out to recruiters.</p>
              </div>
              <ul className="space-y-4 text-sm font-medium text-slate-300 flex-1 mb-8">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 size={18} className="text-purple-500" /> <strong>All Premium Templates</strong> (Creative & Executive)</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 size={18} className="text-purple-500" /> <strong>All Advanced Color Palettes</strong></li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-purple-500" /> One-time payment, lifetime access</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-purple-500" /> Priority Support</li>
              </ul>
              <Link to="/register" className="block text-center w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all active:scale-95">Upgrade to Pro</Link>
              <div className="text-center mt-4 flex items-center justify-center gap-1 opacity-50"><ShieldCheck size={14} className="text-slate-300" /> <span className="text-[10px] text-slate-300 uppercase tracking-widest">Secured by Razorpay</span></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#fafbfe]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Loved by Professionals</h2>
            <p className="text-lg text-slate-500 font-medium">See what our users have to say</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-400 mb-6 gap-1">{[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" strokeWidth={0} />)}</div>
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed">"{review.text}"</p>
                </div>
                <div><h4 className="font-bold text-slate-900 text-lg">{review.name}</h4><p className="text-sm text-slate-500 font-bold">{review.role}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA BANNER */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-purple-600/20">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[50px]"></div>
          <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-black/10 rounded-full blur-[50px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Ready to step up your career? <br className="hidden sm:block" /> Let's build your perfect resume.</h2>
            <p className="text-purple-100 text-lg mb-8 font-medium">Join thousands of professionals landing their dream jobs with CVPie.</p>
            <Link to="/register">
              <button className="bg-white text-purple-700 hover:bg-slate-50 hover:scale-105 px-8 py-3.5 rounded-xl font-bold text-lg transition duration-300 shadow-xl">Get Started For Free</button>
            </Link>
          </div>
        </div>
      </div>

      {/* 10. 🌟 REFINED FOOTER 🌟 */}
      <Footer />
    </div>
  );
};

export default Home;