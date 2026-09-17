import React, { useRef } from 'react';
import { TemplateId } from '../../types/resume';
import { Button } from '../ui/Button';
import { pdfService } from '../../services/pdfService';
import { useAuth } from '../../context/AuthContext';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { Download, Trash2, Sparkles, Target, LayoutDashboard, FileText, Globe, User, Moon, Sun, Eye, LogOut, Briefcase, BookOpen, Terminal, Save, Copy } from 'lucide-react';
import { calculateAtsScore } from '../../utils/atsCalculator';

export type NavTab = 'landing' | 'dashboard' | 'resume' | 'targeted' | 'portfolio' | 'career' | 'jobs' | 'roadmap';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  saveStatus: 'saved' | 'saving' | 'idle';
  lastSavedTime: string | null;
  resumeData: any;
  onClear: () => void;
  onImportJson: (jsonStr: string) => void;
  onOpenIntegration: () => void;
  onOpenAtsChecker: () => void;
  onOpenAuthModal: () => void;
  onSaveDocument: () => void;
  onSaveDocumentAs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  selectedTemplate,
  onSelectTemplate,
  resumeData,
  onClear,
  onOpenIntegration,
  onOpenAtsChecker,
  onOpenAuthModal,
  onSaveDocument,
  onSaveDocumentAs
}) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const atsResult = calculateAtsScore(resumeData);
  const atsBadgeColor =
    atsResult.totalScore >= 85 ? 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10' :
    atsResult.totalScore >= 70 ? 'border-blue-500/40 text-blue-400 hover:bg-blue-500/10' :
    'border-amber-500/40 text-amber-400 hover:bg-amber-500/10';

  const handleDownloadPdf = () => {
    const fileName = `Resume_${(resumeData.personal.fullName || 'builder').replace(/\s+/g, '_')}.pdf`;
    pdfService.downloadPdf('resume-preview-document', fileName);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Title & Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <button
            onClick={() => onTabChange('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-100 flex items-center gap-2 tracking-tight">
                CAREERLENS AI
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full font-mono">
                  Platform
                </span>
              </h1>
            </div>
          </button>

          {/* Navigation Bar Tabs */}
          <nav className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>

            <button
              onClick={() => onTabChange('resume')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'resume' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={14} /> General Resume
            </button>

            <button
              onClick={() => onTabChange('targeted')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'targeted' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target size={14} /> Targeted Resume (XAI)
            </button>

            <button
              onClick={() => onTabChange('portfolio')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe size={14} /> Portfolio
            </button>

            <button
              onClick={() => onTabChange('career')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'career' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles size={14} /> Career AI
            </button>

            <button
              onClick={() => onTabChange('jobs')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'jobs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase size={14} /> Jobs
            </button>

            <button
              onClick={() => onTabChange('roadmap')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeTab === 'roadmap' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={14} /> Skill Gap
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          
          {/* Theme Selector (Dark / Light / Eye Protection) */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTheme('dark')}
              title="Dark Mode"
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon size={14} />
            </button>
            <button
              onClick={() => setTheme('light')}
              title="Light Mode"
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'light' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme('eye-protection')}
              title="Eye Protection Mode (Warm Care)"
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'eye-protection' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye size={14} />
            </button>
          </div>

          {/* User Auth Profile Badge */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <User size={14} className="text-cyan-400" />
              )}
              <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>
            {user && (
              <button
                onClick={logout}
                title="Sign Out to Google Login Screen"
                className="p-2 bg-slate-950 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-xl transition-colors text-xs"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>

          {/* Integration Console Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenIntegration}
            className="border-purple-500/40 text-purple-400 hover:bg-purple-500/10 font-bold"
            icon={<Terminal size={14} />}
            title="Open Teammate Integration & Payload Console"
          >
            Payloads
          </Button>

          {/* ATS Score Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenAtsChecker}
            className={`${atsBadgeColor} font-bold`}
            icon={<Target size={14} />}
          >
            ATS Score: {atsResult.totalScore}%
          </Button>

          {(activeTab === 'resume' || activeTab === 'portfolio') && (
            <>
              <Button
                size="sm"
                variant="secondary"
                onClick={onSaveDocumentAs}
                title="Save the current document with a new name"
                icon={<Copy size={14} />}
              >
                Save As
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={onSaveDocument}
                title="Save the current document to Firebase"
                icon={<Save size={14} />}
              >
                Save
              </Button>
            </>
          )}

          {/* Clear */}
          <Button
            size="sm"
            variant="danger"
            onClick={onClear}
            title="Clear Form Fields"
            icon={<Trash2 size={14} />}
          >
            Clear
          </Button>

          {/* Primary Download PDF */}
          <Button
            size="sm"
            variant="primary"
            onClick={handleDownloadPdf}
            icon={<Download size={14} />}
          >
            Download PDF
          </Button>
        </div>

      </div>
    </header>
  );
};
