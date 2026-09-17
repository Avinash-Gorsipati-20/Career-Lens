import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-slate-900/80 border text-slate-100 placeholder-slate-500 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
            icon ? 'pl-10 pr-3 py-2.5' : 'px-3.5 py-2.5'
          } ${error ? 'border-red-500/80 focus:border-red-500' : 'border-slate-700/80 hover:border-slate-600 focus:border-blue-500'} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 font-medium flex items-center gap-1 mt-0.5">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
};
