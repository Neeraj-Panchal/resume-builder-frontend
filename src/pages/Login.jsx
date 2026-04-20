// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, Eye, EyeOff, FileText, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  
  // States
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // States for Resend Verification
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resending, setResending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUnverifiedEmail(""); // Purana warning box hide karo nayi try par
    
    try {
      const response = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Login Successful!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Login Failed Log:", error.response); // Browser console ke liye
      
      // Error message nikalne ka safe tareeka
      let errorMsg = 'Invalid email or password!';
      const errData = error.response?.data;
      
      if (errData?.message) errorMsg = errData.message;
      else if (errData?.error) errorMsg = errData.error;
      else if (typeof errData === 'string') errorMsg = errData;
      
      toast.error(errorMsg);

      // MASTER STROKE: Kyunki Spring Boot message hide kar deta hai,
      // Hum kisi bhi login fail par user ko Resend ka box dikha denge!
      setUnverifiedEmail(formData.email);
    } finally {
      setLoading(false);
    }
  };

  // Manual click handler resend text ke liye
  const handleManualResendClick = () => {
    if (!formData.email) {
      toast.error("Please enter your email address in the box above first.");
      return;
    }
    setUnverifiedEmail(formData.email);
  };

  const handleResendVerification = async () => {
    setResending(true);
    try {
      await api.post('/api/auth/resend-verification', { email: unverifiedEmail });
      toast.success("Verification link sent! Please check your inbox.");
      setUnverifiedEmail(""); // Link bhej diya, toh box wapas hide kardo
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to resend link.';
      toast.error(errorMsg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f6] font-sans relative overflow-hidden">

      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white backdrop-blur-md rounded-full text-slate-600 hover:text-[#5b45ff] border border-white/40 shadow-sm transition font-semibold text-sm"
      >
        <ArrowLeft size={16} /> 
        <span className="hidden sm:block">Back to Home</span>
      </Link>

      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px]"></div>
      
      <div className="absolute top-[25%] left-[20%] w-12 h-12 bg-emerald-300 rounded-lg rotate-12 opacity-50"></div>
      <div className="absolute bottom-[25%] right-[20%] w-10 h-10 border-4 border-pink-300 rounded-full opacity-60"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.3 }}
        className="bg-white p-8 md:p-10 rounded-[30px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <FileText className="text-[#5b45ff]" />
            ResumeBuilder
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-1">Login to account</h2>
        <p className="text-center text-slate-500 text-sm mb-8">Access your dashboard and resumes.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange}
              className="w-full bg-[#f4f7fe] text-slate-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5b45ff]/50 transition text-sm font-medium placeholder-slate-400" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required minLength="6" value={formData.password} onChange={handleChange}
              className="w-full bg-[#f4f7fe] text-slate-800 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#5b45ff]/50 transition text-sm font-medium placeholder-slate-400" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5b45ff] transition">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex justify-between items-center px-1">
            <label className="flex items-center text-sm text-slate-500 cursor-pointer hover:text-slate-700 transition">
              <input type="checkbox" className="mr-2 rounded text-[#5b45ff] focus:ring-[#5b45ff] cursor-pointer" /> Remember me
            </label> 
            <Link to="/forgot-password" className="text-sm font-bold text-[#5b45ff] hover:text-[#4a36e0] transition hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#3421c0] hover:bg-[#28189c] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-[#3421c0]/30 flex justify-center items-center mt-6">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Login'}
          </button>
          
          {/* NAYA: Manual click ka option */}
          <div className="text-center mt-3">
             <button type="button" onClick={handleManualResendClick} className="text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline transition">
                Email not verified? Resend Link
             </button>
          </div>
        </form>

        {/* Resend Verification Box (Dikhaga jab unverifiedEmail set hoga) */}
        <AnimatePresence>
          {unverifiedEmail && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }} 
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 text-amber-700 font-bold mb-2">
                <AlertCircle size={18} />
                <span>Account Access Issue</span>
              </div>
              <p className="text-xs text-amber-600 mb-4 px-2">
                If you are unable to login, your email might not be verified yet. Click below to get a new verification link.
              </p>
              <button 
                onClick={handleResendVerification}
                disabled={resending}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-lg transition text-sm flex justify-center items-center gap-2 shadow-sm"
              >
                {resending ? <Loader2 className="animate-spin w-4 h-4" /> : <Mail size={16} />}
                {resending ? "Sending Link..." : "Resend Verification Link"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-slate-500 text-sm mt-6 font-medium">
          Don't have an account? <Link to="/register" className="text-[#5b45ff] font-bold hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;