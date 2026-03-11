// src/pages/Home.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FileText, ArrowRight, UserPlus, CreditCard, LayoutTemplate, 
  Edit3, Download, Star, Sparkles, ShieldCheck, Zap, 
  ChevronRight, ChevronDown, CheckCircle2, Building, Briefcase,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Apni nayi image import kar rahe hain (path check kar lena)
import heroIllustration from '../assets/images/recruitement-home.jpg';

const Home = () => {

    const [openFaq, setOpenFaq] = useState(0);
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Image float animation like Matchbest
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-200">
      
      {/* 1. NAVBAR - Clean & Transparent */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg border-b border-slate-100 z-50 transition-all h-[72px]">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-6">
          <div className="text-2xl font-bold flex items-center gap-2 tracking-tight">
            <div className="bg-purple-600 p-1.5 rounded-lg flex items-center justify-center">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="text-slate-900">CV</span><span className="text-purple-600">Pie</span>
          </div>
          <div className="space-x-6 flex items-center">
            <Link to="/login" className="text-slate-600 hover:text-purple-600 font-bold transition">Log in</Link>
            <Link to="/register" className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-bold transition shadow-lg shadow-slate-900/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO WRAPPER 
        Calculated to take exactly 100vh. 
        It contains both the Hero Content and the Marquee at the bottom.
      */}
      <div className="relative h-screen min-h-[700px] flex flex-col bg-white pt-[72px] overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* 2. HERO CONTENT - Takes up remaining space above marquee */}
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
                <Link to="/register">
                  <button className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-slate-900/30 transition flex items-center gap-2">
                    Build Resume Now <ArrowRight size={20} />
                  </button>
                </Link>
                <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg transition flex items-center gap-2 shadow-sm">
                  <LayoutTemplate size={20} /> View Templates
                </button>
              </motion.div>
            </div>

            {/* Right Image Area (Floating Illustration) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[45%] relative flex justify-center lg:justify-end pb-10 lg:pb-0"
            >
              {/* Soft Glow behind image */}
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

        {/* INFINITE MARQUEE (Moving Line) - Pinned to the bottom of the viewport */}
        <div className="w-full bg-slate-50 py-4 border-t border-slate-200 overflow-hidden flex items-center relative z-20">
          <div className="flex whitespace-nowrap animate-marquee">
            {/* Repeating the content 4 times for smooth infinite scroll */}
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

      {/* REST OF THE PAGE REMAINS UNCHANGED */}
      {/* 3. AI STRATEGY / FEATURES - Dark Purple Glowing Section */}
      <section className="relative py-24 bg-[#0a0514] text-white overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h4 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-3">Core Features</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-16">AI-Powered Strategy</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Zap size={32} className="text-purple-300"/>, title: "Intelligent Design", desc: "Our algorithm formats your data perfectly, ensuring HR managers and ATS systems can easily parse your professional history." },
              { icon: <ShieldCheck size={32} className="text-purple-300"/>, title: "Secure Cloud Storage", desc: "Your data is encrypted and saved in real-time. Access your resume securely from any device, anywhere in the world." },
              { icon: <Sparkles size={32} className="text-purple-300"/>, title: "Live Preview", desc: "Watch your resume build itself as you type. Real-time rendering ensures you know exactly what the final PDF will look like." }
            ].map((feat, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-[32px] text-left hover:bg-white/10 hover:border-purple-500/50 transition duration-300 group"
              >
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

      {/* 4. OUR PROCESS (STEPS) - Clean White Outline Cards */}
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
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="border border-slate-200 p-8 rounded-2xl hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-100 transition duration-300 relative overflow-hidden group bg-white"
              >
                <div className="text-purple-600 font-black text-6xl mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition duration-300 origin-left">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-purple-600 font-bold text-sm mb-6">{step.sub}</p>
                <ul className="space-y-3">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <ChevronRight size={14} className="text-purple-500" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS BANNER - Dark Grid Background */}
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

      {/* 6. FAQ SECTION - NOW FULLY INTERACTIVE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight">
              Frequently <br/><span className="text-purple-600">Asked</span> <br/>Questions
            </h2>
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${openFaq === i ? 'border-purple-600 shadow-md bg-purple-50/30' : 'border-slate-200 hover:border-purple-400'}`}
              >
                <div className="flex justify-between items-center">
                  <h4 className={`font-bold text-lg transition-colors ${openFaq === i ? 'text-purple-700' : 'text-slate-900'}`}>
                    {faq.q}
                  </h4>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`transition-colors ${openFaq === i ? 'text-purple-600' : 'text-slate-400'}`} />
                  </motion.div>
                </div>
                
                {/* Smooth Accordion Animation using AnimatePresence */}
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* 7. TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#fafbfe]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Loved by Professionals</h2>
            <p className="text-lg text-slate-500 font-medium">See what our users have to say</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((review, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-400 mb-6 gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed">"{review.text}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                  <p className="text-sm text-slate-500 font-bold">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* 7. BOTTOM CTA BANNER - REFINED AND ELEGANT */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-purple-600/20">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[50px]"></div>
          <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-black/10 rounded-full blur-[50px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to step up your career? <br className="hidden sm:block" /> Let's build your perfect resume.
            </h2>
            <p className="text-purple-100 text-lg mb-8 font-medium">Join thousands of professionals landing their dream jobs with CVPie.</p>
            <Link to="/register">
              <button className="bg-white text-purple-700 hover:bg-slate-50 hover:scale-105 px-8 py-3.5 rounded-full font-bold text-lg transition duration-300 shadow-xl">
                Get Started For Free
              </button>
            </Link>
          </div>
        </div>
      </div>

            
      {/* 9. PREMIUM SAAS FOOTER - REDESIGNED */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-12 mt-12 relative overflow-hidden">
        {/* Subtle background graphic effect (optional, matching Hero grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Branding Column (Takes 4/12 columns) */}
            <div className="md:col-span-4 space-y-6">
              <div className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                <div className="bg-purple-600 p-1.5 rounded-lg flex items-center justify-center">
                  <FileText className="text-white w-5 h-5" />
                </div>
                <span className="text-slate-900">CV</span><span className="text-purple-600">Pie</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
                Crafting careers with modern technology. Create, customize, and download your perfect, ATS-friendly resume in minutes.
              </p>
              <div className="flex gap-4 pt-2">
                 <Link to="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Twitter size={18} /></Link>
                 <Link to="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Linkedin size={18} /></Link>
                 <Link to="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 hover:bg-white transition shadow-sm"><Github size={18} /></Link>
              </div>
            </div>
            
            {/* Links Columns (Take 8/12 columns in total) */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              
              {/* Column 1: Builder */}
              <div>
                <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Resume Builder</h4>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li><Link to="/register" className="hover:text-purple-600 transition flex items-center gap-2"><Zap size={14} className="text-purple-400"/> Create Resume</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Templates</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Pricing</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Features</Link></li>
                </ul>
              </div>
              
              {/* Column 2: Resources */}
              <div>
                <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Resources</h4>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li><Link to="#" className="hover:text-purple-600 transition">Resume Guide</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Cover Letter Tips</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Blog</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Career Advice</Link></li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div>
                <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Company</h4>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li><Link to="#" className="hover:text-purple-600 transition">About Us</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Careers</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Press Kit</Link></li>
                
                </ul>
              </div>

              {/* Column 4: Legal/Contact */}
              <div>
                <h4 className="font-bold text-slate-950 mb-6 text-lg tracking-tight">Support</h4>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li><Link to="#" className="hover:text-purple-600 transition">Contact Us</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">FAQ</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Privacy</Link></li>
                  <li><Link to="#" className="hover:text-purple-600 transition">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar (Structured) */}
          <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} CVPie. Innovated with ❤️ in Faridabad. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-semibold text-slate-500">
               <Link to="#" className="hover:text-purple-600 transition">Privacy Policy</Link>
               <Link to="#" className="hover:text-purple-600 transition">Terms of Service</Link>
               <Link to="#" className="hover:text-purple-600 transition">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;