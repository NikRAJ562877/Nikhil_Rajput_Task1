import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(({
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  onClick,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg',
    destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg',
    outline: 'border-2 border-slate-600 hover:border-slate-500 bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/50',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  const iconElement = loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon;

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {iconElement && iconPosition === 'left' && (
        <span className={children ? 'mr-2' : ''}>{iconElement}</span>
      )}
      {children}
      {iconElement && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''}>{iconElement}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
