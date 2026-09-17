import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, LogOut, AlertCircle, Flame } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    user,
    signInWithGooglePopup,
    signInWithGithubPopup,
    signInWithMicrosoftPopup,
    loginWithEmailPassword,
    signupWithEmailPassword,
    logout,
    authError,
    clearAuthError
  } = useAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    clearAuthError();

    if (password.length < 6) {
      setIsSubmitting(false);
      return;
    }

    if (isSignUpMode) {
      const ok = await signupWithEmailPassword(email, password, name || 'User');
      if (ok) onClose();
    } else {
      const ok = await loginWithEmailPassword(email, password);
      if (ok) onClose();
    }
    setIsSubmitting(false);
  };

  const handleGoogleClick = async () => {
    setIsSubmitting(true);
    clearAuthError();
    const ok = await signInWithGooglePopup();
    setIsSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Flame size={18} />
            </span>
            <h2 className="text-xl font-bold text-white">
              {user ? 'Account & Firebase Security' : isSignUpMode ? 'Create Firebase Account' : 'Sign In'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {authError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-400" />
            <span>{authError}</span>
          </div>
        )}

        {/* Authenticated State */}
        {user ? (
          <div className="space-y-6">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold font-mono">
                  {user.name[0]}
                </div>
              )}
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {user.name}
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono">Firebase</span>
                </h3>
                <p className="text-xs text-slate-400">{user.email}</p>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck size={12} /> Firebase Auth Session Active
                </span>
              </div>
            </div>

            <button
              onClick={async () => { await logout(); onClose(); }}
              className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="space-y-4">
            <div className="space-y-2.5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleGoogleClick}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Continue with Google / Gmail</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    clearAuthError();
                    const ok = await signInWithGithubPopup();
                    setIsSubmitting(false);
                    if (ok) onClose();
                  }}
                  className="py-2 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    clearAuthError();
                    const ok = await signInWithMicrosoftPopup();
                    setIsSubmitting(false);
                    if (ok) onClose();
                  }}
                  className="py-2 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                  </svg>
                  <span>Microsoft</span>
                </button>
              </div>
            </div>

            <div className="flex items-center my-3 gap-3">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider whitespace-nowrap">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isSignUpMode && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex.developer@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
              >
                {isSignUpMode ? 'Create Firebase Account' : 'Sign In'}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(!isSignUpMode)}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  {isSignUpMode ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
