import React, { forwardRef } from 'react';

export const Card = forwardRef(({
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-slate-800/50 border border-slate-700/50',
    glass: 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl border border-slate-700/50',
    gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50',
    bordered: 'bg-slate-800 border-2 border-slate-600',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = 'rounded-2xl transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 transform hover:scale-105' : '';
  
  const classes = [
    baseClasses,
    variants[variant],
    paddings[padding],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

// Sub-components for compound pattern
export const CardHeader = forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
));

export const CardBody = forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`flex-1 ${className}`} {...props}>
    {children}
  </div>
));

export const CardFooter = forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`mt-4 ${className}`} {...props}>
    {children}
  </div>
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

// Attach sub-components to main Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
