import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export const StudentSubmissions = ({ submissions, students }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Student Submissions</h3>
      {submissions.map(submission => {
        const student = students.find(s => s.id === submission.studentId);
        return (
          <div 
            key={submission.id} 
            className="flex items-center justify-between bg-slate-700/30 hover:bg-slate-700/50 p-4 rounded-xl transition border border-slate-600/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {student?.name?.charAt(0) || 'U'}
              </div>
              <span className="font-medium text-white">{student?.name || 'Unknown Student'}</span>
            </div>
            <div className="flex items-center gap-3">
              {submission.status === 'submitted' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-400">
                    {submission.submittedAt}
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-400">Pending</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
