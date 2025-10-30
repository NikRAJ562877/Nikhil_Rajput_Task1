import React from 'react';
import { LogOut, Bell } from 'lucide-react';

export const Header = ({
  title,
  subtitle, 
  user,
  onLogout,
  showNotifications = false,
  notificationCount = 0,
  children,
  className = ''
}) => {
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            {(title || subtitle) && (
              <div>
                {title && (
                  <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-400">{subtitle}</p>
                )}
              </div>
            )}
            {children}
          </div>

          <div className="flex items-center gap-3">
            {showNotifications && (
              <button className="relative p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800/50 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            )}

            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                </div>
                
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getUserInitials(user.name)}
                </div>
              </div>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition transform hover:scale-105 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
