import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, Send, Mail, Phone, MapPin, 
  Twitter, Linkedin, Github, Menu, X, Sparkles, Loader2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

 

  const scrollToFooter = () => {
    setIsMobileMenuOpen(false);
    const footer = document.getElementById('contact-footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dummy Submit Handler (Will connect to Backend later)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Call for now
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatAnimation = {
    y: [-15, 15],
    transition: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-purple-200 relative pb-20">
      <Toaster position="top-center" />
      
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative pt-40 pb-16 px-6 overflow-hidden">
        {/* Floating background blur elements */}
        <motion.div animate={floatAnimation} className="absolute top-20 left-10 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] -z-10"></motion.div>
        <motion.div animate={floatAnimation} style={{ animationDelay: '-2s' }} className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] -z-10"></motion.div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 mb-6 font-bold text-sm border border-purple-200">
              <Sparkles size={16} /> Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              We'd love to hear <br /> from you.
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Have a question about our templates, pricing, or need technical support? 
              Drop us a message and our team will respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTACT SECTION (Form + Info) */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24 relative z-10">
        
        {/* Left Side: Contact Information */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Contact Information</h3>
            
            <ul className="space-y-8 text-slate-600 font-medium">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:neerajpanchal098@gmail.com" className="text-slate-900 hover:text-purple-600 transition break-all font-semibold">
                    neerajpanchal098@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Call Us</p>
                  <a href="tel:+919310302340" className="text-slate-900 hover:text-purple-600 transition font-semibold">
                    +91 9310302340
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Location</p>
                  <p className="text-slate-900 font-semibold">
                    Faridabad, Haryana<br/>India
                  </p>
                </div>
              </li>
            </ul>

            <hr className="my-8 border-slate-100" />
            
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3">
                 <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 transition"><Twitter size={18} /></a>
                 <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0077b5] transition"><Linkedin size={18} /></a>
                 <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 transition"><Github size={18} /></a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">Send a Message</h3>
            <p className="text-slate-500 mb-8 font-medium">Fill out the form below and we'll reply to your email within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject (Optional)</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Message <span className="text-red-500">*</span></label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* 🌟 FOOTER 🌟 */}
      <Footer />
    </div>
  );
};

export default Contact;