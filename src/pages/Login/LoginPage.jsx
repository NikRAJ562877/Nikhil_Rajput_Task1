import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { users } from '../../utils/data';

export const LoginPage = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('student');
  const [selectedUser, setSelectedUser] = useState('student1');

  const handleLogin = () => {
    const user = users[role].find(u => u.id === selectedUser);
    if (user) {
      login({ ...user, role });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-slate-700/50">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-linear-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2">
            Assignment
          </h1>
          <p className="text-slate-300 text-lg">Management System</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 font-bold mb-3 uppercase text-sm tracking-wide">Select Role</label>
            <div className="flex gap-4">
              {['student', 'admin'].map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setSelectedUser(users[r][0].id);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition transform hover:scale-105 uppercase text-sm tracking-wide ${
                    role === r
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                  }`}
                >
                  {r === 'admin' ? 'Professor' : 'Student'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-3 uppercase text-sm tracking-wide">Select User</label>
            <div className="space-y-2">
              {users[role].map(u => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u.id)}
                  className={`w-full p-4 rounded-xl text-left border-2 transition transform hover:scale-105 ${
                    selectedUser === u.id
                      ? 'border-purple-500 bg-linear-to-r from-purple-600/30 to-pink-600/30'
                      : 'border-slate-600/50 hover:border-slate-500 bg-slate-700/30'
                  }`}
                >
                  <p className="font-semibold text-white">{u.name}</p>
                  <p className="text-sm text-slate-400">{u.email}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-105 shadow-xl text-lg uppercase tracking-wide"
          >
            Login
          </button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          ✨ Select a role and user to access the dashboard
        </p>
      </div>
    </div>
  );
};
