import React from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber' | 'purple' | 'slate' | 'rose';
  onRemove?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  onRemove,
  className = ''
}) => {
  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-full ${variantStyles[variant]} ${className}`}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-white rounded-full p-0.5 transition-colors focus:outline-none flex items-center justify-center"
          title="Remove tag"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};
