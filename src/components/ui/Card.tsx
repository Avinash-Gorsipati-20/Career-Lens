import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  icon,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-sm ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            {icon && <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg text-lg">{icon}</span>}
            <div>
              {title && <h3 className="text-base font-semibold text-slate-100">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
