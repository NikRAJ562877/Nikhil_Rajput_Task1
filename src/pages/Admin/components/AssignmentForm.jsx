import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const AssignmentForm = ({ onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    driveLink: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate || !formData.driveLink) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '', dueDate: '', driveLink: '' });
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (!isVisible) return null;

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-8 backdrop-blur-xl">
      <h2 className="text-3xl font-bold text-white mb-6">New Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={handleChange('title')}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400 transition"
            placeholder="e.g., Database Design Project"
            required
          />
        </div>
        
        <div>
          <label className="block text-slate-300 font-semibold mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={handleChange('description')}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400 transition"
            placeholder="Assignment details..."
            rows="4"
            required
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={handleChange('dueDate')}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Google Drive Link</label>
            <input
              type="url"
              value={formData.driveLink}
              onChange={handleChange('driveLink')}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400 transition"
              placeholder="https://drive.google.com/..."
              required
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
          >
            Create Assignment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
