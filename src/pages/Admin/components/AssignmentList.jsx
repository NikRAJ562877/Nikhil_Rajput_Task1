import React from 'react';
import { Trash2, ExternalLink, Calendar } from 'lucide-react';
import { StudentSubmissions } from './StudentSubmissions';
import { getSubmissionStats } from '../../../utils/helpers';

export const AssignmentList = ({ assignments, submissions, students, onDelete }) => {
  if (assignments.length === 0) {
    return (
      <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-12 text-center backdrop-blur-xl">
        <div className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-slate-500" />
        </div>
        <p className="text-slate-400 text-xl">No assignments created yet.</p>
        <p className="text-slate-500 mt-2">Create your first assignment to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {assignments.map((assignment) => {
        const stats = getSubmissionStats(assignment.id, submissions);
        const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignment.id);
        
        return (
          <div 
            key={assignment.id} 
            className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-xl hover:shadow-2xl hover:shadow-pink-500/20 group"
          >
            <div className="flex justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-linear-to-br from-pink-500 to-cyan-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{assignment.title}</h2>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">{assignment.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {assignment.dueDate}
                  </span>
                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg font-medium hover:bg-purple-500/30 transition flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Drive Link
                  </a>
                  <span className="text-slate-400 text-xs">
                    Created on {assignment.createdAt}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onDelete(assignment.id)}
                className="text-red-500 hover:text-red-400 transition p-2 rounded-lg hover:bg-red-500/20 group-hover:opacity-100 opacity-70"
                title="Delete Assignment"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-300">Submission Progress</span>
                <span className="text-lg font-bold bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.submitted}/{stats.total} ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            <StudentSubmissions 
              submissions={assignmentSubmissions} 
              students={students} 
            />
          </div>
        );
      })}
    </div>
  );
};
