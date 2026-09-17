import React from 'react';
import { TemplateId } from '../../types/resume';
import { RESUME_TEMPLATES } from '../../services/templateService';
import { LayoutTemplate, Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <LayoutTemplate size={16} className="text-blue-400" />
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Select Resume Template ({RESUME_TEMPLATES.length} Available)
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {RESUME_TEMPLATES.map(t => {
          const isSelected = selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTemplate(t.id)}
              className={`group relative text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-slate-100 group-hover:text-blue-400 transition-colors">
                    {t.name}
                  </span>
                  {isSelected && (
                    <span className="p-0.5 bg-blue-500 text-white rounded-full">
                      <Check size={10} />
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                  {t.description}
                </p>
              </div>

              {t.badge && (
                <div className="mt-2.5">
                  <span className="px-1.5 py-0.5 bg-slate-800 text-[9px] font-semibold text-slate-300 rounded border border-slate-700">
                    {t.badge}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
