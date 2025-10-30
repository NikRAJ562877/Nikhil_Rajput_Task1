import React, { useState } from 'react';
import { LogOut, Plus, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initializeData, STORAGE_KEYS } from '../../utils';
import { AssignmentForm, AssignmentList } from './components';
import { StatsCard } from '../Student/components/StatsCard';

export const AdminView = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useLocalStorage(STORAGE_KEYS.ASSIGNMENT_DATA, initializeData());
  const [showForm, setShowForm] = useState(false);

  const adminAssignments = data.assignments.filter(a => a.createdBy === user.id);
  const totalAssignments = adminAssignments.length;
  const totalStudents = data.students.length;
  const allSubmissions = adminAssignments.flatMap(a => data.submissions.filter(s => s.assignmentId === a.id));
  const avgSubmissionRate = allSubmissions.length > 0 
    ? Math.round((allSubmissions.filter(s => s.status === 'submitted').length / allSubmissions.length) * 100)
    : 0;

  const handleCreateAssignment = (formData) => {
    const newAssignment = {
      id: Math.max(...data.assignments.map(a => a.id), 0) + 1,
      ...formData,
      createdBy: user.id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    const newSubmissions = data.students.map((student, index) => ({
      id: Math.max(...data.submissions.map(s => s.id), 0) + index + 1,
      assignmentId: newAssignment.id,
      studentId: student.id,
      status: 'not-submitted',
    }));
    
    const updatedData = {
      ...data,
      assignments: [...data.assignments, newAssignment],
      submissions: [...data.submissions, ...newSubmissions],
    };
    
    setData(updatedData);
    setShowForm(false);
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
      const updatedData = {
        ...data,
        assignments: data.assignments.filter(a => a.id !== assignmentId),
        submissions: data.submissions.filter(s => s.assignmentId !== assignmentId),
      };
      setData(updatedData);
    }
  };

  const statsData = [
    { 
      icon: BookOpen, 
      label: 'Assignments', 
      value: totalAssignments, 
      linearFrom: 'from-pink-500/20', 
      linearTo: 'to-pink-500/5', 
      borderColor: 'border-pink-500/30', 
      textColor: 'text-pink-400' 
    },
    { 
      icon: () => <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 text-xs font-bold">{totalStudents}</div>, 
      label: 'Students', 
      value: totalStudents, 
      linearFrom: 'from-cyan-500/20', 
      linearTo: 'to-cyan-500/5', 
      borderColor: 'border-cyan-500/30', 
      textColor: 'text-cyan-400' 
    },
    { 
      icon: () => <div className="w-6 h-6 bg-purple-400 rounded text-white text-xs font-bold flex items-center justify-center">📋</div>, 
      label: 'Total Submissions', 
      value: allSubmissions.length, 
      linearFrom: 'from-purple-500/20', 
      linearTo: 'to-purple-500/5', 
      borderColor: 'border-purple-500/30', 
      textColor: 'text-purple-400' 
    },
    { 
      icon: () => <div className="w-6 h-6 bg-emerald-400 rounded-full text-white text-xs font-bold flex items-center justify-center">%</div>, 
      label: 'Avg Rate', 
      value: `${avgSubmissionRate}%`, 
      linearFrom: 'from-emerald-500/20', 
      linearTo: 'to-emerald-500/5', 
      borderColor: 'border-emerald-500/30', 
      textColor: 'text-emerald-400' 
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-linear-to-br from-pink-500 to-cyan-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400">
                  Manage
                </h1>
              </div>
              <p className="text-purple-300 text-lg">
                Professor: <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400">{user.name}</span>
              </p>
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

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-bold transition transform hover:scale-105 mb-8 shadow-xl text-lg"
          >
            <Plus className="w-6 h-6" />
            Create Assignment
          </button>

          <AssignmentForm
            onSubmit={handleCreateAssignment}
            onCancel={() => setShowForm(false)}
            isVisible={showForm}
          />

          <AssignmentList
            assignments={adminAssignments}
            submissions={data.submissions}
            students={data.students}
            onDelete={handleDeleteAssignment}
          />
        </div>
      </div>
    </div>
  );
};
