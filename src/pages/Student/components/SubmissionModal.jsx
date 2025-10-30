import React from 'react';

export const SubmissionModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  assignment, 
  confirmStep = false 
}) => {
  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          {confirmStep ? 'Final Confirmation' : 'Confirm Submission'}
        </h3>
        <p className="text-slate-300 mb-8 text-lg">
          {confirmStep 
            ? <>Are you absolutely sure you want to submit <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">"{assignment.title}"</span>?</>
            : 'Have you completed and submitted this assignment?'
          }
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 text-white rounded-xl font-semibold transition ${
              confirmStep 
                ? 'bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {confirmStep ? 'Confirm' : 'Yes, I have'}
          </button>
        </div>
      </div>
    </div>
  );
};
