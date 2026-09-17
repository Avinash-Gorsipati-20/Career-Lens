import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  value,
  ...props
}) => {
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <span className="text-[10px] text-slate-500 font-mono">
          {charCount} chars
        </span>
      </div>
      <textarea
        id={inputId}
        value={value}
        className={`w-full bg-slate-900/80 border text-slate-100 placeholder-slate-500 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 px-3.5 py-2.5 min-h-[90px] ${
          error ? 'border-red-500/80 focus:border-red-500' : 'border-slate-700/80 hover:border-slate-600 focus:border-blue-500'
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <span className="text-[11px] text-slate-400 font-normal">
          💡 {helperText}
        </span>
      )}
      {error && (
        <span className="text-xs text-red-400 font-medium flex items-center gap-1 mt-0.5">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
};
