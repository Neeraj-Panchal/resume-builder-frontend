import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Palette, Sparkles, Lock, Crown, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const ThemeModal = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  currentTemplate, 
  onSelectColor,
  currentColor,
  isPremium,
  onUpgradeSuccess
}) => {
  const [activeTab, setActiveTab] = useState('Templates');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  // 🌟 TEMPLATES CONFIG
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, sleek layout with smart spacing and accents.',
      badge: 'Free',
      previewType: 'modern',
      isFree: true
    },
    {
      id: 'creative',
      name: 'Creative Split',
      description: 'Visual sidebar layout for modern designers & devs.',
      badge: 'Pro',
      previewType: 'creative',
      isFree: false
    },
    {
      id: 'executive',
      name: 'Executive Classic',
      description: 'Elegant, serif-based design optimized for ATS systems.',
      badge: 'Pro',
      previewType: 'executive',
      isFree: false
    }
  ];

  // 🌟 COLORS CONFIG
  const colorPalettes = [
    { id: 'purple', primary: '#5b45ff', shades: ['#ede9fe', '#ddd6fe', '#c4b5fd', '#8b5cf6', '#4c1d95'], isFree: true },
    { id: 'slate', primary: '#334155', shades: ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#64748b', '#0f172a'], isFree: true },
    { id: 'blue', primary: '#2563eb', shades: ['#dbeafe', '#bfdbfe', '#93c5fd', '#3b82f6', '#1e40af'], isFree: false },
    { id: 'pink', primary: '#db2777', shades: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#db2777', '#831843'], isFree: false },
    { id: 'emerald', primary: '#059669', shades: ['#d1fae5', '#a7f3d0', '#6ee7b7', '#10b981', '#064e3b'], isFree: false },
    { id: 'cyan', primary: '#0891b2', shades: ['#cffafe', '#a5f3fc', '#67e8f9', '#06b6d4', '#164e63'], isFree: false },
    { id: 'orange', primary: '#ea580c', shades: ['#ffedd5', '#fed7aa', '#fdba74', '#f97316', '#7c2d12'], isFree: false },
    { id: 'yellow', primary: '#ca8a04', shades: ['#fef9c3', '#fef08a', '#fde047', '#eab308', '#713f12'], isFree: false },
  ];

  // ----- ACTIONS -----
  const handleTemplateClick = (template) => {
    if (!isPremium && !template.isFree) {
      toast.error("Unlock Premium to use this template!");
      setActiveTab('Premium Plan');
      return;
    }
    onSelectTemplate(template.id);
  };

  const handleColorClick = (palette) => {
    if (!isPremium && !palette.isFree) {
      toast.error("Unlock Premium to use this color palette!");
      setActiveTab('Premium Plan');
      return;
    }
    onSelectColor(palette.primary);
  };

  // ----- RAZORPAY INTEGRATION (UPDATED WITH FIXES) -----
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    const toastId = toast.loading("Initializing secure payment...");

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?", { id: toastId });
        setIsProcessingPayment(false);
        return;
      }

      // API call to backend to create order
      const orderResponse = await api.post('/api/payment/create-order', { planType: 'PREMIUM' });
      const { orderId, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: amount.toString(),
        currency: currency,
        name: "Resume Builder Pro",
        description: "Lifetime Premium Access",
        order_id: orderId,
        handler: async function (response) {
          toast.loading("Verifying payment...", { id: toastId });
          
          try {
            const verifyRes = await api.post('/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            // FIXED CONDITION & LOCAL STORAGE SYNC HERE ✅
            if (verifyRes.data.status === 'success' || verifyRes.data.success === true) {
              toast.success("Payment Successful! Welcome to Premium 🎉", { id: toastId });
              
              // Local storage ko turant update karna zaroori hai
              const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
              localStorage.setItem('user', JSON.stringify({ ...existingUser, isPremium: true }));

              if(onUpgradeSuccess) onUpgradeSuccess(); 
              setActiveTab('Templates'); 
            } else {
              toast.error("Verification failed. Please contact support.", { id: toastId });
            }
          } catch (verifyError) {
            console.error(verifyError);
            toast.error("Verification error occurred.", { id: toastId });
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#5b45ff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`, { id: toastId });
      });

      paymentObject.open();
      toast.dismiss(toastId); 

    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment. Server might be down.", { id: toastId });
    } finally {
      setIsProcessingPayment(false);
    }
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl sm:rounded-[24px] shadow-2xl w-full max-w-5xl h-[90vh] sm:h-[85vh] flex flex-col overflow-hidden border border-slate-200 relative"
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between shrink-0 bg-white gap-4 sm:gap-0 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full pr-8 sm:pr-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Design Settings {isPremium && <Crown size={18} className="text-yellow-500 fill-yellow-500" />}
            </h2>
            
            {/* TABS */}
            <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto custom-scrollbar no-scrollbar-on-mobile w-full sm:w-auto">
              {['Templates', 'Color Palettes', 'Premium Plan'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-5 py-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? 'bg-white text-[#5b45ff] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                  {tab === 'Premium Plan' && !isPremium && (
                     <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-slate-100"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Close Button - Absolutely positioned on mobile for proper fit */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 sm:static p-1.5 sm:p-2 bg-slate-100 sm:bg-transparent hover:bg-slate-200 sm:hover:bg-slate-100 rounded-full transition text-slate-500 hover:text-slate-700 z-10"
          >
            <X size={20} strokeWidth={2.5}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[#fcfdfe] custom-scrollbar relative">
          
          <AnimatePresence mode="wait">
            {/* 🌟 TEMPLATES TAB 🌟 */}
            {activeTab === 'Templates' && (
              <motion.div key="templates" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {templates.map((template) => {
                  const isRestricted = !isPremium && !template.isFree;

                  return (
                    <div 
                      key={template.id} 
                      onClick={() => handleTemplateClick(template)}
                      className={`group cursor-pointer space-y-3 sm:space-y-4 relative ${isRestricted ? '' : ''}`}
                    >
                      <div className={`relative aspect-[1/1.2] sm:aspect-[1/1.3] bg-white rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-lg ${currentTemplate === template.id ? 'border-[#5b45ff] ring-4 ring-[#5b45ff]/10' : 'border-slate-100 group-hover:border-[#5b45ff]/50 group-hover:shadow-xl'}`}>
                        
                        {/* Premium Blur Overlay */}
                        {isRestricted && (
                          <div className="absolute inset-0 z-20 bg-slate-900/10 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all group-hover:bg-slate-900/20">
                             <div className="bg-white/90 p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-md mb-2">
                               <Lock size={18} className="text-slate-700 sm:w-5 sm:h-5" />
                             </div>
                             <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-800 bg-white px-2 sm:px-3 py-1 rounded-full shadow">PRO</span>
                          </div>
                        )}

                        {/* Visual Previews Mockups */}
                        <div className={`w-full h-full bg-slate-50 p-3 sm:p-4 flex flex-col gap-2 overflow-hidden opacity-70 ${isRestricted ? 'grayscale-[50%]' : ''}`}>
                          {template.previewType === 'modern' && (
                            <div className="space-y-2 sm:space-y-3">
                              <div className="h-1.5 sm:h-2 w-full rounded-t-sm absolute top-0 left-0" style={{ backgroundColor: isRestricted ? '#94a3b8' : (currentTemplate === template.id ? currentColor : '#5b45ff') }} />
                              <div className="h-4 sm:h-6 w-1/2 bg-slate-300 rounded mt-3 sm:mt-4" />
                              <div className="h-1.5 sm:h-2 w-1/3 rounded bg-slate-200" />
                              <div className="h-1 w-full bg-slate-200 rounded mt-3 sm:mt-4" />
                              <div className="flex gap-2 sm:gap-4 mt-2">
                                <div className="w-1/2 space-y-1.5 sm:space-y-2"><div className="h-1.5 sm:h-2 w-full bg-slate-200 rounded"/><div className="h-1.5 sm:h-2 w-3/4 bg-slate-200 rounded"/></div>
                                <div className="w-1/2 space-y-1.5 sm:space-y-2"><div className="h-1.5 sm:h-2 w-full bg-slate-200 rounded"/><div className="h-1.5 sm:h-2 w-2/3 bg-slate-200 rounded"/></div>
                              </div>
                            </div>
                          )}
                          {template.previewType === 'creative' && (
                            <div className="flex h-full gap-1.5 sm:gap-2 -m-3 sm:-m-4">
                              <div className="w-1/3 h-full bg-slate-800 p-1.5 sm:p-2 space-y-1.5 sm:space-y-2"><div className="h-3 sm:h-4 w-full rounded bg-slate-600"/><div className="h-1.5 sm:h-2 w-3/4 bg-slate-600 rounded mt-3 sm:mt-4"/></div>
                              <div className="flex-1 space-y-1.5 sm:space-y-2 p-1.5 sm:p-2 pt-3 sm:pt-4"><div className="h-1.5 sm:h-2 w-3/4 bg-slate-300 rounded"/><div className="h-1.5 sm:h-2 w-full bg-slate-200 rounded"/></div>
                            </div>
                          )}
                          {template.previewType === 'executive' && (
                            <div className="space-y-2 sm:space-y-3 flex flex-col items-center pt-2">
                              <div className="h-3 sm:h-4 w-2/3 bg-slate-800 rounded" />
                              <div className="h-1 sm:h-1.5 w-1/2 bg-slate-400 rounded" />
                              <div className="h-0.5 w-full bg-slate-800 mt-1 sm:mt-2" />
                              <div className="w-full space-y-1 sm:space-y-1.5 mt-1 sm:mt-2 text-left">
                                <div className="h-1.5 sm:h-2 w-1/3 bg-slate-400 rounded" />
                                <div className="h-1 sm:h-1.5 w-full bg-slate-200 rounded" />
                                <div className="h-1 sm:h-1.5 w-full bg-slate-200 rounded" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Selection Overlay */}
                        {currentTemplate === template.id && !isRestricted && (
                          <div className="absolute inset-0 bg-[#5b45ff]/5 flex items-center justify-center z-10">
                            <div className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg scale-110">
                              <CheckCircle2 size={24} className="text-[#5b45ff] sm:w-8 sm:h-8" />
                            </div>
                          </div>
                        )}

                        {/* Badge */}
                        {!isRestricted && (
                          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur z-10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm text-slate-600">
                            {template.badge}
                          </span>
                        )}
                      </div>

                      <div className="px-1 sm:px-2">
                        <h4 className={`font-bold text-xs sm:text-sm transition-colors ${isRestricted ? 'text-slate-400' : 'text-slate-900 group-hover:text-[#5b45ff]'}`}>
                          {template.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">{template.description}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 🌟 COLOR PALETTES TAB 🌟 */}
            {activeTab === 'Color Palettes' && (
               <motion.div key="colors" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    {colorPalettes.map((palette) => {
                      const isRestricted = !isPremium && !palette.isFree;

                      return (
                        <div 
                          key={palette.id} 
                          onClick={() => handleColorClick(palette)}
                          className={`flex h-16 sm:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 relative group ${
                            currentColor === palette.primary && !isRestricted
                              ? 'border-[#5b45ff] ring-2 sm:ring-4 ring-[#5b45ff]/20 shadow-xl scale-[1.02] sm:scale-[1.03] z-10' 
                              : 'border-transparent shadow hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02]'
                          }`}
                        >
                          {/* Premium Overlay for Colors */}
                          {isRestricted && (
                            <div className="absolute inset-0 z-20 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center transition-all group-hover:bg-slate-900/40">
                               <Lock size={18} className="text-white drop-shadow-md sm:w-5 sm:h-5" />
                            </div>
                          )}

                          {/* Mapping the 5 shades as vertical bars */}
                          {palette.shades.map((shade, index) => (
                            <div 
                              key={index} 
                              className={`flex-1 h-full flex items-center justify-center ${isRestricted ? 'grayscale-[30%]' : ''}`} 
                              style={{ backgroundColor: shade }}
                            >
                              {currentColor === palette.primary && shade === palette.primary && !isRestricted && (
                                <CheckCircle2 size={20} className="text-white drop-shadow-md opacity-90 sm:w-6 sm:h-6" />
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
               </motion.div>
            )}
            
            {/* 🌟 COMPACT PREMIUM PLAN TAB 🌟 */}
            {activeTab === 'Premium Plan' && (
               <motion.div key="premium" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex items-center justify-center pt-4 sm:pt-0">
                  
                  {isPremium ? (
                    // IF ALREADY PREMIUM
                    <div className="text-center space-y-4 sm:space-y-6">
                       <div className="bg-yellow-100 p-4 sm:p-6 rounded-full inline-block mb-2 sm:mb-4">
                         <Crown size={48} className="text-yellow-600 fill-yellow-500 sm:w-16 sm:h-16" />
                       </div>
                       <h2 className="text-2xl sm:text-3xl font-black text-slate-900">You are a Premium Member!</h2>
                       <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">Thank you for your purchase. All Pro templates, advanced colors, and premium features are now fully unlocked for your account.</p>
                       <button onClick={() => setActiveTab('Templates')} className="mt-4 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#5b45ff] text-white font-bold rounded-xl shadow-lg hover:bg-[#4a36e0] transition text-sm sm:text-base">
                         Go build your resume
                       </button>
                    </div>
                  ) : (
                    // COMPACT PRICING UI (FREE VS PRO)
                    <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-stretch gap-6 pb-6 sm:py-4">
                      
                      {/* Standard Plan */}
                      <div className="flex-1 bg-white border border-slate-200 rounded-[20px] p-5 sm:p-6 opacity-90 flex flex-col shadow-sm order-2 md:order-1">
                        <div className="mb-4 sm:mb-6">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">Standard Plan</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900">Free</span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 mt-2 leading-relaxed">Perfect to get started and build a solid foundation.</p>
                        </div>
                        <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs font-medium text-slate-600 flex-1">
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" /> 1 Standard Template</li>
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" /> 2 Basic Color Palettes</li>
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" /> Unlimited PDF Downloads</li>
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-green-500 sm:w-4 sm:h-4" /> Direct Email Sending</li>
                          <li className="flex items-center gap-2 sm:gap-3 opacity-40"><Lock size={12} className="sm:w-3.5 sm:h-3.5" /> Premium Pro Templates</li>
                          <li className="flex items-center gap-2 sm:gap-3 opacity-40"><Lock size={12} className="sm:w-3.5 sm:h-3.5" /> Advanced Color Themes</li>
                        </ul>
                        <div className="mt-4 sm:mt-6 p-2 sm:p-2.5 bg-slate-100 rounded-lg text-center text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Current Plan
                        </div>
                      </div>

                      {/* Premium Plan */}
                      <div className="flex-[1.1] bg-[#0f172a] rounded-[20px] p-5 sm:p-6 flex flex-col relative shadow-2xl border border-slate-700 order-1 md:order-2">
                        <div className="absolute top-0 right-4 sm:right-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 rounded-b-md shadow-md flex items-center gap-1">
                           <Sparkles size={10} /> Recommended
                        </div>

                        <div className="mb-4 sm:mb-6 mt-2 sm:mt-0">
                          <h3 className="text-lg sm:text-xl font-black text-white mb-1 flex items-center gap-2">Resume Pro <Crown size={16} className="text-yellow-400 fill-yellow-400 sm:w-4 sm:h-4" /></h3>
                          <div className="flex items-baseline gap-1 text-white">
                            <span className="text-sm sm:text-base">₹</span>
                            <span className="text-3xl sm:text-4xl font-black">99</span>
                            <span className="text-slate-400 text-[10px] sm:text-[11px]">/lifetime</span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-400 mt-2 leading-relaxed">Unlock everything and stand out to recruiters.</p>
                        </div>
                        <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs font-medium text-slate-300 flex-1">
                          <li className="flex items-center gap-2 sm:gap-3 text-white"><CheckCircle2 size={14} className="text-[#5b45ff] sm:w-4 sm:h-4" /> <strong>All Premium Templates</strong> <span className="hidden sm:inline">(Creative & Executive)</span></li>
                          <li className="flex items-center gap-2 sm:gap-3 text-white"><CheckCircle2 size={14} className="text-[#5b45ff] sm:w-4 sm:h-4" /> <strong>All Advanced Color Palettes</strong></li>
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-[#5b45ff] sm:w-4 sm:h-4" /> One-time payment, lifetime access</li>
                          <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-[#5b45ff] sm:w-4 sm:h-4" /> Priority Support</li>
                        </ul>
                        <button 
                          onClick={handlePayment}
                          disabled={isProcessingPayment}
                          className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#5b45ff] to-[#8b5cf6] text-white py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(91,69,255,0.4)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isProcessingPayment ? <Loader2 size={14} className="animate-spin sm:w-4 sm:h-4" /> : <ShieldCheck size={14} className="sm:w-4 sm:h-4" />}
                          {isProcessingPayment ? "Processing..." : "Upgrade to Pro"}
                        </button>
                        <div className="text-center mt-2 sm:mt-3 flex items-center justify-center gap-1 opacity-50">
                           <Lock size={10} className="text-slate-300" /> <span className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-widest">Secured by Razorpay</span>
                        </div>
                      </div>

                    </div>
                  )}
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-100 flex flex-row justify-between items-center bg-slate-50 shrink-0">
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Selected Template: <span className="font-bold text-slate-900 capitalize block sm:inline">{currentTemplate}</span></p>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 font-medium sm:border-l sm:border-slate-300 sm:pl-4 mt-1 sm:mt-0">
                Accent Color: <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: currentColor }}></div>
              </div>
            </div>
            
            {/* Show tiny premium tag in footer if pro */}
            {isPremium && <span className="hidden sm:inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-yellow-200 ml-2">Pro User</span>}
          </div>
          <button 
            onClick={onClose} 
            className="bg-slate-900 text-white px-4 sm:px-10 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-[9px] sm:text-[11px] hover:bg-black transition shadow-lg shadow-slate-200 active:scale-95 whitespace-nowrap"
          >
            Done <span className="hidden sm:inline">& Apply</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeModal;