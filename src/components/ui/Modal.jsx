import React, { createContext, useContext, useEffect } from 'react';
import { X } from 'lucide-react';

const ModalContext = createContext();
const useModalContext = () => useContext(ModalContext);

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleOverlayClick}
      >
        <div className={`bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full ${sizes[size]} border border-slate-700/50`}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const ModalHeader = ({ className = '', showCloseButton = true, children, ...props }) => {
  const { onClose } = useModalContext();

  return (
    <div className={`flex items-center justify-between p-6 pb-4 ${className}`} {...props}>
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="ml-4 p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export const ModalBody = ({ className = '', children, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const ModalFooter = ({ className = '', justify = 'end', children, ...props }) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center', 
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`flex items-center gap-3 p-6 pt-4 ${justifyClasses[justify]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Attach sub-components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
