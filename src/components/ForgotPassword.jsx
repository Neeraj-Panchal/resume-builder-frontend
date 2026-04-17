import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios'; // Apne axios ka path check kar lena

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP & New Password
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Step 1: OTP Bhejne ka function
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your registered email");

    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      toast.success(res.data.message || "OTP sent to your email!");
      setStep(2); // Agle step par bhejo
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Check email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Password Reset karne ka function
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return toast.error("Please fill all fields");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");

    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      toast.success(res.data.message || "Password reset successful!");
      
      // 2 second baad wapas login page par bhej do
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP or failed to reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden">
        
        {/* Upar wali blue patti */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#5b45ff]"></div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            {step === 1 ? "Forgot Password?" : "Set New Password"}
          </h1>
          <p className="text-sm text-slate-500">
            {step === 1 
              ? "Enter your registered email and we'll send you a 6-digit OTP to reset your password." 
              : "Check your email for the OTP and create a new secure password."}
          </p>
        </div>

        {/* STEP 1: EMAIL WALA FORM */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff] transition"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#5b45ff] hover:bg-[#4a36e0] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#5b45ff]/20 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP AUR NAYA PASSWORD WALA FORM */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex items-start gap-2 mb-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <p>OTP sent to <strong>{email}</strong>. Valid for 10 minutes.</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Enter 6-Digit OTP</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff] transition tracking-widest font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create a strong password" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff] transition"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Reset Password"}
            </button>
          </form>
        )}

        {/* Back to Login Button */}
        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#5b45ff] transition">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;