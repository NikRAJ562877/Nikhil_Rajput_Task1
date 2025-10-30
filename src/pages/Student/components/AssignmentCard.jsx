import React from 'react';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';

export const AssignmentCard = ({ assignment, onSubmit }) => {
  const getStatusIcon = (status) => {
    if (status === 'submitted') return <CheckCircle className="w-6 h-6 text-emerald-500" />;
    if (status === 'not-submitted') return <Clock className="w-6 h-6 text-amber-500" />;
  };

  return (
    <div className="group bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${assignment.submission.status === 'submitted' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
              {getStatusIcon(assignment.submission.status)}
            </div>
            <h2 className="text-2xl font-bold text-white">{assignment.title}</h2>
          </div>
          <p className="text-slate-300 mb-4 leading-relaxed">{assignment.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg font-medium">
              📅 Due: {assignment.dueDate}
            </span>
            <span className={`px-3 py-1 rounded-lg font-semibold ${
              assignment.submission.status === 'submitted' 
                ? 'bg-emerald-500/20 text-emerald-300' 
                : 'bg-amber-500/20 text-amber-300'
            }`}>
              {assignment.submission.status === 'submitted' ? '✓ Submitted' : '⏳ Not Submitted'}
            </span>
            {assignment.submission.submittedAt && (
              <span className="text-slate-400">on {assignment.submission.submittedAt}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:min-w-fit">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Open Link</span>
          </a>
          {assignment.submission.status === 'not-submitted' && (
            <button
              onClick={() => onSubmit(assignment.id)}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Submit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
