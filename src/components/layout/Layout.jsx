import React from 'react';

export const Layout = ({ 
  children,
  header,
  sidebar,
  footer,
  background = 'gradient',
  className = '' 
}) => {
  const backgrounds = {
    gradient: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    solid: 'bg-slate-900',
    animated: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden',
  };

  return (
    <div className={`min-h-screen ${backgrounds[background]} ${className}`}>
      {background === 'animated' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {header}
        
        <div className="flex flex-1">
          {sidebar}
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {footer}
      </div>
    </div>
  );
};

export const LayoutMain = ({ children, className = '', container = true, padding = 'md' }) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-4 md:p-8', 
    lg: 'p-6 md:p-12',
  };

  const classes = [
    'flex-1',
    container ? 'container mx-auto max-w-6xl' : '',
    paddings[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <main className={classes}>
      {children}
    </main>
  );
};
