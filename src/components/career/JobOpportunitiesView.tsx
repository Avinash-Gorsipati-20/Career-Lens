import React from 'react';
import {ExternalLink, Briefcase, ShieldCheck} from 'lucide-react';
import {COMPANY_SOURCES} from '../../services/jobService';

export const JobOpportunitiesView: React.FC = () => (
  <div className="space-y-6 animate-fadeIn text-slate-100 font-sans pb-12">
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
      <div className="space-y-1">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-full inline-flex items-center gap-1.5 font-mono">
          <ShieldCheck size={14} /> Official Career Pages
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Company Job Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Open the official career page for each company to search current vacancies and apply directly.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {COMPANY_SOURCES.map(company => (
        <div key={company.id} className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 space-y-4 shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-amber-400" />
            <h2 className="text-lg font-bold text-white">{company.company}</h2>
          </div>
          <p className="text-xs text-slate-400">Official company career page. Live vacancies are maintained by the company.</p>
          <a
            href={company.officialCareerUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Open official careers</span>
            <ExternalLink size={14} />
          </a>
        </div>
      ))}
    </div>
  </div>
);
