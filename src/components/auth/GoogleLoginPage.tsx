import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Mail,
  KeyRound,
  AlertCircle,
  Flame,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Info
} from 'lucide-react';

export const GoogleLoginPage: React.FC = () => {
  const {
    signInWithGooglePopup,
    signInWithGithubPopup,
    signInWithMicrosoftPopup,
    loginWithEmailPassword,
    signupWithEmailPassword,
    authError,
    clearAuthError
  } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Trigger Firebase Google Popup Authentication
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setStatusMessage('Connecting to Google Account...');
    clearAuthError();
    const success = await signInWithGooglePopup();
    if (!success) {
      setIsAuthenticating(false);
      setStatusMessage(null);
    }
  };

  // Trigger Firebase GitHub Popup Authentication
  const handleGithubSignIn = async () => {
    setIsAuthenticating(true);
    setStatusMessage('Connecting to GitHub...');
    clearAuthError();
    const success = await signInWithGithubPopup();
    if (!success) {
      setIsAuthenticating(false);
      setStatusMessage(null);
    }
  };

  // Trigger Firebase Microsoft Popup Authentication
  const handleMicrosoftSignIn = async () => {
    setIsAuthenticating(true);
    setStatusMessage('Connecting to Microsoft...');
    clearAuthError();
    const success = await signInWithMicrosoftPopup();
    if (!success) {
      setIsAuthenticating(false);
      setStatusMessage(null);
    }
  };

  // Handle Email & Password Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsAuthenticating(true);
    setStatusMessage(isSignUp ? 'Creating your account...' : 'Signing in...');
    clearAuthError();

    if (isSignUp) {
      const ok = await signupWithEmailPassword(
        email,
        password,
        fullName.trim() || email.split('@')[0]
      );
      if (!ok) {
        setIsAuthenticating(false);
        setStatusMessage(null);
      }
    } else {
      const ok = await loginWithEmailPassword(email, password);
      if (!ok) {
        setIsAuthenticating(false);
        setStatusMessage(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Background Glowing Spheres */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Brand Header */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              CareerLens AI
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1">
                <Flame size={12} className="text-amber-400" /> Firebase Auth Active
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="hidden sm:inline">Firebase OAuth 2.0 Security</span>
        </div>
      </header>

      {/* Hero Body Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* Left Side Value Props */}
        <div className="space-y-6 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
            <Lock size={14} /> Firebase Security
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Build AI Resumes & Portfolios with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Firebase Auth</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your career documents, ATS ratings, and personalized skill roadmaps are encrypted and stored safely. Sign in with Google, email & password, or your connected developer accounts.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Firebase Identity Verified</span>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
              <span>100% Data Privacy Guarantee</span>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
              <span>14 A4 Resume Templates</span>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
              <span>Real-Time ATS Parser Engine</span>
            </div>
          </div>
        </div>

        {/* Right Side Auth Card */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-2xl space-y-5 backdrop-blur-xl relative">
          
          {/* Sign In / Sign Up Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); clearAuthError(); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isSignUp ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); clearAuthError(); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isSignUp ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-200 leading-snug">{authError}</p>
              </div>
            </div>
          )}

          {isAuthenticating ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              <p className="text-sm font-bold text-white">{statusMessage || 'Authenticating with Firebase...'}</p>
              <p className="text-xs text-slate-400">Verifying security token & credentials</p>
            </div>
          ) : (
            <>
              {/* Social Login Options */}
              <div className="space-y-2.5">
                
                {/* Google / Gmail Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2.5 shadow-lg transition-all transform active:scale-[0.99]"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Continue with Google / Gmail</span>
                </button>

                {/* Secondary Providers: GitHub and Microsoft */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* GitHub Button */}
                  <button
                    type="button"
                    onClick={handleGithubSignIn}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all group"
                  >
                    <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </button>

                  {/* Microsoft Button */}
                  <button
                    type="button"
                    onClick={handleMicrosoftSignIn}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all group"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                    </svg>
                    <span>Microsoft</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center my-3 gap-3">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider whitespace-nowrap">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                {isSignUp && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-2.5 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-300">Password</label>
                  </div>
                  <div className="relative">
                    <KeyRound size={14} className="absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-9 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  <span>{isSignUp ? 'Create Account' : 'Sign In with Email'}</span>
                  <ArrowRight size={13} />
                </button>
              </form>

              {/* Bottom toggle between Sign In and Sign Up */}
              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(!isSignUp); clearAuthError(); }}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    {isSignUp ? 'Sign In' : 'Create an Account'}
                  </button>
                </p>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1 text-[10px] text-slate-500">
            <Info size={11} className="text-slate-500 shrink-0" />
            <span>Protected by Firebase Authentication</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 text-center text-xs text-slate-500 relative z-10">
        © 2026 CareerLens AI • Powered by Google Firebase Security
      </footer>

    </div>
  );
};
