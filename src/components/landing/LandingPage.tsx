import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, FileText, Target, Globe, ArrowRight, ShieldCheck, CheckCircle2, Zap, Upload, Layers, Award, BookOpen, ChevronRight, Lock, Code } from 'lucide-react';

interface LandingPageProps {
  onStartBuilding: () => void;
  onExploreCareer: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilding, onExploreCareer }) => {
  const { user, loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20">
              <Sparkles size={22} />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                CAREERLENS AI
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                  Platform
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={onStartBuilding}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2"
              >
                Go to Dashboard <ArrowRight size={15} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => loginWithGoogle()}
                  className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => loginWithGoogle()}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
          <Sparkles size={14} /> Your AI-Powered Career Lens
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Build Your Resume. Showcase Skills.<br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Discover Your Right Career Path.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          CareerLens AI is an end-to-end AI career development platform. Create a single-source-of-truth profile, generate A4 resumes, create targeted role resumes with Explainable AI, publish 15+ template portfolios, and follow personalized learning roadmaps.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartBuilding}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <FileText size={18} /> Build My Resume
          </button>

          <button
            onClick={onExploreCareer}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold rounded-2xl text-sm transition-all flex items-center gap-2 shadow-lg"
          >
            <Target size={18} className="text-cyan-400" /> Explore My Career AI
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400 border-t border-slate-800/80 max-w-4xl mx-auto">
          <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Single Source of Truth</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-400" /> Explainable AI (XAI)</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-cyan-400" /> 14 A4 Resume Templates</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-purple-400" /> 15 Templates x 20 Themes Portfolio</span>
        </div>
      </section>

      {/* Core Product Philosophy: BUILD -> SHOWCASE -> ANALYZE -> IMPROVE -> GROW */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">// CORE WORKFLOW CYCLE</span>
            <h2 className="text-3xl font-extrabold text-white">How CareerLens AI Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl mx-auto flex items-center justify-center font-bold">1</div>
              <h3 className="text-base font-bold text-white">BUILD</h3>
              <p className="text-xs text-slate-400">Create your master profile & A4 general resumes.</p>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl mx-auto flex items-center justify-center font-bold">2</div>
              <h3 className="text-base font-bold text-white">SHOWCASE</h3>
              <p className="text-xs text-slate-400">Publish rich developer portfolios with 15 templates & 20 themes.</p>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-xl mx-auto flex items-center justify-center font-bold">3</div>
              <h3 className="text-base font-bold text-white">ANALYZE</h3>
              <p className="text-xs text-slate-400">Target role XAI analysis & transparent match scoring.</p>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl mx-auto flex items-center justify-center font-bold">4</div>
              <h3 className="text-base font-bold text-white">IMPROVE</h3>
              <p className="text-xs text-slate-400">Identify skill gaps and accept/reject targeted suggestions.</p>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl mx-auto flex items-center justify-center font-bold">5</div>
              <h3 className="text-base font-bold text-white">GROW</h3>
              <p className="text-xs text-slate-400">Personalized learning roadmaps & verified job applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16 relative z-10">
        
        {/* Module 1: Targeted Resumes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono rounded-full">
              Major Innovation
            </span>
            <h2 className="text-3xl font-extrabold text-white">Targeted Resume Engine with Explainable AI</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't send generic resumes for specialized positions. Select your target role (e.g. Java Developer, Full Stack, Machine Learning) or paste a Job Description. CareerLens AI explains <strong>What Changed</strong>, <strong>Why</strong>, and <strong>Supporting Evidence</strong> so you stay in 100% control.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-400" /> Accept / Reject AI recommendations before applying</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-400" /> Master profile remains safe and untouched</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-400" /> True A4 paper print formatting (210mm x 297mm)</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white">Target Role: Java Developer</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">XAI Analysis</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <p><strong className="text-cyan-400">WHAT:</strong> Reordered projects to prioritize Java Banking System.</p>
              <p><strong className="text-purple-400">WHY:</strong> Target role emphasizes Java backend & microservices.</p>
              <p><strong className="text-emerald-400">EVIDENCE:</strong> Java & SQL experience found in profile.</p>
            </div>
          </div>
        </div>

        {/* Module 2: 15+ Templates x 20+ Themes Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white">15 Layouts × 20 Visual Themes</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Public Link</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <p className="font-mono text-cyan-400">https://careerlens.ai/u/alex-morgan</p>
              <p className="text-slate-400">Interactive case studies, GitHub links, live demos, and downloadable PDF.</p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded-full">
              Portfolio Engine
            </span>
            <h2 className="text-3xl font-extrabold text-white">300+ Portfolio Combinations</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Transform your central profile into rich developer portfolios. Switch between 15 structural templates (Developer, Terminal, Glassmorphism, Corporate, Timeline, Data Science) and 20 visual themes without breaking layout integrity.
            </p>
          </div>
        </div>

      </section>

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/60 border-t border-slate-800 py-16 px-6 text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Take Control of Your Career Path?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start building your central profile, creating targeted resumes, and discovering your personalized career roadmap today.
        </p>
        <button
          onClick={onStartBuilding}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
        >
          Launch CareerLens AI Platform <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-8 text-center text-xs text-slate-500 relative z-10 space-y-2">
        <p>© 2026 CAREERLENS AI • Production B.Tech Major Project • All Rights Reserved</p>
        <p className="text-[10px] text-slate-600">Your AI-Powered Career Lens • Single Source of Truth Career Ecosystem</p>
      </footer>

    </div>
  );
};
