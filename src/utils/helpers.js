/* eslint-disable no-undef */
export const getStatusIcon = (status) => {
  const { CheckCircle, Clock } = require('lucide-react');
  
  if (status === 'submitted') return CheckCircle;
  if (status === 'not-submitted') return Clock;
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage?.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
};

export const getSubmissionStats = (assignmentId, submissions) => {
  const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignmentId);
  const submitted = assignmentSubmissions.filter(s => s.status === 'submitted').length;
  const total = assignmentSubmissions.length;
  return { 
    submitted, 
    total, 
    percentage: total > 0 ? Math.round((submitted / total) * 100) : 0 
  };
};
