import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// Helper: Format "YYYY-MM-DD" or "YYYY-MM" to readable format (e.g., "Aug 15, 2024" or "Aug 2024")
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Check for exact date format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  // Check for month/year format: YYYY-MM
  if (/^\d{4}-\d{2}$/.test(dateString)) {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  return dateString;
};

// Helper component for 5-box skill rating
const SkillBoxes = ({ progress, color }) => {
  // Convert percentage (e.g., 80) or raw 1-5 rating into a 1-5 scale
  const level = progress <= 5 ? progress : Math.round(progress / 20) || 3;
  return (
    <div className="flex gap-1 mt-1.5">
      {[1, 2, 3, 4, 5].map((val) => (
        <div 
          key={val} 
          className="w-2.5 h-2.5 rounded-[2px]" 
          style={{ backgroundColor: val <= level ? color : `${color}40` }} 
        />
      ))}
    </div>
  );
};

/**
 * 1. MODERN PROFESSIONAL TEMPLATE (COMPACT & PAGE-BREAK SAFE)
 */
export const ModernTemplate = React.forwardRef(({ data, color = '#5b45ff' }, ref) => {
  const { profileInfo, contactInfo, workExperiences, education, skills, projects, certifications, languages, interests } = data;

  return (
    <div ref={ref} className="bg-white p-[12mm] px-[15mm] w-[210mm] min-h-[297mm] h-auto text-slate-800 shadow-sm font-sans relative box-border">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: color }}></div>

      {/* Header Section - Compact */}
      <div className="flex flex-col justify-center items-center text-center border-b-2 border-slate-200 pb-4 mb-5 mt-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1 leading-none break-words max-w-full">
          {profileInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest mb-3 break-words max-w-full" style={{ color: color }}>
          {profileInfo?.designation || "Job Designation"}
        </p>
        
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-semibold text-slate-600">
          {contactInfo?.email && <span className="flex items-center gap-1.5 break-words"><Mail size={12} style={{ color: color }}/> {contactInfo.email}</span>}
          {contactInfo?.phone && <span className="flex items-center gap-1.5 break-words"><Phone size={12} style={{ color: color }}/> {contactInfo.phone}</span>}
          {contactInfo?.location && <span className="flex items-center gap-1.5 break-words"><MapPin size={12} style={{ color: color }}/> {contactInfo.location}</span>}
          {contactInfo?.linkedIn && <span className="flex items-center gap-1.5 break-words"><Linkedin size={12} style={{ color: color }}/> {contactInfo.linkedIn}</span>}
          {contactInfo?.github && <span className="flex items-center gap-1.5 break-words"><Github size={12} style={{ color: color }}/> {contactInfo.github}</span>}
          {contactInfo?.website && <span className="flex items-center gap-1.5 break-words"><Globe size={12} style={{ color: color }}/> {contactInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {profileInfo?.summary && (
        <div className="mb-5" style={{ breakInside: 'avoid' }}>
          <p className="text-[11.5px] text-slate-700 leading-relaxed font-medium text-justify break-words">{profileInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperiences?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Work Experience
          </h3>
          <div className="space-y-4">
            {workExperiences.map((exp, i) => (
              <div key={i} className="group" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline mb-0.5 gap-4">
                  <h4 className="font-bold text-slate-900 text-[13px] flex-1 min-w-0 break-words">{exp.role}</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 whitespace-nowrap" style={{ color: color, backgroundColor: `${color}1A` }}>
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate) || 'Present'}
                  </span>
                </div>
                <p className="text-[11.5px] font-semibold text-slate-600 mb-1 break-words">{exp.company}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed break-words">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Projects
          </h3>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={i} style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline mb-0.5 gap-4">
                  <h4 className="font-bold text-slate-900 text-[12.5px] flex-1 min-w-0 break-words">{proj.projectTitle}</h4>
                  <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider shrink-0" style={{ color: color }}>
                    {proj.liveDemo && <span>Live Demo</span>}
                    {proj.github && <span>GitHub</span>}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed break-words">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout for Education, Skills & Rest */}
      <div className="grid grid-cols-12 gap-8 pt-2">
        <div className="col-span-7 space-y-5">
          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Education
              </h3>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} style={{ breakInside: 'avoid' }} className="w-full">
                    <div className="flex justify-between items-baseline gap-3">
                      <h4 className="font-bold text-slate-900 text-[12px] flex-1 min-w-0 break-words">{edu.degree}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase shrink-0 whitespace-nowrap">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-0.5 gap-3">
                      <p className="text-[11px] text-slate-600 font-medium flex-1 min-w-0 break-words">{edu.institution}</p>
                      {edu.Marks && <p className="text-[9px] font-bold shrink-0 whitespace-nowrap" style={{ color: color }}>Score: {edu.Marks}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (Wrapped efficiently with safe constraints) */}
          {certifications?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex justify-between items-start text-[10.5px] gap-4" style={{ breakInside: 'avoid' }}>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-slate-900 leading-snug break-words">{cert.title}</span>
                      {cert.issuer && <span className="text-slate-500 ml-1 break-words">({cert.issuer})</span>}
                    </div>
                    <span className="font-bold shrink-0 text-right whitespace-nowrap mt-0.5" style={{ color: color }}>{formatDate(cert.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 space-y-5">
          {/* Skills with Boxes - 2 COLUMNS GRID */}
          {skills?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Skills
              </h3>
              <div className="grid grid-cols-2 gap-y-3 justify-items-stretch">
                {skills.map((skill, i) => (
                  <div key={i} className="w-[47%] flex flex-col" style={{ breakInside: 'avoid' }}>
                    <span className="text-[10.5px] font-bold text-slate-800 block truncate pr-2" title={skill.name}>{skill.name}</span>
                    <SkillBoxes progress={skill.progress} color={color} />
                  </div>
                ))}
                {skills.length % 2 !== 0 && <div className="w-[47%]"></div>}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Languages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 break-words max-w-full" style={{ breakInside: 'avoid' }}>
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-px" style={{ backgroundColor: color }}></span> Interests
              </h3>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {interests.map((interest, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest break-words max-w-full" style={{ breakInside: 'avoid' }}>
                    {interest}{i < interests.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/**
 * 2. CREATIVE SPLIT TEMPLATE (Pro Version - Compact)
 */
export const CreativeTemplate = React.forwardRef(({ data, color = '#5b45ff' }, ref) => {
  const { profileInfo, contactInfo, workExperiences, education, skills, projects, certifications, languages, interests } = data;

  return (
    <div ref={ref} className="bg-white w-[210mm] min-h-[297mm] h-auto flex text-slate-800 shadow-sm overflow-hidden font-sans box-border">
      {/* Sidebar (Dark) */}
      <div className="w-[30%] bg-slate-900 text-white p-6 flex flex-col gap-6 shrink-0">
        <div className="mb-2">
          <div className="w-12 h-1 mb-4" style={{ backgroundColor: color }}></div>
          <h1 className="text-2xl font-black uppercase leading-tight tracking-tighter break-words">
            {profileInfo?.fullName?.split(' ')[0]} <br/> 
            <span className="text-slate-400">{profileInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed break-words" style={{ color: color }}>
            {profileInfo?.designation}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-1.5">Contact</h3>
          <div className="space-y-2.5">
            {contactInfo?.email && <div className="flex items-center gap-2.5"><Mail size={10} style={{ color: color }} className="shrink-0"/><p className="text-[9px] font-medium opacity-80 break-words min-w-0">{contactInfo.email}</p></div>}
            {contactInfo?.phone && <div className="flex items-center gap-2.5"><Phone size={10} style={{ color: color }} className="shrink-0"/><p className="text-[9px] font-medium opacity-80 break-words min-w-0">{contactInfo.phone}</p></div>}
            {contactInfo?.location && <div className="flex items-center gap-2.5"><MapPin size={10} style={{ color: color }} className="shrink-0"/><p className="text-[9px] font-medium opacity-80 break-words min-w-0">{contactInfo.location}</p></div>}
            {contactInfo?.linkedIn && <div className="flex items-center gap-2.5"><Linkedin size={10} style={{ color: color }} className="shrink-0"/><p className="text-[9px] font-medium opacity-80 break-words min-w-0">{contactInfo.linkedIn}</p></div>}
          </div>
        </div>

        {/* Skills with Boxes */}
        {skills?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-1.5">Core Skills</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 justify-items-stretch">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col w-[47%]" style={{ breakInside: 'avoid' }}>
                  <span className="text-[8.5px] font-black uppercase tracking-widest block mb-1 truncate pr-1" title={skill.name}>{skill.name}</span>
                  <SkillBoxes progress={skill.progress} color={color} />
                </div>
              ))}
              {skills.length % 2 !== 0 && <div className="w-[47%]"></div>}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-1.5">Languages</h3>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang, i) => (
                <span key={i} className="text-[9px] font-medium opacity-90 bg-slate-800 px-1.5 py-0.5 rounded break-words max-w-full" style={{ breakInside: 'avoid' }}>
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {interests?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-1.5">Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((int, i) => (
                <span key={i} className="text-[8.5px] font-bold uppercase tracking-widest break-words max-w-full" style={{ color: color, breakInside: 'avoid' }}>
                  {int}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Light) */}
      <div className="flex-1 p-8 bg-white space-y-6">
        {profileInfo?.summary && (
          <section style={{ breakInside: 'avoid' }}>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: color }}>About Me</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium italic break-words">"{profileInfo.summary}"</p>
          </section>
        )}

        {workExperiences?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: color }}>Work Experience</h3>
            {workExperiences.map((exp, i) => (
              <div key={i} className="space-y-1 border-l-2 border-slate-100 pl-3 relative" style={{ breakInside: 'avoid' }}>
                <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1 border-2 border-white" style={{ backgroundColor: color }}></div>
                <div className="flex justify-between items-baseline gap-3">
                  <h4 className="font-black text-slate-900 text-[12px] uppercase tracking-tight flex-1 min-w-0 break-words">{exp.role}</h4>
                  <span className="text-[8.5px] font-black text-slate-400 uppercase shrink-0 whitespace-nowrap">{formatDate(exp.startDate)} — {formatDate(exp.endDate) || 'Present'}</span>
                </div>
                <p className="text-[9.5px] font-black uppercase tracking-wider break-words" style={{ color: color }}>{exp.company}</p>
                <p className="text-[10.5px] text-slate-600 leading-relaxed break-words">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {projects?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: color }}>Key Projects</h3>
            {projects.map((proj, i) => (
              <div key={i} className="space-y-1" style={{ breakInside: 'avoid' }}>
                <h4 className="font-black text-slate-900 text-[11.5px] uppercase break-words">{proj.projectTitle}</h4>
                <p className="text-[10.5px] text-slate-600 leading-relaxed break-words">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: color }}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="w-full border-b border-slate-50 pb-2" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline gap-3">
                  <h4 className="font-black text-slate-900 text-[11.5px] uppercase flex-1 min-w-0 break-words">{edu.degree}</h4>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase shrink-0 whitespace-nowrap">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                </div>
                <div className="flex justify-between items-center mt-0.5 gap-3">
                  <p className="text-[9.5px] text-slate-500 font-bold flex-1 min-w-0 break-words">{edu.institution}</p>
                  {edu.Marks && <p className="text-[8.5px] font-bold mt-1 shrink-0 whitespace-nowrap" style={{ color: color }}>Score: {edu.Marks}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications?.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: color }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-start text-[10px] gap-3" style={{ breakInside: 'avoid' }}>
                <p className="font-bold text-slate-900 flex-1 min-w-0 break-words">
                  {cert.title} {cert.issuer && <span className="font-normal text-slate-500">({cert.issuer})</span>}
                </p>
                <p className="font-bold text-slate-400 shrink-0 whitespace-nowrap mt-0.5">{formatDate(cert.date)}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
});

/**
 * 3. EXECUTIVE TEMPLATE (NEW - Compact)
 */
export const ExecutiveTemplate = React.forwardRef(({ data, color = '#0f172a' }, ref) => {
  const { profileInfo, contactInfo, workExperiences, education, skills, projects, certifications, languages, interests } = data;

  return (
    <div ref={ref} className="bg-white p-[15mm] w-[210mm] min-h-[297mm] h-auto text-slate-900 shadow-sm font-serif box-border">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900 mb-1.5 break-words max-w-full" style={{ color: color }}>
          {profileInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-[13px] text-slate-600 uppercase tracking-widest mb-2.5 break-words max-w-full">
          {profileInfo?.designation || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-slate-700">
          {contactInfo?.email && <span className="break-words">{contactInfo.email}</span>}
          {contactInfo?.phone && <span className="text-slate-300">|</span>}
          {contactInfo?.phone && <span className="break-words">{contactInfo.phone}</span>}
          {contactInfo?.location && <span className="text-slate-300">|</span>}
          {contactInfo?.location && <span className="break-words">{contactInfo.location}</span>}
          {contactInfo?.linkedIn && <span className="text-slate-300">|</span>}
          {contactInfo?.linkedIn && <span className="break-words">{contactInfo.linkedIn}</span>}
        </div>
      </div>

      <div className="w-full h-0.5 mb-5" style={{ backgroundColor: color }}></div>

      {/* Summary */}
      {profileInfo?.summary && (
        <div className="mb-5" style={{ breakInside: 'avoid' }}>
          <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1.5" style={{ color: color }}>Professional Summary</h3>
          <p className="text-[11.5px] text-slate-700 leading-relaxed text-justify break-words">
            {profileInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {workExperiences?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Professional Experience</h3>
          <div className="space-y-3 mt-3">
            {workExperiences.map((exp, i) => (
              <div key={i} style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-end mb-0.5 gap-3">
                  <h4 className="font-bold text-slate-900 text-[13px] flex-1 min-w-0 break-words">{exp.company}</h4>
                  <span className="text-[10px] text-slate-600 italic shrink-0 whitespace-nowrap">{formatDate(exp.startDate)} — {formatDate(exp.endDate) || 'Present'}</span>
                </div>
                <p className="text-[11.5px] font-medium text-slate-800 italic mb-1 break-words">{exp.role}</p>
                <p className="text-[11px] text-slate-700 leading-relaxed break-words">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Notable Projects</h3>
          <div className="space-y-2 mt-3">
            {projects.map((proj, i) => (
              <div key={i} style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-end mb-0.5">
                  <h4 className="font-bold text-slate-900 text-[12px] break-words">{proj.projectTitle}</h4>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed break-words">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Education</h3>
          <div className="space-y-2 mt-3">
            {education.map((edu, i) => (
              <div key={i} className="w-full" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-[12px] break-words">{edu.institution}</h4>
                    <p className="text-[11px] text-slate-700 italic break-words">{edu.degree}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-600 block whitespace-nowrap">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span>
                    {edu.Marks && <span className="text-[9.5px] font-bold text-slate-500 block mt-0.5 whitespace-nowrap">Marks: {edu.Marks}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Info (Skills, Certs, Languages) */}
      <div className="mb-5 space-y-4">
        {/* SKILLS - EXACTLY 4 COLUMNS */}
        {skills?.length > 0 && (
          <div style={{ breakInside: 'avoid' }}>
            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Skills & Expertise</h3>
            <div className="mt-3 flex flex-wrap justify-between gap-y-3">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col w-[23%]" style={{ breakInside: 'avoid' }}>
                  <span className="text-[11px] font-bold text-slate-800 truncate mb-0.5" title={skill.name}>{skill.name}</span>
                  <SkillBoxes progress={skill.progress} color={color} />
                </div>
              ))}
              {skills.length % 4 !== 0 && Array.from({ length: 4 - (skills.length % 4) }).map((_, i) => (
                <div key={`ghost-${i}`} className="w-[23%]"></div>
              ))}
            </div>
          </div>
        )}
        
        {certifications?.length > 0 && (
          <div style={{ breakInside: 'avoid' }}>
            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Certifications</h3>
            <div className="mt-2 text-[11px] text-slate-700 leading-relaxed space-y-1">
              {certifications.map((cert, i) => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-900 break-words">{cert.title}</span>
                    {cert.issuer && <span className="break-words">, {cert.issuer}</span>}
                  </div>
                  <span className="italic shrink-0 text-right whitespace-nowrap mt-0.5">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8" style={{ breakInside: 'avoid' }}>
          {languages?.length > 0 && (
            <div className="flex-1 min-w-0">
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Languages</h3>
              <div className="mt-1.5 text-[11px] text-slate-700 leading-relaxed break-words">
                {languages.map((lang, i) => (<span key={i}>{lang.name}{i < languages.length - 1 ? ", " : ""}</span>))}
              </div>
            </div>
          )}
          {interests?.length > 0 && (
            <div className="flex-1 min-w-0">
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-1 border-b pb-1" style={{ color: color, borderColor: `${color}40` }}>Interests</h3>
              <div className="mt-1.5 text-[11px] text-slate-700 leading-relaxed break-words">
                {interests.map((int, i) => (<span key={i}>{int}{i < interests.length - 1 ? ", " : ""}</span>))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});