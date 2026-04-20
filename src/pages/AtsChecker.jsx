import React, { useState } from 'react';
import { 
  UploadCloud, FileText, Target, CheckCircle2, AlertCircle, 
  RefreshCw, ScanSearch, Sparkles, TrendingUp, AlertTriangle, Loader2, Link as LinkIcon
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

    setViewMode('loading'); 

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription.trim());

      const response = await api.post('/api/ats/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setResult(response.data.data);
        setViewMode('result'); 
        toast.success(jobDescription.trim() ? 'Targeted Analysis Complete!' : 'General Audit Complete!');
      } else {
        throw new Error(response.data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('ATS Error:', error);
      
      // ERROR HANDLING IMPROVED:
      let errorMsg = "Something went wrong. Please try again.";
      
      if (error.response && error.response.data) {
        // Handle direct string errors
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } 
        // Handle object errors with a message property
        else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        // Handle object errors with an error property
        else if (error.response.data.error) {
           errorMsg = error.response.data.error;
        }
      }

      // Check specifically for AI overload errors (503 Service Unavailable)
      if (errorMsg.includes("503") || errorMsg.includes("high demand") || errorMsg.toLowerCase().includes("ai analysis failed") || error.message.includes("503")) {
          toast.error("AI is currently overloaded with high demand. Please try again in a few minutes. 🤖⏳", { duration: 5000 });
      } else {
          toast.error(errorMsg);
      }

      setViewMode('input'); 
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

  // FUNCTION: AI ke **bold** text ko real bold banane ke liye
  const formatText = (text) => {
    // Ye string ko ** ke hisaab se tod dega
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => 
      // Har alternate part bold hoga (jiske aage-peechhe ** tha)
      index % 2 === 1 ? <strong key={index} className="text-slate-900 font-black">{part}</strong> : part
    );
  };

  // Helper for metric progress bars
  const MetricBar = ({ label, score }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
        <span>{label}</span>
        <span>{score}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Advanced AI Resume Audit</h2>
          <p className="text-sm text-slate-500">Scan your resume for general health or against a specific job description.</p>
        </div>
        {viewMode === 'result' && (
          <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition shadow-md">
            <RefreshCw size={16} /> Scan Another Resume
          </button>
        )}
      </div>

      {/* VIEW 1: INPUT FORM */}
      {viewMode === 'input' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 max-w-4xl mx-auto">
          <form onSubmit={handleAnalyze} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <div>
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3 block flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5b45ff] text-white flex items-center justify-center text-xs">1</span> 
                  Upload Resume *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-[#5b45ff] transition cursor-pointer relative h-[250px] flex flex-col justify-center group">
                  <input 
                    type="file" accept=".pdf" onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
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
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">2</span> 
                  Job Description <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase ml-2">Optional</span>
                </label>
                <textarea 
                  placeholder="Paste a job description for targeted Keyword Analysis. Leave blank for a General Resume Health Audit."
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
              <Target size={24} /> {jobDescription.trim() ? "Generate Targeted Match Report" : "Run General Health Audit"}
            </button>
          </form>
        </div>
      )}

      {/* VIEW 2: LOADING ANIMATION */}
      {viewMode === 'loading' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 flex flex-col items-center justify-center min-h-[500px]">
          <style>
            {`
              @keyframes laserScan {
                0% { transform: translateY(-10px); }
                100% { transform: translateY(120px); }
              }
            `}
          </style>
          
          <div className="relative w-24 h-32 bg-slate-50 border-2 border-slate-200 rounded-lg flex flex-col items-center py-6 overflow-hidden mb-8 shadow-inner">
            <div className="w-12 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-16 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-10 h-2 bg-slate-200 rounded-full mb-3"></div>
            <div className="w-14 h-2 bg-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full z-10" style={{ animation: 'laserScan 1.5s ease-in-out infinite alternate' }}>
               <div className="w-full h-[2px] bg-[#5b45ff] shadow-[0_0_12px_3px_rgba(91,69,255,0.7)]"></div>
               <div className="w-full h-8 bg-gradient-to-b from-[#5b45ff]/20 to-transparent"></div>
            </div>
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-2">Scanning Document</h3>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Loader2 size={16} className="animate-spin text-[#5b45ff]" />
            <span>Analyzing grammar, impact metrics, and structure...</span>
          </div>
        </div>
      )}

      {/* VIEW 3: FULL WIDTH RESULTS */}
      {viewMode === 'result' && result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Top Score Banner */}
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5b45ff]/20 rounded-full blur-[100px]"></div>
            
            <div className="relative w-32 h-32 shrink-0 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-800" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  className={`stroke-current ${getScoreColor(result.overallScore).split(' ')[2]} transition-all duration-1000 ease-out`} 
                  strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * result.overallScore) / 100} strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-black ${getScoreColor(result.overallScore).split(' ')[0]}`}>{result.overallScore}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Overall</span>
              </div>
            </div>

            <div className="text-center md:text-left relative z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {result.overallScore >= 80 ? 'Excellent Resume Health! 🚀' : result.overallScore >= 60 ? 'Good Potential, Needs Polish 👍' : 'Major Revisions Required ⚠️'}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {jobDescription.trim() 
                  ? "This score reflects both your general resume quality and how well it matches the target job description."
                  : "This is a general health audit. Your resume was evaluated on readability, action verbs, and quantifiable impact."}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Actionable Insights & Metrics */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Detailed Metrics Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-6">Resume Health Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <MetricBar label="Grammar & Spelling" score={result.metrics?.grammarAndSpelling || 0} />
                  <MetricBar label="Quantifiable Impact (Numbers)" score={result.metrics?.quantifiedImpact || 0} />
                  <MetricBar label="Strong Action Verbs" score={result.metrics?.actionVerbs || 0} />
                  <MetricBar label="Readability & Formatting" score={result.metrics?.readability || 0} />
                </div>
              </div>

              {/* Actionable Insights */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <Sparkles className="text-[#5b45ff]" size={24} />
                  <h3 className="text-lg font-black text-slate-900">Critical Improvements</h3>
                </div>
                <div className="space-y-4">
                  {result.criticalImprovements?.map((tip, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#5b45ff]/30 transition group">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0 group-hover:text-[#5b45ff]">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed pt-1.5 font-medium">{formatText(tip)}</p>
                    </div>
                  ))}
                  {(!result.criticalImprovements || result.criticalImprovements.length === 0) && (
                    <p className="text-sm text-slate-500">Your resume looks incredibly solid! No major improvements needed.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Keywords & Social Links */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Social Presence Box */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <LinkIcon className="text-[#5b45ff]" size={20} />
                  <h4 className="font-bold text-slate-900">Social Presence</h4>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Links Found:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.socialLinksFound?.length > 0 ? (
                      result.socialLinksFound.map((link, i) => <span key={i} className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">{link}</span>)
                    ) : <span className="text-xs text-slate-400">None detected</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Recommended to Add:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingLinks?.length > 0 ? (
                      result.missingLinks.map((link, i) => <span key={i} className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{link}</span>)
                    ) : <span className="text-xs text-emerald-600 font-medium">All essential links included!</span>}
                  </div>
                </div>
              </div>

              {/* Keyword Analysis (ONLY SHOW IF JD WAS PROVIDED) */}
              {jobDescription.trim() && (
                <>
                  <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="text-red-600" size={20} />
                      <h4 className="font-bold text-red-900">Missing Keywords</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords?.length > 0 ? (
                        result.missingKeywords.map((kw, i) => <span key={i} className="text-xs font-bold bg-white text-red-700 px-3 py-1.5 rounded-lg border border-red-200 shadow-sm">{kw}</span>)
                      ) : <span className="text-sm text-red-600 font-medium">No critical keywords missing!</span>}
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="text-emerald-600" size={20} />
                      <h4 className="font-bold text-emerald-900">Matched Keywords</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                      {result.matchedKeywords?.length > 0 ? (
                        result.matchedKeywords.map((kw, i) => <span key={i} className="text-xs font-semibold bg-emerald-100/50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/50">{kw}</span>)
                      ) : <span className="text-sm text-emerald-600 font-medium">No matches found.</span>}
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AtsChecker;