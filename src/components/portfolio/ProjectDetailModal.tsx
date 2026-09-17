import React from 'react';
import { Project } from '../../types/resume';
import { X, ExternalLink, Github, Layers, Target, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Project Case Study
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">{project.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Layers size={16} className="text-blue-400" /> Project Overview
          </h3>
          <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 text-blue-300 text-xs rounded-md font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Rich Storytelling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.problemStatement && (
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-amber-400 uppercase flex items-center gap-1.5">
                <Target size={14} /> The Problem
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{project.problemStatement}</p>
            </div>
          )}

          {project.solution && (
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Architectural Solution
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          )}

          {project.challenges && (
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-rose-400 uppercase flex items-center gap-1.5">
                <AlertCircle size={14} /> Technical Challenges
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {project.results && (
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-purple-400 uppercase flex items-center gap-1.5">
                <Award size={14} /> Key Results & Impact
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{project.results}</p>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Github size={16} /> View Code on GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <ExternalLink size={16} /> Launch Live Application
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
