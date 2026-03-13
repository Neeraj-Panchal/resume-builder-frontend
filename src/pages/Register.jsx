// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Upload, Loader2, Eye, EyeOff, ArrowLeft, FileText, CheckCircle2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

import illustration from '../assets/images/recruitement-illustration.png';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Verification Modal states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [resending, setResending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profileImageUrl = null;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        const uploadRes = await api.post('/api/auth/upload-image', imageFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
        profileImageUrl = uploadRes.data.imageUrl;
      }
      
      const registerPayload = { ...formData, profileImageUrl };
      await api.post('/api/auth/register', registerPayload);
      
      toast.success('Registration successful!');
      // Login par seedha bhejne ke bajaye, ab Modal open karenge
      setShowVerificationModal(true);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Resend Verification API Call
  const handleResendVerification = async () => {
    setResending(true);
    try {
      // Backend calls expects { "email": "user@example.com" }
      await api.post('/api/auth/resend-verification', { email: formData.email });
      toast.success("Verification email sent again! Please check your inbox.");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f7fe] font-sans text-slate-900">
      
      {/* VERIFICATION SUCCESS MODAL */}
      <AnimatePresence>
        {showVerificationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
            >
              {/* Close Button redirects to login */}
              <button 
                onClick={() => navigate('/login')} 
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 mb-1">Create an Account</h3>
              <p className="text-slate-500 text-sm mb-6">Join us today by entering your details below.</p>

              {/* Purple Notification Box */}
              <div className="bg-[#f8f5ff] border border-[#e5dfff] text-[#5b45ff] p-4 rounded-xl text-sm font-medium mb-6">
                We've sent a verification link to your email. Please verify to log in.
              </div>

              {/* Resend Button */}
              <button
                onClick={handleResendVerification}
                disabled={resending}
                className="bg-[#5b45ff] hover:bg-[#4a35e8] text-white px-6 py-3 rounded-lg font-bold transition flex items-center justify-center mb-4 text-sm disabled:opacity-70"
              >
                {resending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                Resend Verification Email
              </button>

              {/* Back to Login Link */}
              <Link to="/login" className="text-slate-700 hover:text-[#5b45ff] text-sm font-bold transition flex items-center gap-1">
                Back to login
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LEFT PANE - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative bg-white lg:rounded-r-[40px] shadow-2xl z-10">
        
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#5b45ff] transition font-semibold text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="absolute top-8 right-8 hidden sm:flex items-center gap-2 text-lg font-bold text-slate-800">
            <FileText className="text-[#5b45ff] w-5 h-5" />
            CVPie
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-[400px] mt-12 lg:mt-0"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold mb-2 tracking-tight text-slate-900">Sign Up</h2>
            <p className="text-slate-500 font-medium">Elevate your career with a perfect resume.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="flex items-center gap-4 mb-2">
              <div className="relative w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 hover:border-[#5b45ff] transition cursor-pointer group">
                {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <Upload className="text-slate-400 w-6 h-6 group-hover:text-[#5b45ff] transition" />}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Profile Photo</p>
                <p className="text-xs text-slate-500">Optional, max 2MB</p>
              </div>
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange}
                className="w-full bg-white border-b-2 border-slate-200 text-slate-900 py-3 pl-12 pr-4 focus:outline-none focus:border-[#5b45ff] transition text-sm font-semibold placeholder-slate-400" />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange}
                className="w-full bg-white border-b-2 border-slate-200 text-slate-900 py-3 pl-12 pr-4 focus:outline-none focus:border-[#5b45ff] transition text-sm font-semibold placeholder-slate-400" />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (Min. 6 characters)" required minLength="6" value={formData.password} onChange={handleChange}
                className="w-full bg-white border-b-2 border-slate-200 text-slate-900 py-3 pl-12 pr-12 focus:outline-none focus:border-[#5b45ff] transition text-sm font-semibold placeholder-slate-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5b45ff] transition">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="space-y-2 mt-4 text-xs font-medium text-slate-500 pl-1">
               <div className={`flex items-center gap-2 ${formData.password.length >= 6 ? 'text-emerald-500' : ''}`}>
                 <CheckCircle2 size={14} /> At least 6 characters long
               </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#5b45ff] hover:bg-[#4a35e8] text-white font-bold py-4 rounded-full transition shadow-lg shadow-[#5b45ff]/30 flex justify-center items-center mt-6">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <span className="text-sm font-medium text-slate-500">Already a member?</span>
            <Link to="/login" className="text-[#5b45ff] font-bold text-sm hover:underline">Sign In here</Link>
          </div>

        </motion.div>
      </div>

      {/* RIGHT PANE - Illustration Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center items-center">
        
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#5b45ff]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4cd4ff]/10 rounded-full blur-[100px]"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 w-4/5 flex flex-col items-center"
        >
           <img 
             src={illustration} 
             alt="Recruitment Process" 
             className="w-full max-w-[500px] drop-shadow-2xl object-contain mb-8 hover:-translate-y-2 transition duration-500" 
           />
           
           <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-xl text-center max-w-sm">
              <h3 className="font-bold text-xl text-slate-800 mb-2">Stand out from the crowd</h3>
              <p className="text-slate-600 text-sm">Join thousands of professionals who successfully landed their jobs using our tools.</p>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Register;