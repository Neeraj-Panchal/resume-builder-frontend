import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Palette, Sparkles, Lock } from 'lucide-react';

const ThemeModal = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  currentTemplate, 
  onSelectColor,     // NAYA PROP
  currentColor       // NAYA PROP
}) => {
  const [activeTab, setActiveTab] = useState('Templates');

  if (!isOpen) return null;

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, sleek layout with smart spacing and accents.',
      badge: 'Popular',
      previewType: 'modern'
    },
    {
      id: 'creative',
      name: 'Creative Split',
      description: 'Visual sidebar layout for modern designers & devs.',
      badge: 'Pro',
      previewType: 'creative'
    },
    {
      id: 'executive',
      name: 'Executive Classic',
      description: 'Elegant, serif-based design optimized for ATS systems.',
      badge: 'New',
      previewType: 'executive'
    }
  ];

  // NAYA: Color Palettes Array
  const colorPalettes = [
    { id: 'purple', hex: '#5b45ff', name: 'Primary Purple' },
    { id: 'blue', hex: '#2563eb', name: 'Ocean Blue' },
    { id: 'emerald', hex: '#059669', name: 'Emerald Green' },
    { id: 'rose', hex: '#e11d48', name: 'Rose Red' },
    { id: 'amber', hex: '#d97706', name: 'Amber Glow' },
    { id: 'slate', hex: '#334155', name: 'Classic Slate' },
    { id: 'teal', hex: '#0d9488', name: 'Teal Shadow' },
    { id: 'fuchsia', hex: '#c026d3', name: 'Vibrant Fuchsia' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Design Settings</h2>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['Templates', 'Colors', 'Fonts'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#5b45ff] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
            <X size={20} strokeWidth={2.5}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#fcfdfe] custom-scrollbar">
          
          {/* TEMPLATES TAB */}
          {activeTab === 'Templates' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  onClick={() => onSelectTemplate(template.id)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className={`relative aspect-[1/1.3] bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-lg ${currentTemplate === template.id ? 'border-[#5b45ff] ring-4 ring-[#5b45ff]/10' : 'border-slate-100 group-hover:border-[#5b45ff]/50 group-hover:shadow-xl'}`}>
                    
                    {/* Visual Previews Mockups (Tinted with current color if selected) */}
                    <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-2 overflow-hidden opacity-60">
                      {template.previewType === 'modern' && (
                        <div className="space-y-3">
                          <div className="h-2 w-full rounded-t-sm absolute top-0 left-0" style={{ backgroundColor: currentTemplate === template.id ? currentColor : '#5b45ff' }} />
                          <div className="h-6 w-1/2 bg-slate-300 rounded mt-4" />
                          <div className="h-2 w-1/3 rounded" style={{ backgroundColor: currentTemplate === template.id ? `${currentColor}80` : '#5b45ff80' }} />
                          <div className="h-1 w-full bg-slate-200 rounded mt-4" />
                          <div className="flex gap-4 mt-2">
                            <div className="w-1/2 space-y-2"><div className="h-2 w-full bg-slate-200 rounded"/><div className="h-2 w-3/4 bg-slate-200 rounded"/></div>
                            <div className="w-1/2 space-y-2"><div className="h-2 w-full bg-slate-200 rounded"/><div className="h-2 w-2/3 bg-slate-200 rounded"/></div>
                          </div>
                        </div>
                      )}
                      {template.previewType === 'creative' && (
                        <div className="flex h-full gap-2 -m-4">
                          <div className="w-1/3 h-full bg-slate-800 p-2 space-y-2"><div className="h-4 w-full rounded" style={{ backgroundColor: currentTemplate === template.id ? currentColor : '#5b45ff' }}/><div className="h-2 w-3/4 bg-slate-600 rounded mt-4"/></div>
                          <div className="flex-1 space-y-2 p-2 pt-4"><div className="h-2 w-3/4 bg-slate-300 rounded"/><div className="h-2 w-full bg-slate-200 rounded"/></div>
                        </div>
                      )}
                      {template.previewType === 'executive' && (
                        <div className="space-y-3 flex flex-col items-center pt-2">
                          <div className="h-4 w-2/3 bg-slate-800 rounded" style={{ backgroundColor: currentTemplate === template.id ? currentColor : '#334155' }} />
                          <div className="h-1.5 w-1/2 bg-slate-400 rounded" />
                          <div className="h-0.5 w-full bg-slate-800 mt-2" style={{ backgroundColor: currentTemplate === template.id ? currentColor : '#334155' }} />
                          <div className="w-full space-y-1.5 mt-2 text-left">
                            <div className="h-2 w-1/3 bg-slate-400 rounded" />
                            <div className="h-1.5 w-full bg-slate-200 rounded" />
                            <div className="h-1.5 w-full bg-slate-200 rounded" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selection Overlay */}
                    {currentTemplate === template.id && (
                      <div className="absolute inset-0 bg-[#5b45ff]/5 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2 shadow-lg scale-110">
                          <CheckCircle2 size={32} className="text-[#5b45ff]" />
                        </div>
                      </div>
                    )}

                    {/* Badge */}
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm text-slate-600">
                      {template.badge}
                    </span>
                  </div>

                  <div className="px-2">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#5b45ff] transition-colors">{template.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{template.description}</p>
                  </div>
                </div>
              ))}

              {/* Locked/Coming Soon Placeholder */}
              <div className="opacity-60 space-y-4 cursor-not-allowed group">
                <div className="aspect-[1/1.3] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden group-hover:bg-slate-100 transition">
                  <Lock size={28} className="text-slate-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-200 px-3 py-1 rounded-full">Coming Soon</span>
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-slate-500 text-sm flex items-center gap-1">Minimal Dark <Sparkles size={12}/></h4>
                  <p className="text-xs text-slate-400 mt-1 italic">Exclusive for premium users</p>
                </div>
              </div>

            </div>
          )}

          {/* NAYA: COLORS TAB */}
          {activeTab === 'Colors' && (
             <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <Palette size={40} className="mx-auto mb-4 text-[#5b45ff]" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Accent Colors</h3>
                  <p className="text-slate-500 text-sm">Choose a color that fits your professional brand.</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {colorPalettes.map((c) => (
                    <div key={c.id} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => onSelectColor(c.hex)}>
                      <div 
                        className={`w-16 h-16 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${currentColor === c.hex ? 'ring-4 ring-offset-4 scale-110' : 'hover:scale-105 hover:shadow-xl'}`}
                        style={{ backgroundColor: c.hex, '--tw-ring-color': c.hex }}
                      >
                        {currentColor === c.hex && <CheckCircle2 size={28} className="text-white drop-shadow-md" />}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${currentColor === c.hex ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
             </div>
          )}
          
          {activeTab === 'Fonts' && (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
                <p className="font-bold uppercase text-xs tracking-widest">Custom Fonts coming soon</p>
             </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex gap-4">
            <p className="text-xs text-slate-500 font-medium">Selected Template: <span className="font-bold text-slate-900 capitalize">{currentTemplate}</span></p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium border-l border-slate-300 pl-4">
              Color: <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentColor }}></div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-black transition shadow-lg shadow-slate-200 active:scale-95"
          >
            Done & Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeModal;