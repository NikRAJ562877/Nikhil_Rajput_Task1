import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

export const Input = forwardRef(({
  className = '',
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  loading = false,
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  required = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  const baseClasses = 'block w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500' 
    : success 
    ? 'border-emerald-500 focus:border-emerald-500'
    : focused
    ? 'border-purple-500'
    : 'border-slate-600 hover:border-slate-500';

  const paddingClasses = leftIcon ? 'pl-12' : rightIcon || showPasswordToggle ? 'pr-12' : '';
  const inputClasses = [baseClasses, stateClasses, paddingClasses, className].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={inputClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {(rightIcon || showPasswordToggle || loading) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent" />
            ) : showPasswordToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            ) : (
              <div className="text-slate-400">{rightIcon}</div>
            )}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="flex items-start gap-2 text-sm">
          {error && (
            <>
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <span className="text-red-400">{error}</span>
            </>
          )}
          {success && (
            <>
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-emerald-400">{success}</span>
            </>
          )}
          {helperText && !error && !success && (
            <span className="text-slate-400">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
