import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Bell, LayoutDashboard, FileText, CreditCard, 
  Settings, LogOut, Plus, Download, User, Menu, ChevronRight, 
  Trash2, Edit3, Crown, CheckCircle2, SearchCode, Calendar, ShieldCheck, AlertCircle, UploadCloud, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios'; 

// ==========================================
// 1. OVERVIEW COMPONENT
// ==========================================
const OverviewView = ({ stats, resumes, navigate, setShowCreateModal, handleDeleteResume }) => (
  <div className="space-y-8 animate-in fade-in duration-300">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Manage, edit, and download your resumes.</p>
      </div>
      <button 
        onClick={() => setShowCreateModal(true)} 
        className="flex items-center justify-center gap-2 bg-[#5b45ff] hover:bg-[#4a36e0] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#5b45ff]/25 transition"
      >
        <Plus size={18} /> Create New Resume
      </button>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">Total Resumes</p>
          <h3 className="text-3xl font-black text-slate-900">{stats.total}</h3>
        </div>
        <div className="w-12 h-12 bg-[#5b45ff]/10 rounded-xl flex items-center justify-center text-[#5b45ff]"><FileText size={24} /></div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">Downloads</p>
          <h3 className="text-3xl font-black text-slate-900">{stats.downloads}</h3>
        </div>
        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500"><Download size={24} /></div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">Profile Views</p>
          <h3 className="text-3xl font-black text-slate-900">{stats.views}</h3>
        </div>
        <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center text-fuchsia-500"><User size={24} /></div>
      </div>
    </div>

    {/* Recent Resumes Grid */}
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Documents</h2>
      {resumes.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="text-slate-500">No resumes yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.slice(0, 3).map((resume) => (
            <div key={resume._id} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#5b45ff]/30 transition flex flex-col h-48 bg-slate-50 relative">
              <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                <FileText size={40} className="text-slate-300" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button onClick={() => navigate(`/builder/${resume._id}`)} className="flex items-center gap-1.5 bg-white text-[#5b45ff] font-bold px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition"><Edit3 size={16} /> Edit</button>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <div className="overflow-hidden pr-2">
                  <h3 className="font-bold text-slate-900 truncate">{resume.title || 'Untitled Resume'}</h3>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md shrink-0">DRAFT</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ==========================================
// 2. MY RESUMES COMPONENT
// ==========================================
const MyResumesView = ({ resumes, navigate, handleDeleteResume, formatDate }) => {
  const [localSearch, setLocalSearch] = useState('');
  const filtered = resumes.filter(r => (r.title || 'Untitled').toLowerCase().includes(localSearch.toLowerCase()));

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Document Management</h2>
          <p className="text-sm text-slate-500">View and manage all your stored resumes.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <SearchCode size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter resources by name..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff]"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-600 bg-slate-100 border-b border-slate-300">
            <tr>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">Document Name</th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">Created On</th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No documents found matching your criteria.</td></tr>
            ) : (
              filtered.map((resume) => (
                <tr key={resume._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-semibold text-[#5b45ff] flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" /> {resume.title || 'Untitled Resume'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 border border-slate-300 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">DRAFT</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(resume.createdAt || resume.updatedAt)}</td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(resume.updatedAt)}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => navigate(`/builder/${resume._id}`)} className="text-[#5b45ff] font-medium hover:underline">Edit</button>
                    <span className="text-slate-300">|</span>
                    <button onClick={(e) => handleDeleteResume(resume._id, e)} className="text-red-600 font-medium hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// 3. SUBSCRIPTION COMPONENT 
// ==========================================
const SubscriptionView = ({ isPremium, paymentHistory, formatDate }) => {
  const activePayment = paymentHistory.find(p => p.status === 'paid');

  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Billing & Subscriptions</h2>
        <p className="text-sm text-slate-500">Manage your quotas, plans, and payment receipts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-300 rounded-md shadow-sm">
          <div className="px-5 py-3 border-b border-slate-300 bg-slate-100"><h3 className="text-sm font-bold text-slate-800">Plan Comparison</h3></div>
          <div className="p-5 flex divide-x divide-slate-200">
            <div className="flex-1 pr-4">
              <h4 className="font-bold text-slate-900 mb-2">Basic (Free)</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• 1 Standard Template</li>
                <li>• 2 Primary Colors</li>
                <li>• Unlimited Downloads</li>
              </ul>
            </div>
            <div className="flex-1 pl-4">
              <h4 className="font-bold text-[#5b45ff] mb-2 flex items-center gap-1">Premium Pro <Crown size={14}/></h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• ALL Executive & Creative Templates</li>
                <li>• Complete Advanced Color Palette</li>
                <li>• Priority Support & Features</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-md shadow-sm flex flex-col">
          <div className="px-5 py-3 border-b border-slate-300 bg-slate-100 flex justify-between">
            <h3 className="text-sm font-bold text-slate-800">Your Active Plan</h3>
            {isPremium ? <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><ShieldCheck size={14}/> Active</span> : <span className="text-xs font-bold text-slate-500">Free Tier</span>}
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            {isPremium && activePayment ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono text-slate-900">{activePayment.razorpayPaymentId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono text-slate-900">{activePayment.razorpayOrderId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-slate-900">₹{(activePayment.amount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activated On:</span>
                  <span className="text-slate-900">{formatDate(activePayment.createdAt)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-3">You are currently using the Basic free plan.</p>
                <p className="text-xs text-slate-400 mb-4">Upgrade to Premium to view detailed billing and unlock pro templates.</p>
                {/* Note: In a real app, this button would trigger the Razorpay modal here as well */}
                <button className="bg-[#0f172a] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">Upgrade via Builder</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-300 bg-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Order ID</th>
                <th className="px-6 py-3 font-semibold">Plan</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No payment records found.</td>
                </tr>
              ) : (
                paymentHistory.map((payment) => (
                  <tr key={payment._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{payment.razorpayOrderId}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 capitalize">{payment.planType}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">₹{(payment.amount / 100).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {payment.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. ACCOUNT SETTINGS COMPONENT (With Image Upload logic)
// ==========================================
const AccountSettingsView = ({ userProfile, setUserProfile, handleUpdateProfile, handleImageUpload }) => (
  <div className="animate-in fade-in duration-300 max-w-3xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
      <p className="text-sm text-slate-500">Manage your profile and authentication details.</p>
    </div>

    <div className="bg-white border border-slate-300 rounded-md shadow-sm">
      <div className="px-6 py-4 border-b border-slate-300 bg-slate-100">
         <h3 className="text-sm font-bold text-slate-800">General Information</h3>
      </div>
      <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
        
        {/* Avatar Upload */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
          <div className="w-20 h-20 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-400 overflow-hidden relative">
            {userProfile.image ? (
               <img src={userProfile.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <User size={32} />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">Avatar / Profile Image</p>
            <p className="text-xs text-slate-500 mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Full Name</label>
            <input 
              type="text" 
              value={userProfile.name}
              onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              className="w-full border border-slate-300 rounded-md p-2.5 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              Registered Email <AlertCircle size={14} className="text-slate-400" title="Email cannot be changed directly." />
            </label>
            <input 
              type="email" 
              value={userProfile.email}
              disabled
              className="w-full border border-slate-200 bg-slate-100 text-slate-500 rounded-md p-2.5 text-sm outline-none cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-4">
           <button type="submit" className="bg-[#5b45ff] hover:bg-[#4a36e0] text-white px-6 py-2.5 rounded-md text-sm font-semibold transition shadow-sm">
             Save Changes
           </button>
        </div>
      </form>
    </div>
  </div>
);

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
const Dashboard = () => {
  const navigate = useNavigate();
  
  // States
  const [activeView, setActiveView] = useState('overview'); 
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, downloads: 0, views: 0 });
  const [isPremium, setIsPremium] = useState(false); 
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Loading...',
    email: 'loading@example.com',
    image: null
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    checkSubscriptionStatus();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (activeView === 'subscription') {
      fetchPaymentHistory();
    }
  }, [activeView]);

  const fetchUserProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUserProfile({
      name: storedUser.name || 'User',
      email: storedUser.email || 'user@example.com',
      image: storedUser.profileImage || null // 🌟 Loads image from local storage
    });
  };

  const checkSubscriptionStatus = async () => {
    try {
      const response = await api.get('/templates');
      if (response.data && response.data.isPremium !== undefined) {
        setIsPremium(response.data.isPremium);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status");
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/resumes');
      const fetchedResumes = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.resumes || []);
      setResumes(fetchedResumes);
      setStats({ total: fetchedResumes.length || 0, downloads: 0, views: 0 });
    } catch (err) {
      console.error("Failed to fetch resumes");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const res = await api.get('/payment/history'); 
      setPaymentHistory(res.data || []);
    } catch (error) {
      console.error("Failed to fetch payment history");
    }
  };

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) { toast.error("Please enter a title"); return; }
    try {
      const res = await api.post('/resumes', { title: newResumeTitle });
      toast.success('New resume created!');
      setShowCreateModal(false);
      setNewResumeTitle('');
      const newResumeId = res.data?._id || res.data?.data?._id || res.data?.resume?._id;
      if (newResumeId) navigate(`/builder/${newResumeId}`);
      else fetchDashboardData(); 
    } catch (err) {
      toast.error('Failed to create resume');
    }
  };

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await api.delete(`/resumes/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
        toast.success("Resume deleted successfully");
      } catch (error) {
        toast.error("Failed to delete resume");
      }
    }
  };

  // 🌟 NEW: Logic to convert uploaded image to base64 for preview 🌟
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 🌟 UPDATE: Saves image and name to local storage 🌟
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating profile...");
    setTimeout(() => {
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...existingUser, 
        name: userProfile.name,
        profileImage: userProfile.image 
      }));
      toast.success("Profile updated successfully", { id: toastId });
    }, 1000);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login'); 
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden relative">
      
      {/* MODALS */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Name your Resume</h2>
            <p className="text-xs text-slate-500 mb-4">Give your resume a professional title to easily identify it.</p>
            <input 
              type="text" 
              autoFocus
              placeholder="e.g., Senior Java Developer" 
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              className="w-full border border-slate-300 bg-white rounded-lg p-2.5 mb-6 text-sm outline-none focus:border-[#5b45ff] focus:ring-1 focus:ring-[#5b45ff]"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition">Cancel</button>
              <button onClick={handleCreateResume} className="px-5 py-2 bg-[#0f172a] text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm">Create</button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100"><LogOut size={24} /></div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Confirm Logout</h2>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to securely log out of your session?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-sm text-slate-700 font-semibold hover:bg-slate-50 rounded-lg transition">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition shadow-sm">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR (Original Look) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-10">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link to="/dashboard" className="flex items-center gap-2 text-xl font-black text-slate-800 tracking-tight">
              <div className="bg-[#5b45ff] p-1.5 rounded-lg"><FileText size={20} className="text-white" /></div>
              CVPie
            </Link>
          </div>

          <div className="p-4">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-4 px-3">Main Menu</p>
            <nav className="space-y-1">
              <button onClick={() => setActiveView('overview')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition text-left ${activeView === 'overview' ? 'bg-[#5b45ff]/10 text-[#5b45ff]' : 'text-slate-500 hover:bg-slate-50'}`}>
                <LayoutDashboard size={18} /> Dashboard
                {activeView === 'overview' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5b45ff]"></div>}
              </button>
              <button onClick={() => setActiveView('resumes')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition text-left ${activeView === 'resumes' ? 'bg-[#5b45ff]/10 text-[#5b45ff]' : 'text-slate-500 hover:bg-slate-50'}`}>
                <FileText size={18} /> My Resumes
                {activeView === 'resumes' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5b45ff]"></div>}
              </button>
              <button onClick={() => setActiveView('subscription')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition text-left ${activeView === 'subscription' ? 'bg-[#5b45ff]/10 text-[#5b45ff]' : 'text-slate-500 hover:bg-slate-50'}`}>
                <CreditCard size={18} /> Subscription
                {activeView === 'subscription' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5b45ff]"></div>}
              </button>
              <button onClick={() => setActiveView('settings')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition text-left ${activeView === 'settings' ? 'bg-[#5b45ff]/10 text-[#5b45ff]' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Settings size={18} /> Settings
                {activeView === 'settings' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5b45ff]"></div>}
              </button>
            </nav>
          </div>
        </div>

        {/* 🌟 UPDATED: User Profile Sidebar Area (Shows Image now) 🌟 */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#0f172a] flex items-center justify-center text-white font-bold overflow-hidden shadow-sm shrink-0">
              {userProfile.image ? (
                 <img src={userProfile.image} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                 <span className="uppercase">{userProfile.name.charAt(0)}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{userProfile.name}</p>
              <p className="text-xs text-slate-400 truncate">{userProfile.email}</p>
            </div>
          </div>
          <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition group">
            <LogOut size={16} className="group-hover:text-red-500 transition" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOP NAVBAR (Original Look) */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="text-slate-400 hover:text-slate-600 transition lg:hidden"><Menu size={20} /></button>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-[#5b45ff] transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="text-right flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Plan</span>
              {isPremium ? (
                <span className="text-sm font-bold text-yellow-600 flex items-center gap-1">Premium <Crown size={14} className="fill-yellow-500 text-yellow-600" /></span>
              ) : (
                <span className="text-sm font-bold text-[#5b45ff]">Basic</span>
              )}
            </div>
          </div>
        </header>

        {/* DYNAMIC SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-10">
            {activeView === 'overview' && <OverviewView stats={stats} resumes={resumes} navigate={navigate} setShowCreateModal={setShowCreateModal} handleDeleteResume={handleDeleteResume} />}
            {activeView === 'resumes' && <MyResumesView resumes={resumes} navigate={navigate} handleDeleteResume={handleDeleteResume} formatDate={formatDate} />}
            {activeView === 'subscription' && <SubscriptionView isPremium={isPremium} paymentHistory={paymentHistory} formatDate={formatDate} />}
            {activeView === 'settings' && <AccountSettingsView userProfile={userProfile} setUserProfile={setUserProfile} handleUpdateProfile={handleUpdateProfile} handleImageUpload={handleImageUpload} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;