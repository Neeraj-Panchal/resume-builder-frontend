import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  FileText, ArrowRight, UserPlus, CreditCard, LayoutTemplate,
  Edit3, Download, Star, Sparkles, ShieldCheck, Zap,
  ChevronRight, ChevronDown, CheckCircle2, Building, Briefcase,
  Twitter, Linkedin, Github, Lock, Crown, X,
  Mail, Phone, MapPin, Menu, Scan, Maximize2,
  Target, Layers, Smartphone, Cloud, FileCheck
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
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  // Lock body scroll and handle Escape key for blog reader modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedBlog(null);
    };
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlog]);


  // Scroll progress for Our Process step-by-step reveal
  const processRef = useRef(null);
  const [visibleStepCount, setVisibleStepCount] = useState(1);

  const { scrollYProgress: processScrollY } = useScroll({
    target: processRef,
    offset: ["start 80%", "end 95%"]
  });

  useMotionValueEvent(processScrollY, "change", (latest) => {
    if (latest < 0.23) {
      setVisibleStepCount(1);
    } else if (latest >= 0.48 && latest < 0.70) {
      setVisibleStepCount(2);
    } else if (latest >= 0.70 && latest < 0.89) {
      setVisibleStepCount(3);
    } else {
      setVisibleStepCount(4);
    }
  });

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

  // Blog / Latest Insights Data (Curated for Resume Builder & Career Growth)
  const blogPosts = [
    {
      id: 1,
      title: "Mastering the ATS",
      subtitle: "How to Beat Resume Screening Robots",
      date: "Aug 5, 2025",
      readTime: "5 min read",
      category: "ATS Optimization",
      image: "/blog/blog-1.jpg",
      description: "Learn how Applicant Tracking Systems screen candidates and the proven formatting strategies to ensure your resume reaches human recruiters.",
      author: "Career Strategy Team",
      content: [
        "Over 75% of resumes are discarded by Applicant Tracking Systems (ATS) before a human recruiter ever lays eyes on them. Modern recruitment pipelines rely on software like Workday, Greenhouse, and Taleo to automatically filter candidates based on keyword matching and clear section parsing.",
        "To ensure your resume passes ATS algorithms cleanly, use standardized section headers ('Experience', 'Education', 'Skills'), standard bullet formats, and single-column layouts. Avoid placing vital contact info or metrics inside complex graphic tables or text boxes that legacy scanners cannot parse.",
        "Our CVPie templates are rigorously pre-tested and 100% compliant with industry ATS parsers, guaranteeing your qualifications make it directly into hiring managers' hands."
      ],
      takeaways: [
        "Stick to recognized section headers that parsers index seamlessly.",
        "Incorporate targeted hard skills and keywords directly from the job description.",
        "Always export your resume in text-selectable PDF format."
      ]
    },
    {
      id: 2,
      title: "Power Action Verbs",
      subtitle: "Transforming Bullet Points Into Achievements",
      date: "Jul 29, 2025",
      readTime: "7 min read",
      category: "Resume Writing",
      image: "/blog/blog-2.jpg",
      description: "Replace passive job descriptions with high-impact action verbs that showcase leadership, technical expertise, and measurable achievements.",
      author: "Talent Acquisition Lead",
      content: [
        "One of the most frequent mistakes job seekers make is writing duty-focused bullets like 'Responsible for managing client projects' instead of outcome-focused accomplishments. Duty-based phrasing blends in; outcome-based verbs command attention.",
        "Begin every bullet point with a decisive action verb: 'Orchestrated', 'Spearheaded', 'Engineered', 'Optimized', or 'Negotiated'. Pair that verb with the Google X-Y-Z formula: Accomplished [X], as measured by [Y], by doing [Z].",
        "For example, instead of 'Wrote unit tests for the app', write 'Automated end-to-end test suites using Cypress, reducing regression bugs by 42% and accelerating release cycles by 2 weeks.'"
      ],
      takeaways: [
        "Avoid overused clichés like 'Hard worker', 'Team player', or 'Responsible for'.",
        "Quantify your results with dollar amounts, percentages, or saved hours.",
        "Lead with strong, decisive verbs tailored to your seniority level."
      ]
    },
    {
      id: 3,
      title: "The 6-Second Summary",
      subtitle: "Crafting an Irresistible Executive Summary",
      date: "Aug 5, 2025",
      readTime: "5 min read",
      category: "Career Strategy",
      image: "/blog/blog-3.jpg",
      description: "Stand out in six seconds or less. Discover the modern structure top executives use to pitch their career narrative with clarity.",
      author: "Executive Career Coach",
      content: [
        "Recruiters spend an average of six to seven seconds reviewing an initial resume submission. If your opening professional summary doesn't immediately hook them with relevance and authority, they move on to the next candidate.",
        "The ideal career summary is concise—three to four lines maximum. Sentence one establishes your professional identity and total years of focused experience. Sentence two spotlights your greatest quantified triumph. Sentence three connects your core competencies to the target company's business goals.",
        "Keep it forward-looking. Rather than just recounting past duties, present yourself as a solution-oriented professional ready to deliver immediate value to the organization."
      ],
      takeaways: [
        "Eliminate outdated objective statements in favor of a value-driven summary.",
        "Highlight your highest-impact metrics right at the top of the page.",
        "Tailor the summary's core focus to the specific industry and seniority."
      ]
    },
    {
      id: 4,
      title: "Modern Tech Resumes",
      subtitle: "Highlighting Engineering Skills & System Impact",
      date: "Sep 2, 2025",
      readTime: "6 min read",
      category: "Engineering & Tech",
      image: "/blog/blog-4.jpg",
      description: "From GitHub repos to cloud scalability metrics: how modern software engineers demonstrate architecture mastery on one page.",
      author: "Lead Tech Recruiter",
      content: [
        "In tech hiring, recruiters want to see your tech stack in action, not just a comma-separated list of acronyms. Detail how you leveraged specific tools to solve high-concurrency or high-reliability challenges.",
        "Include links to verified GitHub repositories, live demo URLs, or published packages. Hiring teams value clean, maintainable code and open-source contributions more than buzzwords.",
        "Highlight system-scale impact: database query optimization, reducing latency, cloud migration cost savings, and architectural leadership."
      ],
      takeaways: [
        "Provide direct context for each framework mentioned in your skills matrix.",
        "Include clickable links to live projects, GitHub, and production systems.",
        "Emphasize latency reductions, cost savings, and system scalability."
      ]
    },
    {
      id: 5,
      title: "The Networking Advantage",
      subtitle: "Unlocking Opportunities in the Hidden Job Market",
      date: "Sep 10, 2025",
      readTime: "4 min read",
      category: "Networking",
      image: "/blog/blog-5.jpg",
      description: "Unlocking the hidden job market. How connecting with alumni, hiring managers, and industry leaders lands unposted opportunities.",
      author: "Career Growth Advisor",
      content: [
        "Up to 70% of open positions are filled through internal referrals and professional networks without ever being posted publicly on traditional job boards.",
        "Learn how to conduct informational interviews with decision-makers, nurture meaningful connections on LinkedIn, and ask for warm introductions rather than cold pitching.",
        "Having a polished, ATS-optimized resume ready to share when a contact requests one gives you a monumental competitive edge over standard applicants."
      ],
      takeaways: [
        "Reach out to second-degree connections with personalized conversation requests.",
        "Focus on learning and relationship building rather than immediately asking for jobs.",
        "Keep your CVPie resume updated and shareable via instant cloud links."
      ]
    },
    {
      id: 6,
      title: "7 Resume Red Flags",
      subtitle: "Mistakes That Disqualify Even Exceptional Candidates",
      date: "Sep 15, 2025",
      readTime: "5 min read",
      category: "Recruiter Insights",
      image: "/blog/blog-6.jpg",
      description: "From weird file formats to typo traps: discover the common red flags that cause recruiters to reject your profile on sight.",
      author: "Senior HR Director",
      content: [
        "Even candidates with ten years of stellar experience can get filtered out due to easily avoidable oversights. Unprofessional email addresses, dense text blocks with no whitespace, and inconsistent date formatting are instant turn-offs.",
        "Another dangerous pitfall is submitting an unformatted Word document that renders differently on different operating systems. Always submit a standardized PDF generated by a dedicated tool like CVPie.",
        "Proofread carefully: a single glaring spelling error in a key job title raises immediate doubts about your attention to detail."
      ],
      takeaways: [
        "Never submit editable docx files; stick to clean, standardized PDFs.",
        "Ensure consistent date formatting (e.g., 'Jan 2022 – Present') across all entries.",
        "Audit your contact details and ensure all hyperlinked URLs work flawlessly."
      ]
    }
  ];


  // Core Feature Cards definition for the 3 scrolling columns
  const col1Cards = [
    {
      bgImage: '/home page/ai_writing.webp',
      icon: <Sparkles size={20} />,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badge: 'Smart AI',
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-100',
      title: 'AI-Powered Writing',
      subtitle: 'Smart AI Suggestions',
      desc: 'AI analyzes your job profile and industry to suggest relevant keywords, skills, and content, helping you create a more impactful and job-ready resume.',
      hoverBorder: 'hover:border-purple-300',
      bottom: (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Keywords</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Action Verbs</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium">Tone Optimizer</span>
        </div>
      )
    },
    {
      bgImage: '/home page/skills.jpg',
      icon: <Layers size={20} />,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      badge: 'Skills Matrix',
      badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      title: 'Dynamic Skills Inventory',
      desc: 'Easily add and manage skills based on your industry and specific job role, allowing you to create a highly relevant and personalized professional profile.',
      hoverBorder: 'hover:border-indigo-300',
      bottom: (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full font-medium">React.js</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">Python</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">Product Design</span>
        </div>
      )
    },
    {
      bgImage: '/home page/encryption.jpg',
      icon: <Cloud size={20} />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      badge: 'Encrypted',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      title: 'Secure Cloud Storage',
      desc: 'Safely store your resumes in the cloud so you can access, edit, and manage them anytime, from anywhere.',
      hoverBorder: 'hover:border-emerald-300',
      bottom: (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] text-slate-500 font-medium">Auto-synced & accessible 24/7</span>
        </div>
      )
    }
  ];

  const col2Cards = [
    {
      bgImage: '/home page/ats.jpg',
      icon: <FileCheck size={20} />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      badge: 'ATS Approved',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      title: 'ATS-Friendly Formats',
      desc: 'Resumes are designed with ATS-friendly layouts and formatting to ensure they can be easily scanned and understood by Applicant Tracking Systems, improving your chances of getting shortlisted.',
      hoverBorder: 'hover:border-emerald-300',
      bottom: (
        <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
            <span>ATS Parse Score</span>
            <span className="text-emerald-600">99 / 100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[99%]"></div>
          </div>
        </div>
      )
    },
    {
      bgImage: '/home page/pdf.jpg',
      icon: <Download size={20} />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      badge: 'Fast Export',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-100',
      title: 'Instant PDF Export',
      desc: 'Create your resume in just a few minutes and instantly export it as a high-quality, professional PDF ready for applications.',
      hoverBorder: 'hover:border-blue-300',
      bottom: (
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Vector-crisp font rendering</span>
          <span className="text-blue-600 font-bold">HD PDF</span>
        </div>
      )
    },
    {
      bgImage: '/Hero_img.png',
      icon: <Smartphone size={20} />,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badge: 'Modern UI',
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-100',
      title: 'Fully Responsive & Modern UI',
      desc: 'Enjoy a premium, modern user experience with a fully responsive interface featuring glassmorphism, smooth Framer Motion animations, and a refined color scheme.',
      hoverBorder: 'hover:border-purple-300',
      bottom: (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">Glassmorphism</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium">Framer Motion</span>
        </div>
      )
    }
  ];

  const col3Cards = [
    {
      bgImage: '/home page/templates.jpg',
      icon: <LayoutTemplate size={20} />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      badge: 'Templates',
      badgeColor: 'bg-amber-50 text-amber-700 border border-amber-100',
      title: 'Customizable Templates',
      desc: 'Choose from a variety of professionally designed resume templates and customize them according to your preferences and target job role.',
      hoverBorder: 'hover:border-amber-300',
      bottom: (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium">Executive</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">Modern Tech</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">Creative</span>
        </div>
      )
    },
    {
      bgImage: '/home page/resume_builder.jpg',
      icon: <Zap size={20} />,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      badge: 'Speed & Flow',
      badgeColor: 'bg-orange-50 text-orange-700 border border-orange-100',
      title: 'Faster Resume Creation',
      desc: 'Build a polished and professional resume in just a few clicks with the help of smart templates and AI-powered tools, eliminating the hassle of creating one from scratch.',
      hoverBorder: 'hover:border-orange-300',
      bottom: (
        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-bold text-xs">⚡</span>
          <span className="text-[11px] text-slate-600 font-medium">Ready in under 5 minutes</span>
        </div>
      )
    },
    {
      bgImage: '/home page/jd.jpg',
      icon: <Target size={20} />,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      badge: 'JD Matching',
      badgeColor: 'bg-rose-50 text-rose-700 border border-rose-100',
      title: 'JD Matching & Tailoring',
      subtitle: 'Resume Tailoring',
      desc: "Paste the Job Description (JD) for the role you're applying for, and the AI automatically analyzes your resume against it. It provides a Match Score, identifies missing keywords and skills, and highlights areas for improvement. With one click, you can tailor your resume specifically for each job application.",
      hoverBorder: 'hover:border-rose-300',
      bottom: (
        <div className="p-2.5 bg-rose-50/70 rounded-xl border border-rose-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-rose-800 mb-1">
            <span>Match Score</span>
            <span className="text-rose-600 font-bold">94%</span>
          </div>
          <div className="w-full h-1.5 bg-rose-200/60 rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-rose-500 rounded-full w-[94%]"></div>
          </div>
          <span className="text-[10px] text-rose-700 font-medium">✨ 1-Click Tailor Applied</span>
        </div>
      )
    }
  ];

  // Helper to render card with customizable background image and overlay
  const renderFeatureCard = (card, key) => (
    <div
      key={key}
      className={`relative bg-white rounded-xl p-3 border border-slate-200 hover:shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
    >
      {/* Background Illustration Watermark with complete view */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-3 z-0">
        <img
          src={card.bgImage || "/Hero_img.png"}
          alt=""
          className="w-full h-full object-contain opacity-[0.22] group-hover:opacity-[0.24] transition-opacity duration-300 select-none"
        />
      </div>

      {/* Subtle soft overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px] pointer-events-none z-[1] transition-opacity duration-300 group-hover:bg-white/45" />

      {/* Top Content on top of background */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor}`}>
            {card.icon}
          </div>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${card.badgeColor}`}>
            {card.badge}
          </span>
        </div>
        <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
          {card.title}
        </h4>
        {card.subtitle && (
          <p className="text-[11px] text-purple-600 font-semibold mb-2">{card.subtitle}</p>
        )}
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          {card.desc}
        </p>
      </div>

      {/* Bottom Content on top of background */}
      {card.bottom && (
        <div className="relative z-10 mt-4 pt-2 border-t border-slate-400">
          {card.bottom}
        </div>
      )}
    </div>
  );

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
                  <X size={20} strokeWidth={2.5} />
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
                        <div className="w-1/2 space-y-2"><div className="h-1.5 w-full bg-slate-200 rounded" /><div className="h-1.5 w-3/4 bg-slate-200 rounded" /></div>
                        <div className="w-1/2 space-y-2"><div className="h-1.5 w-full bg-slate-200 rounded" /><div className="h-1.5 w-2/3 bg-slate-200 rounded" /></div>
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
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Crown size={12} /> Pro</span>
                    </div>

                    {/* Pro Blur Overlay */}
                    <div className="absolute inset-0 z-20 bg-slate-900/5 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all group-hover:bg-slate-900/10 pt-10">
                      <div className="bg-white p-3 rounded-full shadow-lg mb-2"><Lock size={20} className="text-slate-700" /></div>
                    </div>

                    <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex grayscale-[40%]">
                      <div className="w-1/3 h-full bg-slate-800 p-2 space-y-2"><div className="h-3 w-full rounded bg-purple-500" /><div className="h-1.5 w-3/4 bg-slate-600 rounded mt-4" /></div>
                      <div className="flex-1 space-y-2 p-3 bg-slate-50"><div className="h-2 w-3/4 bg-slate-300 rounded" /><div className="h-1.5 w-full bg-slate-200 rounded" /></div>
                    </div>
                    <button onClick={() => navigate('/register')} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-sm font-bold transition z-30 relative shadow-md">
                      Unlock with Pro
                    </button>
                  </div>

                  {/* 3. Executive (Pro) */}
                  <div className="group bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all p-4 flex flex-col h-[400px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 z-10 relative">
                      <h3 className="font-bold text-slate-900">Executive</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Crown size={12} /> Pro</span>
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
          <div className="w-full mx-auto px-6 sm:px-10 md:px-24 flex flex-col lg:flex-row items-center justify-between gap-2 -mt-10 lg:-mt-24">

            {/* Left Content Area */}
            <div className="w-full lg:w-[55%] text-left pt-10 lg:pt-0">
              {/* <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 mb-6 font-bold text-sm border border-purple-100">
                <Star size={16} fill="currentColor" /> Welcome to CVPie
              </motion.div> */}

              <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900 leading-[1.1]">
                CREATE RESUME IN MINUTES
              </motion.h1>

              <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-sm md:text-[16px] text-slate-500 mb-6 md:mb-10 font-medium max-w-lg">
                Step into the future of recruitment. Build stunning, ATS-friendly resumes in minutes with CV Pie's intelligent, real-time builder.
              </motion.p>

              {/* POINTS BADGES */}
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] rounded-full border border-[#333]">
                  <Sparkles size={16} className="text-[#a591fd]" />
                  <span className="text-white text-sm font-medium tracking-wide">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] rounded-full border border-[#333]">
                  <Sparkles size={16} className="text-[#a591fd]" />
                  <span className="text-white text-sm font-medium tracking-wide">Professional</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] rounded-full border border-[#333]">
                  <Sparkles size={16} className="text-[#a591fd]" />
                  <span className="text-white text-sm font-medium tracking-wide">Automated Writing</span>
                </div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
                <Link to="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-md font-bold text-lg shadow-sm transition flex items-center justify-center gap-2">
                    Build Resume Now <ArrowRight size={20} />
                  </button>
                </Link>
                <button
                  onClick={() => setShowTemplatesModal(true)}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-2 rounded-md font-bold text-lg transition flex items-center justify-center gap-2 shadow-sm"
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
              className="w-full lg:w-[75%] relative flex justify-center pb-10 lg:pb-0 lg:mt-16"
            >
              <motion.img
                src="/Hero_img.png"
                alt="CVPie Professional Resume Building"
                // animate={floatAnimation}
                className="relative z-10 w-full max-w-[450px] lg:max-w-[750px] border-4 border-white rounded-xl shadow-xs"
              />
            </motion.div>

          </div>
        </main>

        {/* INFINITE MARQUEE */}
        <div className="w-full bg-slate-50 py-8 md:py-10 mb-2 overflow-hidden flex items-center relative z-20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-6 mx-6">
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><Building size={16} className="text-[#b310fa]" /> Trusted by Global Tech Companies</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><CheckCircle2 size={16} className="text-[#b310fa]" /> ATS Friendly Formats</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><Briefcase size={16} className="text-[#b310fa]" /> 95% Interview Success Rate</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><Zap size={16} className="text-[#b310fa]" /> Built for Professionals</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><Sparkles size={16} className="text-[#b310fa]" /> AI-Powered Writing</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><LayoutTemplate size={16} className="text-[#b310fa]" /> Customizable Templates</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><Download size={16} className="text-[#b310fa]" /> Instant PDF Export</span>
                <span className="text-[#b310fa] text-lg">✦</span>
                <span className="flex items-center gap-2 text-slate-800 uppercase tracking-normal text-sm px-2 py-1 border border-black rounded-2xl"><ShieldCheck size={16} className="text-[#b310fa]" /> Secure Cloud Storage</span>
                <span className="text-[#b310fa] text-lg">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 CREATE SMARTER RESUMES SECTION */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Image with floating pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-[80%] relative"
          >
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-purple-200 to-purple-50">
              <img src={heroIllustration}
                alt="Person using app" className="w-full h-auto rounded-t-xl relative z-0"
              />

              {/* Floating Glassmorphism Pills */}
              <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 flex flex-col gap-3 z-10">
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
            className="w-full flex flex-col pt-8 lg:pt-0"
          >
            <h2 className="text-4xl md:text-[42px] lg:text-5xl font-medium text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Stand Out with <span className="whitespace-nowrap">AI-Optimized</span> Resume
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-lg">
              Build job-winning resumes effortlessly using AI - customized content, smart suggestions, and professional formatting tailored to every career path.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0 bg-[#34d399] rounded-full flex items-center justify-center shadow-sm">
                    <FileText size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Smarter Resumes</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  AI tailors your resume for better job opportunities instantly.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0 bg-[#34d399] rounded-full flex items-center justify-center shadow-sm">
                    <Zap size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Faster Creation</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Quickly generate polished resumes using smart AI templates.
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 2.6 CORE FEATURES OF CV PIE SECTION */}
      <section className="py-10 md:py-20 bg-[#f8fafc] relative overflow-hidden">
        {/* Subtle decorative background glows */}
        <div className="absolute top-40 left-10 w-[30%] h-[95%] bg-purple-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-22 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left Side: Sticky Heading & Intro */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-28 self-start z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white text-purple-900 text-xs border border-purple-200/80 mb-5">
              <Sparkles size={14} className="text-purple-900" /> What Sets Us Apart
            </div>

            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 leading-[1.15] mb-5 tracking-tight">
              Core features of CV Pie
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
              Explore powerful tools designed to simplify your job hunt. From AI-assisted writing and real-time ATS optimization to one-click JD tailoring, CV Pie delivers everything you need to stand out.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <CheckCircle2 size={13} />
                </div>
                <span>AI-powered keyword & skill extraction</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <CheckCircle2 size={13} />
                </div>
                <span>100% ATS parser-friendly layouts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <CheckCircle2 size={13} />
                </div>
                <span>Instant match scoring & resume tailoring</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/register">
                <button className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-semibold text-md hover:shadow-md transition flex items-center gap-2 group">
                  Build Your Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: 3 Columns of Vertical Scrolling Cards */}
          <div className="w-full lg:w-[60%] relative h-[750px] overflow-hidden">
            {/* Top & Bottom Gradient Fades for Infinite Illusion */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full items-start">

              {/* COLUMN 1: Top to Bottom Scroll */}
              <div className="flex flex-col animate-scroll-y-down hover:[animation-play-state:paused]">
                {/* Loop 1 */}
                <div className="flex flex-col gap-5 pb-5">
                  {col1Cards.map((card, idx) => renderFeatureCard(card, `c1-${idx}`))}
                </div>
                {/* Loop 2 (Duplicate for Seamless Infinite Scroll) */}
                <div className="flex flex-col gap-5 pb-5" aria-hidden="true">
                  {col1Cards.map((card, idx) => renderFeatureCard(card, `c1-dup-${idx}`))}
                </div>
              </div>

              {/* COLUMN 2: Bottom to Top Scroll */}
              <div className="flex flex-col animate-scroll-y-up hover:[animation-play-state:paused]">
                {/* Loop 1 */}
                <div className="flex flex-col gap-5 pb-5">
                  {col2Cards.map((card, idx) => renderFeatureCard(card, `c2-${idx}`))}
                </div>
                {/* Loop 2 (Duplicate for Seamless Infinite Scroll) */}
                <div className="flex flex-col gap-5 pb-5" aria-hidden="true">
                  {col2Cards.map((card, idx) => renderFeatureCard(card, `c2-dup-${idx}`))}
                </div>
              </div>

              {/* COLUMN 3: Top to Bottom Scroll */}
              <div className="flex flex-col animate-scroll-y-down-slow hover:[animation-play-state:paused]">
                {/* Loop 1 */}
                <div className="flex flex-col gap-5 pb-5">
                  {col3Cards.map((card, idx) => renderFeatureCard(card, `c3-${idx}`))}
                </div>
                {/* Loop 2 (Duplicate for Seamless Infinite Scroll) */}
                <div className="flex flex-col gap-5 pb-5" aria-hidden="true">
                  {col3Cards.map((card, idx) => renderFeatureCard(card, `c3-dup-${idx}`))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. AI STRATEGY / FEATURES */}
      {/* <section id="features" className="relative py-24 bg-[#0a0514] text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h4 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-3">Core Features</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-16">AI-Powered Strategy</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={32} className="text-purple-300" />, title: "Intelligent Design", desc: "Our algorithm formats your data perfectly, ensuring HR managers and ATS systems can easily parse your professional history." },
              { icon: <ShieldCheck size={32} className="text-purple-300" />, title: "Secure Cloud Storage", desc: "Your data is encrypted and saved in real-time. Access your resume securely from any device, anywhere in the world." },
              { icon: <Sparkles size={32} className="text-purple-300" />, title: "Live Preview", desc: "Watch your resume build itself as you type. Real-time rendering ensures you know exactly what the final PDF will look like." }
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
      </section> */}

      {/* 4. OUR PROCESS */}
      <section ref={processRef} className="py-16 md:py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header - Centered with Badge matching reference design */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#ff4b72] text-xs font-semibold mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b72]"></span>
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Our Process
            </h2>
            <p className="text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
              From absolute beginner to interview-ready in just a few clicks. Follow our streamlined workflow.
            </p>
          </motion.div>

          {/* 4 Process Steps Layout - Scroll-Driven Sequential Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {[
              {
                num: "01",
                title: "Create Account",
                sub: "Secure Registration",
                items: ["Sign up with email", "Verify your identity", "Access cloud storage"],
                img: "/home_img2.png"
              },
              {
                num: "02",
                title: "Select Plan",
                sub: "Flexible Pricing",
                items: ["Choose Basic or Premium", "Unlock Pro templates", "Razorpay secure checkout"],
                img: "/home page/templates.jpg"
              },
              {
                num: "03",
                title: "Input Details",
                sub: "Dynamic Forms",
                items: ["Add work experience", "List your education", "Highlight key skills"],
                img: "/home page/resume_builder.jpg"
              },
              {
                num: "04",
                title: "Export & Apply",
                sub: "Instant Delivery",
                items: ["Download HD PDF", "Direct email to HR", "Shareable web link"],
                img: "/home page/pdf.jpg"
              }
            ].map((step, idx) => {
              const stepNumber = idx + 1;
              const isVisible = stepNumber <= visibleStepCount;
              const isNextStepVisible = (stepNumber + 1) <= visibleStepCount;

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, y: 36, scale: 0.94, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col items-center text-center relative group ${isVisible ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                  {/* Circular Photo with Outer Dashed Ring */}
                  <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44 flex items-center justify-center mb-6">
                    {/* Outer Dashed Ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 pointer-events-none group-hover:border-[#ff4b72]/60 transition-colors duration-300" />

                    {/* Inner Circular Image with White Border & Soft Drop Shadow */}
                    <div className="w-[82%] h-[82%] rounded-full overflow-hidden shadow-xl shadow-slate-200/90 border-4 border-white relative z-10 group-hover:scale-105 transition-transform duration-300 bg-slate-100">
                      <img
                        src={step.img}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Connecting Curved Hand-drawn Wavy Arrow (reveals when next step shows) */}
                  {idx < 3 && (
                    <motion.div
                      initial={false}
                      animate={
                        isNextStepVisible
                          ? { opacity: 0.75, scale: 1, x: 0 }
                          : { opacity: 0, scale: 0.7, x: -8 }
                      }
                      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                      className="hidden lg:block absolute left-[calc(100%+12px)] xl:left-[calc(100%+16px)] top-[72px] xl:top-[88px] -translate-x-1/2 -translate-y-1/2 w-16 xl:w-20 h-10 z-20 pointer-events-none group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        viewBox="0 0 80 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full text-slate-300 group-hover:text-purple-400 transition-colors duration-300"
                      >
                        <path
                          d="M 6 28 C 12 30, 16 20, 22 10 C 27 2, 33 2, 37 18 C 41 32, 45 32, 49 18 C 53 2, 59 2, 64 12 C 68 20, 71 28, 76 34"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 67 31 L 76 34 L 75 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  )}

                  {/* Step Indicator */}
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    STEP - {step.num}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Subtitle */}
                  <p className="text-xs font-semibold text-purple-600 mb-2">
                    {step.sub}
                  </p>

                  {/* Items List */}
                  <ul className="text-xs text-slate-500 leading-relaxed mb-4 space-y-1 font-normal max-w-xs">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-center gap-1.5">
                        <span className="text-purple-400">•</span> {item}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Action Link */}
                  {/* <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff4b72] hover:text-[#e03a64] transition mt-auto group/link"
                  >
                    Learn More <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link> */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.5 📰 BLOG / LATEST INSIGHTS SECTION (Matches Reference Design) */}
      <section id="insights" className="py-16 md:py-18 bg-white relative">
        <div className="w-full mx-auto px-6 sm:px-12 md:px-24">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-base font-semibold text-slate-800 mb-2">Blog</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mb-3">
                Explore Our Latest Insights
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-normal">
                Discover career advice, ATS optimization strategies, and resume writing tips.
              </p>
            </div>
            <div className="sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => setShowAllBlogs(!showAllBlogs)}
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-[#deb24e] text-slate-800 font-semibold text-sm hover:bg-amber-50/70 hover:border-amber-400 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
              >
                {showAllBlogs ? "Show Less" : "View All"}
              </button>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {(showAllBlogs ? blogPosts : blogPosts.slice(0, 3)).map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedBlog(post)}
              >
                {/* Image Container with Rounded Corners matching reference */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-xs">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Metadata: Date and Read Time on same line */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2.5">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Blog Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                  {post.title}
                </h3>

                {/* Excerpt Description */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-normal">
                  {post.description}
                </p>

                {/* Read More Link */}
                <div className="mt-auto pt-1">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Read More <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Blog Article Reader Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedBlog(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Image Banner */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                    aria-label="Close article"
                  >
                    <X size={18} />
                  </button>

                  {/* Badge & Meta on Banner */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white/90 text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white shadow-sm font-medium">
                      {selectedBlog.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span>{selectedBlog.date}</span>
                      <span>•</span>
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                      {selectedBlog.title}
                    </h2>
                    <p className="text-base font-semibold text-purple-600">
                      {selectedBlog.subtitle}
                    </p>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                    {selectedBlog.content.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Key Takeaways Box */}
                  {selectedBlog.takeaways && (
                    <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-5 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-2">
                        <Sparkles size={14} className="text-purple-600" />
                        Key Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {selectedBlog.takeaways.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Author and Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Published by <span className="font-bold text-slate-800">{selectedBlog.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/ats-check"
                        onClick={() => setSelectedBlog(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
                      >
                        Test ATS Score
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setSelectedBlog(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all"
                      >
                        Build Free Resume
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
              Frequently <br /><span className="text-purple-600">Asked</span> <br />Questions
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