import React, { useState } from 'react';
import { 
  UploadCloud, FileText, Target, CheckCircle2, AlertCircle, 
  RefreshCw, ScanSearch, Sparkles, TrendingUp, AlertTriangle ,Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AtsChecker = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  
  // UI State: 'input' | 'loading' | 'result'
  const [viewMode, setViewMode] = useState('input'); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    } else {
      toast.error('Please upload a valid PDF file.');
      e.target.value = null;
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload your resume PDF');
    if (!jobDescription.trim()) return toast.error('Please paste the job description');

    setViewMode('loading'); // Show scanning animation

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const response = await api.post('/api/ats/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setResult(response.data.data);
        setViewMode('result'); // Show full width results
        toast.success('Analysis Complete!');
      } else {
        throw new Error(response.data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('ATS Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setViewMode('input'); // Revert to input if failed
    }
  };

  const resetForm = () => {
    setFile(null);
    setJobDescription('');
    setResult(null);
    setViewMode('input');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500 border-emerald-500 stroke-emerald-500';
    if (score >= 60) return 'text-yellow-500 border-yellow-500 stroke-yellow-500';
    return 'text-red-500 border-red-500 stroke-red-500';
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI ATS Score Check</h2>
          <p className="text-sm text-slate-500">Scan your resume against any job description to bypass HR filters.</p>
        </div>
        {viewMode === 'result' && (
          <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition shadow-md">
            <RefreshCw size={16} /> Scan Another Resume
          </button>
        )}
      </div>

      {/* =========================================
          VIEW 1: INPUT FORM
          ========================================= */}
      {viewMode === 'input' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 max-w-4xl mx-auto">
          <form onSubmit={handleAnalyze} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <div>
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3 block flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5b45ff] text-white flex items-center justify-center text-xs">1</span> 
                  Upload Resume
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-[#5b45ff] transition cursor-pointer relative h-[250px] flex flex-col justify-center group">
                  <input 
                    type="file" accept=".pdf" onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    {file ? (
                      <>
                        <div className="w-16 h-16 bg-[#5b45ff]/10 text-[#5b45ff] rounded-2xl flex items-center justify-center mb-4"><FileText size={32} /></div>
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><CheckCircle2 size={14}/> Ready to scan</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#5b45ff]/10 group-hover:text-[#5b45ff] transition-colors"><UploadCloud size={32} /></div>
                        <p className="text-sm font-bold text-slate-700">Click or drag PDF here</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">Maximum size: 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3 block flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5b45ff] text-white flex items-center justify-center text-xs">2</span> 
                  Job Description
                </label>
                <textarea 
                  placeholder="Paste the exact job description from LinkedIn, Indeed, etc..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-[250px] bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm outline-none focus:border-[#5b45ff] focus:ring-2 focus:ring-[#5b45ff]/20 transition resize-none custom-scrollbar leading-relaxed"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#5b45ff] hover:bg-[#4a36e0] text-white font-black py-4 rounded-xl transition shadow-lg shadow-[#5b45ff]/30 flex justify-center items-center gap-2 text-lg"
            >
              <Target size={24} /> Generate ATS Report
            </button>
          </form>
        </div>
      )}

      {/* =========================================
          VIEW 2: LOADING ANIMATION (UPDATED SCANNER)
          ========================================= */}
      {viewMode === 'loading' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 flex flex-col items-center justify-center min-h-[500px]">
          
          {/* Custom CSS for Laser Animation */}
          <style>
            {`
              @keyframes laserScan {
                0% { transform: translateY(-10px); }
                100% { transform: translateY(120px); }
              }
            `}
          </style>
          
          <div className="relative w-24 h-32 bg-slate-50 border-2 border-slate-200 rounded-lg flex flex-col items-center py-6 overflow-hidden mb-8 shadow-inner">
            {/* Fake Document Lines inside the scanner */}
            <div className="w-12 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-16 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-10 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-14 h-2 bg-slate-200 rounded-full"></div>

            {/* Glowing Laser Scanner Line & Trail */}
            <div 
              className="absolute top-0 left-0 w-full z-10"
              style={{ animation: 'laserScan 1.5s ease-in-out infinite alternate' }}
            >
               {/* Solid Laser Line */}
               <div className="w-full h-[2px] bg-[#5b45ff] shadow-[0_0_12px_3px_rgba(91,69,255,0.7)]"></div>
               {/* Fading Trail */}
               <div className="w-full h-8 bg-gradient-to-b from-[#5b45ff]/20 to-transparent"></div>
            </div>
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-2">Scanning Document</h3>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Loader2 size={16} className="animate-spin text-[#5b45ff]" />
            <span>Running AI keyword analysis...</span>
          </div>
        </div>
      )}

      {/* =========================================
          VIEW 3: FULL WIDTH RESULTS
          ========================================= */}
      {viewMode === 'result' && result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Top Score Banner */}
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5b45ff]/20 rounded-full blur-[100px]"></div>
            
            <div className="relative w-32 h-32 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-800" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  className={`stroke-current ${getScoreColor(result.score).split(' ')[2]} transition-all duration-1000 ease-out`} 
                  strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * result.score) / 100} strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-black ${getScoreColor(result.score).split(' ')[0]}`}>{result.score}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Score</span>
              </div>
            </div>

            <div className="text-center md:text-left relative z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {result.score >= 80 ? 'Exceptional Match! 🚀' : result.score >= 60 ? 'Good Potential, Needs Tweaking 👍' : 'Major Revisions Required ⚠️'}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {result.score >= 80 
                  ? "Your resume is highly optimized for this role. Review the minor tips below to perfect it before applying." 
                  : result.score >= 60 
                  ? "You have a solid foundation, but the ATS might filter you out due to some missing requirements. Focus on the missing keywords." 
                  : "Your current resume lacks critical elements required by this job description. Use the recommendations below to restructure your content."}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Actionable Insights (Takes 2/3 width) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Sparkles className="text-[#5b45ff]" size={24} />
                <h3 className="text-lg font-black text-slate-900">Actionable AI Insights</h3>
              </div>
              
              <div className="space-y-4">
                {result.tips?.map((tip, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#5b45ff]/30 transition group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0 group-hover:text-[#5b45ff] group-hover:border-[#5b45ff]/30">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1.5 font-medium">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Keywords Tracker (Takes 1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              
               {/* Missing Keywords Box */}
              <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-red-600" size={20} />
                  <h4 className="font-bold text-red-900">Recommended to Add</h4>
                </div>
                <p className="text-xs text-red-700/80 mb-4 font-medium">These keywords are present in the JD but missing from your resume. Add them if you have the experience.</p>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords?.length > 0 ? (
                    result.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-xs font-bold bg-white text-red-700 px-3 py-1.5 rounded-lg border border-red-200 shadow-sm">{kw}</span>
                    ))
                  ) : (
                    <span className="text-sm text-red-600 font-medium">No critical keywords missing!</span>
                  )}
                </div>
              </div>

              {/* Matched Keywords Box */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-emerald-600" size={20} />
                  <h4 className="font-bold text-emerald-900">Successfully Matched</h4>
                </div>
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  {result.matchedKeywords?.length > 0 ? (
                    result.matchedKeywords.map((kw, i) => (
                      <span key={i} className="text-xs font-semibold bg-emerald-100/50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/50">{kw}</span>
                    ))
                  ) : (
                    <span className="text-sm text-emerald-600 font-medium">No matches found.</span>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AtsChecker;