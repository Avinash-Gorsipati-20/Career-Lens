import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] focus:ring-blue-500/50',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-[0.98] focus:ring-slate-500/50',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 focus:ring-red-500/50',
    ghost: 'text-slate-300 hover:bg-slate-800/80 hover:text-white focus:ring-slate-500/50',
    outline: 'border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 focus:ring-blue-500/50'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
