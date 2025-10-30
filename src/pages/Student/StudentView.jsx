import React, { useState } from 'react';
import { LogOut, BookOpen, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initializeData, STORAGE_KEYS } from '../../utils';
import { AssignmentCard, StatsCard, SubmissionModal } from './components';

export const StudentView = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useLocalStorage(STORAGE_KEYS.ASSIGNMENT_DATA, initializeData());
  const [confirmSubmit, setConfirmSubmit] = useState(null);

  const studentAssignments = data.assignments.map(assignment => {
    let submission = data.submissions.find(
      s => s.assignmentId === assignment.id && s.studentId === user.id
    );
    if (!submission) {
      submission = { status: 'not-submitted' };
    }
    return { ...assignment, submission };
  });

  const submittedCount = studentAssignments.filter(a => a.submission.status === 'submitted').length;
  const totalCount = studentAssignments.length;

  const handleSubmitAssignment = (assignmentId) => {
    const newSubmissions = data.submissions.map(sub => 
      sub.assignmentId === assignmentId && sub.studentId === user.id
        ? { ...sub, status: 'submitted', submittedAt: new Date().toISOString().split('T')[0] }
        : sub
    );
    const updatedData = { ...data, submissions: newSubmissions };
    setData(updatedData);
    setConfirmSubmit(null);
  };

  const statsData = [
    { icon: TrendingUp, label: 'Completed', value: submittedCount, linearFrom: 'from-purple-500/20', linearTo: 'to-purple-500/5', borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
    { icon: BookOpen, label: 'Total', value: totalCount, linearFrom: 'from-blue-500/20', linearTo: 'to-blue-500/5', borderColor: 'border-blue-500/30', textColor: 'text-blue-400' },
    { icon: Clock, label: 'Pending', value: totalCount - submittedCount, linearFrom: 'from-amber-500/20', linearTo: 'to-amber-500/5', borderColor: 'border-amber-500/30', textColor: 'text-amber-400' },
    { icon: Sparkles, label: 'Progress', value: `${totalCount > 0 ? Math.round((submittedCount / totalCount) * 100) : 0}%`, linearFrom: 'from-emerald-500/20', linearTo: 'to-emerald-500/5', borderColor: 'border-emerald-500/30', textColor: 'text-emerald-400' },
  ];

  // Fixed: Handle both number and string confirmSubmit values
  const getCurrentAssignment = () => {
    if (!confirmSubmit) return null;
    
    let assignmentId;
    if (typeof confirmSubmit === 'string' && confirmSubmit.startsWith('confirm-')) {
      assignmentId = parseInt(confirmSubmit.replace('confirm-', ''));
    } else {
      assignmentId = confirmSubmit;
    }
    
    return studentAssignments.find(a => a.id === assignmentId);
  };

  const currentAssignment = getCurrentAssignment();

  // Fixed: Proper type checking for confirmSubmit
  const isConfirmStep = typeof confirmSubmit === 'string' && confirmSubmit.startsWith('confirm-');
  const isInitialStep = confirmSubmit && !isConfirmStep;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-blue-400">
                  Assignments
                </h1>
              </div>
              <p className="text-purple-300 text-lg">Welcome back, <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">{user.name}</span></p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid gap-6">
            {studentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onSubmit={(id) => setConfirmSubmit(id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* First confirmation modal */}
      <SubmissionModal
        isOpen={isInitialStep}
        onClose={() => setConfirmSubmit(null)}
        onConfirm={() => setConfirmSubmit(`confirm-${confirmSubmit}`)}
        assignment={currentAssignment}
      />

      {/* Final confirmation modal */}
      <SubmissionModal
        isOpen={isConfirmStep}
        onClose={() => setConfirmSubmit(null)}
        onConfirm={() => {
          const assignmentId = parseInt(confirmSubmit.replace('confirm-', ''));
          handleSubmitAssignment(assignmentId);
        }}
        assignment={currentAssignment}
        confirmStep={true}
      />
    </div>
  );
};
