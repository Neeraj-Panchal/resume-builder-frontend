import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Bell, LayoutDashboard, FileText, CreditCard, 
  Settings, LogOut, Plus, Download, User, Menu, ChevronRight, Trash2, Edit3
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios'; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  // States
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, downloads: 0, views: 0 });
  const [searchTerm, setSearchTerm] = useState(''); // NEW: Search state
  
  // Modals State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetching resumes
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/resumes');
      
      // Safety check: Backend might return array directly or inside an object (e.g. res.data.data)
      const fetchedResumes = Array.isArray(res.data) 
        ? res.data 
        : (res.data?.data || res.data?.resumes || []);
        
      setResumes(fetchedResumes);
      setStats({
        total: fetchedResumes.length || 0,
        downloads: 0, 
        views: 0      
      });
    } catch (err) {
      console.error("Failed to fetch resumes", err);
      // Fallback dummy data
      const dummyData = [
        { _id: '1', title: '1st', updatedAt: '2026-03-08T00:00:00Z', status: 'DRAFT', thumbnail: null },
        { _id: '2', title: 'My first resume', updatedAt: '2026-03-06T00:00:00Z', status: 'DRAFT', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop' }
      ];
      setResumes(dummyData);
      setStats({ total: 2, downloads: 0, views: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Create Resume Logic
  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) {
      toast.error("Please enter a resume title");
      return;
    }
    try {
      const res = await api.post('/resumes', { title: newResumeTitle });
      toast.success('New resume created!');
      setShowCreateModal(false);
      setNewResumeTitle('');
      
      // Safety check for ID mapping
      const newResumeId = res.data?._id || res.data?.data?._id || res.data?.resume?._id;
      
      if (newResumeId) {
        navigate(`/builder/${newResumeId}`);
      } else {
        toast.error("Resume created, but ID not found. Please refresh.");
        fetchDashboardData(); // Refresh list if ID is missing so user can click it manually
      }
    } catch (err) {
      toast.error('Failed to create resume');
      console.error(err);
    }
  };

  // Delete Resume Logic
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

  // Logout Logic
  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('token'); // Always clear token on logout
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login'); 
  };

  // Work in progress handler
  const handleWIP = (e) => {
    e.preventDefault();
    toast("🚧 Ye page abhi process mein hai, jaldi hi banega!", {
      icon: '⚙️',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // FILTERING RESUMES BASED ON SEARCH
  const filteredResumes = resumes.filter(resume => 
    (resume.title || 'Untitled Resume').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden relative">
      
      {/* --- CREATE RESUME MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black text-slate-900 mb-2">Name your Resume</h2>
            <p className="text-sm text-slate-500 mb-4">Give your resume a professional title.</p>
            <input 
              type="text" 
              autoFocus
              placeholder="e.g., Full Stack Developer Role" 
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 mb-6 outline-none focus:ring-2 focus:ring-[#5b45ff]/20 focus:border-[#5b45ff]"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-500 font-semibold hover:bg-slate-50 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateResume}
                className="px-6 py-2 bg-[#5b45ff] text-white font-semibold rounded-lg hover:bg-[#4a36e0] transition shadow-lg shadow-[#5b45ff]/25"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[350px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={28} />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Ready to leave?</h2>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-lg shadow-red-500/25 flex-1"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-10">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link to="/dashboard" className="flex items-center gap-2 text-xl font-black text-slate-800 tracking-tight">
              <div className="bg-[#5b45ff] p-1.5 rounded-lg">
                <FileText size={20} className="text-white" />
              </div>
              CVPie
            </Link>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-4 px-3">Main Menu</p>
            <nav className="space-y-1">
              <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-[#5b45ff]/10 text-[#5b45ff] rounded-xl font-semibold transition">
                <LayoutDashboard size={18} /> Dashboard
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5b45ff]"></div>
              </Link>
              <button onClick={handleWIP} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-xl font-medium transition text-left">
                <FileText size={18} /> My Resumes
              </button>
              <button onClick={handleWIP} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-xl font-medium transition text-left">
                <CreditCard size={18} /> Subscription
              </button>
              <button onClick={handleWIP} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-xl font-medium transition text-left">
                <Settings size={18} /> Settings
              </button>
            </nav>
          </div>
        </div>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">neeraj</p>
              <p className="text-xs text-slate-400 truncate">neerajpanchal098@gmail.c...</p>
            </div>
          </div>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition group"
          >
            <LogOut size={16} className="group-hover:text-red-500 transition" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="text-slate-400 hover:text-slate-600 transition lg:hidden">
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              {/* SEARCH INPUT */}
              <input 
                type="text" 
                placeholder="Search resumes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5b45ff]/20 focus:border-[#5b45ff] transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-[#5b45ff] transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="text-right flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Plan</span>
              <span className="text-sm font-bold text-[#5b45ff]">Basic</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8 pb-10">
            
            {/* Header Section */}
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
                <div className="w-12 h-12 bg-[#5b45ff]/10 rounded-xl flex items-center justify-center text-[#5b45ff]">
                  <FileText size={24} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500 mb-1">Downloads</p>
                  <h3 className="text-3xl font-black text-slate-900">{stats.downloads}</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Download size={24} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500 mb-1">Profile Views</p>
                  <h3 className="text-3xl font-black text-slate-900">{stats.views}</h3>
                </div>
                <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center text-fuchsia-500">
                  <User size={24} />
                </div>
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Recent Documents</h2>
                {searchTerm && (
                  <p className="text-sm text-[#5b45ff] font-medium bg-[#5b45ff]/10 px-3 py-1 rounded-lg">
                    Showing results for: "{searchTerm}"
                  </p>
                )}
              </div>
              
              {loading ? (
                <div className="flex justify-center py-10"><span className="animate-pulse text-slate-400 font-bold">Loading your resumes...</span></div>
              ) : filteredResumes.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                  <FileText size={48} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500">
                    {searchTerm ? "No resumes found for this search." : "No resumes yet. Create your first one!"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* USE filteredResumes INSTEAD OF resumes */}
                  {filteredResumes.map((resume) => {
                    const imageUrl = resume.thumbnail || resume.profileInfo?.image;
                    
                    return (
                      <div 
                        key={resume._id} 
                        className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#5b45ff]/30 transition flex flex-col h-full bg-slate-50/50 relative"
                      >
                        {/* Thumbnail Area */}
                        <div className="h-48 bg-white flex items-center justify-center border-b border-slate-100 p-4 relative overflow-hidden">
                          {imageUrl ? (
                            <img src={imageUrl} alt="resume preview" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <div className="w-24 h-32 bg-slate-50 border-2 border-slate-100 rounded flex items-center justify-center">
                              <FileText size={32} className="text-slate-300" />
                            </div>
                          )}
                          
                          {/* HOVER OVERLAY WITH EDIT AND DELETE BUTTONS */}
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                            <button 
                              onClick={() => navigate(`/builder/${resume._id}`)}
                              className="flex items-center gap-1.5 bg-white text-[#5b45ff] font-bold px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition transform translate-y-4 group-hover:translate-y-0"
                            >
                              <Edit3 size={16} /> Edit
                            </button>
                            <button 
                              onClick={(e) => handleDeleteResume(resume._id, e)}
                              className="flex items-center gap-1.5 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition transform translate-y-4 group-hover:translate-y-0"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </div>
                        
                        {/* Card Details */}
                        <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 truncate">{resume.title || 'Untitled Resume'}</h3>
                            <p className="text-xs text-slate-500 mt-1">Last edited: {formatDate(resume.updatedAt)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                              {resume.status || 'DRAFT'}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#5b45ff] transition" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;