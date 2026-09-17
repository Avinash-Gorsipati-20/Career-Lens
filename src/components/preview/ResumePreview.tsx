import React, { useState } from 'react';
import { ResumeData, TemplateId } from '../../types/resume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { AtsTemplate } from '../templates/AtsTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { ElegantTemplate } from '../templates/ElegantTemplate';
import { TechTemplate } from '../templates/TechTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { CompactTemplate } from '../templates/CompactTemplate';
import { SplitTemplate } from '../templates/SplitTemplate';
import { NordicTemplate } from '../templates/NordicTemplate';
import { GradientTemplate } from '../templates/GradientTemplate';
import { DeveloperMatrixTemplate } from '../templates/DeveloperMatrixTemplate';
import { SwissGridTemplate } from '../templates/SwissGridTemplate';
import { ZoomIn, ZoomOut, Maximize2, FileCheck } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId }) => {
  const [zoom, setZoom] = useState<number>(85);

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'ats':
        return <AtsTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'nordic':
        return <NordicTemplate data={data} />;
      case 'gradient':
        return <GradientTemplate data={data} />;
      case 'matrix':
        return <DeveloperMatrixTemplate data={data} />;
      case 'swiss':
        return <SwissGridTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'split':
        return <SplitTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Preview Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <FileCheck size={14} className="text-cyan-400" /> Standard A4 Paper Preview
          </span>
          <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            210mm × 297mm Ratio
          </span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setZoom(prev => Math.max(50, prev - 10))}
            className="text-slate-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[11px] font-mono text-slate-300 w-10 text-center">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom(prev => Math.min(130, prev + 10))}
            className="text-slate-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            onClick={() => setZoom(85)}
            className="text-slate-400 hover:text-white transition-colors ml-1"
            title="Reset Zoom"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Scaled Preview Canvas Wrapper strictly bound to standard A4 size */}
      <div className="flex-1 overflow-auto p-6 flex justify-center items-start bg-slate-950/90 scrollbar-thin">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="shrink-0 w-[210mm] min-h-[297mm] shadow-2xl bg-white rounded-xs border border-slate-300"
        >
          <div id="resume-preview-document" className="relative w-[210mm] min-h-[297mm] transition-all duration-200">
            {renderTemplate()}
            {data.leadershipActivities?.length > 0 && (
              <section className="bg-white text-slate-800 p-8 text-[12px] leading-normal print:p-0">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1 mb-3">
                  Leadership &amp; Activities
                </h2>
                <div className="space-y-2">
                  {data.leadershipActivities.map(activity => (
                    <div key={activity.id}>
                      <div className="flex justify-between gap-4">
                        <h3 className="font-semibold text-slate-900">{activity.title}</h3>
                        {activity.date && <span className="text-[10px] text-slate-500">{activity.date}</span>}
                      </div>
                      {activity.description && <p className="text-[11px] text-slate-600 leading-relaxed">{activity.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
