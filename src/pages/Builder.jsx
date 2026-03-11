import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Save, ArrowLeft, Loader2, User, Phone, Briefcase, Code, Plus, 
  Trash2, Download, Palette, FileText, ChevronLeft, ChevronRight, 
  GraduationCap, FolderGit2, Award, Languages, Heart, Eye, Mail, Send, X
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ThemeModal from "../components/ThemeModal";
import { ModernTemplate, CreativeTemplate, ExecutiveTemplate } from "../utils/Templates";

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ----- STATES -----
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  // Theme, Layout & Subscription States
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [themeColor, setThemeColor] = useState("#5b45ff");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // 🌟 NEW: Subscription status
  
  // Wizard, Preview & Email States
  const [activeStep, setActiveStep] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailData, setEmailData] = useState({
    recipientEmail: "",
    subject: "",
    message: "Please find my resume attached.\n\nBest regards,"
  });

  const resumeRef = useRef();
  const modalResumeRef = useRef();

  const steps = [
    { title: "Personal Details", icon: <User size={20}/> },
    { title: "Experience", icon: <Briefcase size={20}/> },
    { title: "Education", icon: <GraduationCap size={20}/> },
    { title: "Skills", icon: <Code size={20}/> },
    { title: "Projects", icon: <FolderGit2 size={20}/> },
    { title: "Certifications", icon: <Award size={20}/> },
    { title: "Languages", icon: <Languages size={20}/> },
    { title: "Interests", icon: <Heart size={20}/> },
  ];

  // ----- SAFE INITIAL STATE -----
  const [resumeData, setResumeData] = useState({
    title: "",
    profileInfo: { fullName: "", designation: "", summary: "", profilePreviewUrl: "" },
    contactInfo: { email: "", phone: "", location: "", linkedIn: "", github: "", website: "" },
    workExperiences: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
  });

  // ----- FETCH DATA -----
  useEffect(() => {
    if (id) fetchResumeDetails();
    checkSubscriptionStatus(); // 🌟 NEW: Check premium status on load
  }, [id]);

  // 🌟 NEW: Function to check if user is Premium 🌟
  const checkSubscriptionStatus = async () => {
    try {
      // Calls your TemplatesController GET /api/templates
      const response = await api.get('/templates');
      if (response.data && response.data.isPremium !== undefined) {
        setIsPremium(response.data.isPremium);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
  };

  const fetchResumeDetails = async () => {
    try {
      const response = await api.get(`/resumes/${id}`);
      const apiData = response.data?.data || response.data?.resume || response.data;

      setResumeData({
        title: apiData.title || "Untitled Resume",
        profileInfo: {
          fullName: apiData.profileInfo?.fullName || "",
          designation: apiData.profileInfo?.designation || "",
          summary: apiData.profileInfo?.summary || "",
          profilePreviewUrl: apiData.profileInfo?.profilePreviewUrl || "",
        },
        contactInfo: {
          email: apiData.contactInfo?.email || "",
          phone: apiData.contactInfo?.phone || "",
          location: apiData.contactInfo?.location || "",
          linkedIn: apiData.contactInfo?.linkedIn || "",
          github: apiData.contactInfo?.github || "",
          website: apiData.contactInfo?.website || "",
        },
        workExperiences: apiData.workExperiences || [],
        education: apiData.education || [],
        skills: apiData.skills || [],
        projects: apiData.projects || [],
        certifications: apiData.certifications || [],
        languages: apiData.languages || [],
        interests: apiData.interests || [],
      });
    } catch (error) {
      toast.error("Could not load the resume.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ----- ACTIONS -----
  const handleSave = async (showToast = true) => {
    setSaving(true);
    try {
      const payload = { ...resumeData };
      await api.put(`/resumes/${id}`, payload);
      if(showToast) toast.success("Progress saved!");
      return true;
    } catch (error) {
      toast.error("Save failed.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this resume? This cannot be undone.")) {
      try {
        await api.delete(`/resumes/${id}`);
        toast.success("Resume deleted.");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to delete.");
      }
    }
  };

  const handleSaveAndExit = async () => {
    const success = await handleSave(false);
    if (success) {
      toast.success("Saved successfully. Exiting...");
      navigate("/dashboard");
    }
  };

  const handleNextStep = async () => {
    await handleSave(false); 
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // 🌟 HELPER: GENERATE PDF OBJECT (Used for both Download and Email) 🌟
  const generatePDFObject = async () => {
    const targetRef = showPreviewModal ? modalResumeRef.current : resumeRef.current;
    if (!targetRef) throw new Error("Resume not ready yet.");

    const clone = targetRef.cloneNode(true);
    clone.style.transform = "none";
    clone.style.width = "210mm";
    clone.style.height = "auto";
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, { 
      scale: 3, 
      useCORS: true, 
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY
    });
    
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0; 

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf;
  };

  // 🌟 DOWNLOAD PDF ACTION 🌟
  const handleExportPDF = async () => {
    setExporting(true);
    const toastId = toast.loading("Generating HD PDF...");
    try {
      const pdf = await generatePDFObject();
      const fileName = resumeData.profileInfo?.fullName 
        ? `${resumeData.profileInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : "My_Resume.pdf";
      
      pdf.save(fileName);
      toast.success("Downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Export failed. Please try again.", { id: toastId });
    } finally {
      setExporting(false);
    }
  };

  // 🌟 OPEN EMAIL MODAL ACTION 🌟
  const openEmailModal = () => {
    setEmailData(prev => ({
      ...prev,
      subject: `Resume - ${resumeData.profileInfo?.fullName || 'Application'}`,
    }));
    setShowEmailModal(true);
  };

  // 🌟 SEND EMAIL ACTION (API CALL) 🌟
  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailData.recipientEmail) {
      toast.error("Recipient email is required!");
      return;
    }

    setIsSendingEmail(true);
    const toastId = toast.loading("Preparing document & sending email...");

    try {
      const pdf = await generatePDFObject();
      const pdfBlob = pdf.output("blob");
      
      const fileName = resumeData.profileInfo?.fullName 
        ? `${resumeData.profileInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : "Resume.pdf";

      const formData = new FormData();
      formData.append('recipientEmail', emailData.recipientEmail);
      formData.append('subject', emailData.subject || 'Resume Application');
      formData.append('message', emailData.message);
      
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
      formData.append('pdfFile', pdfFile);

      const response = await api.post('/email/send-resume', formData);

      if (response.data.success || response.status === 200) {
        toast.success("Resume sent successfully!", { id: toastId });
        setShowEmailModal(false);
        setEmailData({ ...emailData, recipientEmail: '' }); 
      } else {
        toast.error("Failed to send email.", { id: toastId });
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to send email. Check network or backend.", { id: toastId });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // ----- INPUT HANDLERS -----
  const handleObjectChange = (section, e) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [e.target.name]: e.target.value },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...(resumeData[section] || [])];
    updated[index][field] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const addArrayItem = (section, emptyObject) => {
    setResumeData({ ...resumeData, [section]: [...(resumeData[section] || []), emptyObject] });
  };

  const removeArrayItem = (section, index) => {
    setResumeData({ ...resumeData, [section]: resumeData[section].filter((_, i) => i !== index) });
  };

  const handleStringArrayChange = (section, index, value) => {
    const updated = [...(resumeData[section] || [])];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  // ----- WIZARD STEP RENDERER -----
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Personal & Contact
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#5b45ff] border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Full Name</label>
                  <input type="text" name="fullName" value={resumeData.profileInfo?.fullName || ""} onChange={(e) => handleObjectChange('profileInfo', e)} placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Designation</label>
                  <input type="text" name="designation" value={resumeData.profileInfo?.designation || ""} onChange={(e) => handleObjectChange('profileInfo', e)} placeholder="UI/UX Designer" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Professional Summary</label>
                  <textarea name="summary" value={resumeData.profileInfo?.summary || ""} onChange={(e) => handleObjectChange('profileInfo', e)} rows="4" placeholder="Brief introduction..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm resize-none" />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#5b45ff] border-b pb-2">Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="email" name="email" value={resumeData.contactInfo?.email || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                <input type="text" name="phone" value={resumeData.contactInfo?.phone || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                <input type="text" name="location" value={resumeData.contactInfo?.location || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="City, Country" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                <input type="text" name="linkedIn" value={resumeData.contactInfo?.linkedIn || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="LinkedIn URL" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                <input type="text" name="github" value={resumeData.contactInfo?.github || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="GitHub URL" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
                <input type="text" name="website" value={resumeData.contactInfo?.website || ""} onChange={(e) => handleObjectChange('contactInfo', e)} placeholder="Portfolio Website URL" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" />
              </div>
            </section>
          </div>
        );
      
      case 1: // Experience
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Work Experience</h3>
              <button onClick={() => addArrayItem('workExperiences', { company: "", role: "", startDate: "", endDate: "", description: "" })} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Experience</button>
            </div>
            {(resumeData.workExperiences || []).map((exp, idx) => (
              <div key={idx} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative space-y-4">
                <button onClick={() => removeArrayItem('workExperiences', idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"><Trash2 size={18}/></button>
                <div className="grid grid-cols-2 gap-4 pr-8">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Company</label>
                    <input type="text" placeholder="e.g. Google" value={exp.company} onChange={(e) => handleArrayChange('workExperiences', idx, 'company', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Role</label>
                    <input type="text" placeholder="e.g. Software Engineer" value={exp.role} onChange={(e) => handleArrayChange('workExperiences', idx, 'role', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Start Date</label>
                    <input type="date" value={exp.startDate} onChange={(e) => handleArrayChange('workExperiences', idx, 'startDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff] text-slate-600" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">End Date (Leave blank if present)</label>
                    <input type="date" value={exp.endDate} onChange={(e) => handleArrayChange('workExperiences', idx, 'endDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff] text-slate-600" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Job Description</label>
                  <textarea placeholder="Describe your responsibilities..." value={exp.description} onChange={(e) => handleArrayChange('workExperiences', idx, 'description', e.target.value)} rows="3" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#5b45ff] resize-none" />
                </div>
              </div>
            ))}
          </div>
        );

      case 2: // Education
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Education</h3>
              <button onClick={() => addArrayItem('education', { degree: "", institution: "", startDate: "", endDate: "", Marks: "" })} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Education</button>
            </div>
            {(resumeData.education || []).map((edu, idx) => (
              <div key={idx} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative space-y-4">
                <button onClick={() => removeArrayItem('education', idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"><Trash2 size={18}/></button>
                <div className="grid grid-cols-2 gap-4 pr-8">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Degree / Course</label>
                    <input type="text" placeholder="B.Tech Computer Science" value={edu.degree} onChange={(e) => handleArrayChange('education', idx, 'degree', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Institution / School</label>
                    <input type="text" placeholder="XYZ University" value={edu.institution} onChange={(e) => handleArrayChange('education', idx, 'institution', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Start Date</label>
                    <input type="date" value={edu.startDate} onChange={(e) => handleArrayChange('education', idx, 'startDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff] text-slate-600" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">End Date</label>
                    <input type="date" value={edu.endDate} onChange={(e) => handleArrayChange('education', idx, 'endDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff] text-slate-600" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Marks / CGPA</label>
                    <input type="text" placeholder="e.g. 8.5 CGPA or 90%" value={edu.Marks} onChange={(e) => handleArrayChange('education', idx, 'Marks', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 3: // Skills
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <h3 className="text-lg font-bold text-[#5b45ff] mb-4">Skills</h3>
            <div className="space-y-4">
              {(resumeData.skills || []).map((skill, idx) => (
                <div key={idx} className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm flex items-center justify-between">
                  <div className="flex flex-col gap-1 w-1/3">
                    <label className="text-[11px] font-bold text-slate-700">Skill Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React.js" 
                      value={skill.name} 
                      onChange={(e) => handleArrayChange('skills', idx, 'name', e.target.value)} 
                      className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-700">Proficiency ({skill.progress || 5}/5)</label>
                    <div className="flex gap-2 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          onClick={() => handleArrayChange('skills', idx, 'progress', level)}
                          className={`w-7 h-7 rounded-md cursor-pointer transition-all duration-200 ${
                            (skill.progress || 5) >= level 
                              ? 'bg-[#5b45ff] shadow-[0_2px_10px_-2px_rgba(91,69,255,0.5)] scale-105' 
                              : 'bg-slate-100 hover:bg-[#5b45ff]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button onClick={() => removeArrayItem('skills', idx)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition">
                    <Trash2 size={18}/>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addArrayItem('skills', { name: "", progress: 5 })} className="text-[#5b45ff] bg-[#5b45ff]/10 hover:bg-[#5b45ff]/20 px-5 py-2.5 text-sm font-bold rounded-xl transition flex items-center gap-2 mt-4">
              <Plus size={16}/> Add Skill
            </button>
          </div>
        );

      case 4: // Projects
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Projects</h3>
              <button onClick={() => addArrayItem('projects', { projectTitle: "", description: "", github: "", liveDemo: "" })} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Project</button>
            </div>
            {(resumeData.projects || []).map((proj, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative space-y-3">
                <button onClick={() => removeArrayItem('projects', idx)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                <div className="grid grid-cols-2 gap-3 pr-6">
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Project Title</label>
                    <input type="text" placeholder="E-commerce App" value={proj.projectTitle} onChange={(e) => handleArrayChange('projects', idx, 'projectTitle', e.target.value)} className="col-span-2 w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">GitHub Link</label>
                    <input type="text" placeholder="https://github.com/..." value={proj.github} onChange={(e) => handleArrayChange('projects', idx, 'github', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Live Demo Link</label>
                    <input type="text" placeholder="https://..." value={proj.liveDemo} onChange={(e) => handleArrayChange('projects', idx, 'liveDemo', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Description</label>
                  <textarea placeholder="Built using React and Node.js..." value={proj.description} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} rows="3" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#5b45ff] resize-none" />
                </div>
              </div>
            ))}
          </div>
        );

      case 5: // Certifications
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Certifications</h3>
              <button onClick={() => addArrayItem('certifications', { title: "", issuer: "", date: "" })} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Certification</button>
            </div>
            {(resumeData.certifications || []).map((cert, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative flex gap-3 pr-8 flex-col sm:flex-row">
                <button onClick={() => removeArrayItem('certifications', idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                <div className="flex-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Certification Title</label>
                  <input type="text" placeholder="AWS Certified Developer" value={cert.title} onChange={(e) => handleArrayChange('certifications', idx, 'title', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Issuer</label>
                  <input type="text" placeholder="Amazon" value={cert.issuer} onChange={(e) => handleArrayChange('certifications', idx, 'issuer', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff]" />
                </div>
                <div className="w-full sm:w-1/4">
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Date</label>
                  <input type="date" value={cert.date} onChange={(e) => handleArrayChange('certifications', idx, 'date', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5b45ff] text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        );

      case 6: // Languages
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Languages</h3>
              <button onClick={() => addArrayItem('languages', { name: "", progress: 100 })} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Language</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {(resumeData.languages || []).map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 pl-3 pr-1 py-1.5 rounded-full group shadow-sm">
                  <input type="text" placeholder="e.g. English" value={lang.name} onChange={(e) => handleArrayChange('languages', idx, 'name', e.target.value)} className="bg-transparent border-none outline-none text-sm font-bold w-24" />
                  <button onClick={() => removeArrayItem('languages', idx)} className="p-1 hover:bg-red-100 hover:text-red-500 rounded-full text-slate-400 opacity-50 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        );

      case 7: // Interests
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#5b45ff]">Interests / Hobbies</h3>
              <button onClick={() => addArrayItem('interests', "")} className="text-[#5b45ff] hover:bg-[#5b45ff]/10 px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2"><Plus size={16}/> Add Interest</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {(resumeData.interests || []).map((interest, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 pl-3 pr-1 py-1.5 rounded-full group shadow-sm">
                  <input type="text" placeholder="e.g. Reading" value={interest} onChange={(e) => handleStringArrayChange('interests', idx, e.target.value)} className="bg-transparent border-none outline-none text-sm font-bold w-24" />
                  <button onClick={() => removeArrayItem('interests', idx)} className="p-1 hover:bg-red-100 hover:text-red-500 rounded-full text-slate-400 opacity-50 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        );

      default: return null;
    }
  };


  if (loading)
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5b45ff] w-12 h-12" />
      </div>
    );

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-slate-900 overflow-hidden relative">
      
      {/* ----- PREVIEW & DOWNLOAD MODAL ----- */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-sm flex flex-col overflow-hidden">
          <div className="h-16 bg-white flex items-center justify-between px-6 shrink-0 shadow-md z-[210]">
            <h2 className="font-bold text-xl text-slate-800">Resume Preview</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowPreviewModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                Edit Resume
              </button>

              <button 
                onClick={openEmailModal} 
                className="flex items-center justify-center p-2.5 text-slate-600 bg-slate-100 hover:bg-[#5b45ff] hover:text-white rounded-xl transition-all duration-300 group overflow-hidden"
                title="Send via Email"
              >
                <Mail size={18} className="shrink-0" />
                <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-sm font-bold">
                  Send Email
                </span>
              </button>

              <button onClick={handleExportPDF} disabled={exporting} className="px-5 py-2.5 text-sm font-bold text-white bg-[#5b45ff] hover:bg-[#4a36e0] rounded-xl flex items-center gap-2 transition shadow-lg shadow-[#5b45ff]/20">
                {exporting ? <Loader2 className="animate-spin w-4 h-4" /> : <Download size={16} />} 
                Download PDF
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-10 flex justify-center custom-scrollbar">
            <div className="transform scale-[0.85] origin-top shadow-2xl bg-white mb-20">
               {selectedTemplate === "modern" && <ModernTemplate ref={modalResumeRef} data={resumeData} color={themeColor} />}
               {selectedTemplate === "creative" && <CreativeTemplate ref={modalResumeRef} data={resumeData} color={themeColor} />}
               {selectedTemplate === "executive" && <ExecutiveTemplate ref={modalResumeRef} data={resumeData} color={themeColor} />}
            </div>
          </div>
        </div>
      )}

      {/* ----- SEND EMAIL MODAL ----- */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-[#5b45ff] font-bold text-lg">
                <Mail size={20} /> Send Resume via Email
              </div>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-700 transition">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSendEmail} className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 mb-1 block">Recipient Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required 
                  placeholder="hr@company.com" 
                  value={emailData.recipientEmail} 
                  onChange={e => setEmailData({...emailData, recipientEmail: e.target.value})} 
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" 
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 mb-1 block">Subject</label>
                <input 
                  type="text" 
                  placeholder="Resume Application" 
                  value={emailData.subject} 
                  onChange={e => setEmailData({...emailData, subject: e.target.value})} 
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm" 
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 mb-1 block">Message</label>
                <textarea 
                  rows="4" 
                  value={emailData.message} 
                  onChange={e => setEmailData({...emailData, message: e.target.value})} 
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-[#5b45ff] text-sm resize-none"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEmailModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" disabled={isSendingEmail} className="px-6 py-2.5 text-sm font-bold text-white bg-[#5b45ff] hover:bg-[#4a36e0] rounded-xl transition flex items-center gap-2 shadow-lg shadow-[#5b45ff]/20 disabled:opacity-70">
                  {isSendingEmail ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----- TOP NAVBAR ----- */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-[#5b45ff] p-1.5 rounded-lg shadow-sm">
              <FileText className="text-white w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={resumeData.title} 
              onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
              placeholder="Resume Title"
              className="text-lg font-bold tracking-tight text-slate-800 bg-transparent outline-none focus:border-b-2 focus:border-[#5b45ff] w-48 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete Resume">
            <Trash2 size={18} />
          </button>
          
          <div className="w-px h-6 bg-slate-200 mx-1"></div>

          <button onClick={() => setIsThemeModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition border border-slate-200">
            <Palette size={16} className="text-[#5b45ff]" /> Change Theme
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#5b45ff] bg-[#5b45ff]/10 hover:bg-[#5b45ff]/20 rounded-xl transition border border-[#5b45ff]/20">
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />} Save
          </button>
          
          <button onClick={() => setShowPreviewModal(true)} disabled={exporting} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#5b45ff] hover:bg-[#4a36ff] rounded-xl transition shadow-lg shadow-[#5b45ff]/20">
            <Eye size={16} /> Preview & Download
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden bg-[#f8fafc]">
        
        {/* ----- LEFT SIDE: WIZARD FORMS (WIDTH FIXED) ----- */}
        <div className="w-full lg:w-[50%] h-full flex flex-col bg-white shadow-[10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10">
          
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
             {steps.map((step, index) => (
                <div 
                  key={index} 
                  onClick={() => { handleSave(false); setActiveStep(index); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer whitespace-nowrap transition-all ${activeStep === index ? 'bg-white shadow-sm border border-slate-200 text-[#5b45ff]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                >
                   <span className={activeStep === index ? 'text-[#5b45ff]' : ''}>{step.icon}</span>
                   <span className={`text-xs font-bold ${activeStep === index ? '' : 'hidden xl:block'}`}>{step.title}</span>
                </div>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-xl mx-auto">
              {renderStepContent()}
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-white flex justify-between items-center shrink-0">
             <button 
                onClick={handlePrevStep} 
                disabled={activeStep === 0} 
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
             >
                <ChevronLeft size={16} /> Back
             </button>
             
             <div className="flex items-center gap-3">
               <button 
                  onClick={handleSaveAndExit}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#5b45ff] bg-[#5b45ff]/10 hover:bg-[#5b45ff]/20 border border-[#5b45ff]/20 rounded-xl transition"
               >
                  <Save size={16} /> Save & Exit
               </button>
               
               <button 
                  onClick={handleNextStep} 
                  disabled={activeStep === steps.length - 1}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#5b45ff] hover:bg-[#4a36e0] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-[#5b45ff]/20"
               >
                  Next <ChevronRight size={16} />
               </button>
             </div>
          </div>
        </div>

        {/* ----- RIGHT SIDE: LIVE PREVIEW (WIDTH FIXED) ----- */}
        <div className="hidden lg:flex flex-1 items-start justify-center p-4 xl:p-8 bg-slate-100 overflow-y-auto custom-scrollbar relative">
          <div className="sticky top-4 xl:top-8 w-full flex justify-center">
            <div className="transform scale-[0.55] xl:scale-[0.7] 2xl:scale-[0.8] origin-top shadow-2xl transition-all duration-300 pointer-events-none">
              
              {selectedTemplate === "modern" && <ModernTemplate ref={resumeRef} data={resumeData} color={themeColor} />}
              {selectedTemplate === "creative" && <CreativeTemplate ref={resumeRef} data={resumeData} color={themeColor} />}
              {selectedTemplate === "executive" && <ExecutiveTemplate ref={resumeRef} data={resumeData} color={themeColor} />}
              
            </div>
          </div>
        </div>

      </main>

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        onSelectTemplate={(t) => setSelectedTemplate(t)}
        currentTemplate={selectedTemplate}
        onSelectColor={(c) => setThemeColor(c)}  
        currentColor={themeColor}
        isPremium={isPremium} // 🌟 Passed Subscription Status
        onUpgradeSuccess={checkSubscriptionStatus} // 🌟 Passed Refresh function
      />
    </div>
  );
};

export default Builder;