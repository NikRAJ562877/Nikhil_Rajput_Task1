export const initializeData = () => {
  try {
    const stored = localStorage?.getItem('assignmentData');
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }

  const defaultData = {
    assignments: [
      {
        id: 1,
        title: 'React Basics',
        description: 'Learn React fundamentals',
        dueDate: '2025-11-15',
        driveLink: 'https://drive.google.com/file/d/1234',
        createdBy: 'prof1',
        createdAt: '2025-10-20'
      },
      {
        id: 2,
        title: 'State Management',
        description: 'Understand useState and Context',
        dueDate: '2025-11-22',
        driveLink: 'https://drive.google.com/file/d/5678',
        createdBy: 'prof1',
        createdAt: '2025-10-21'
      },
      {
        id: 3,
        title: 'API Integration',
        description: 'Fetch data from external APIs',
        dueDate: '2025-12-01',
        driveLink: 'https://drive.google.com/file/d/9012',
        createdBy: 'prof2',
        createdAt: '2025-10-22'
      },
    ],
    submissions: [
      { id: 1, assignmentId: 1, studentId: 'student1', status: 'submitted', submittedAt: '2025-11-14' },
      { id: 2, assignmentId: 1, studentId: 'student2', status: 'not-submitted' },
      { id: 3, assignmentId: 2, studentId: 'student1', status: 'not-submitted' },
      { id: 4, assignmentId: 2, studentId: 'student2', status: 'submitted', submittedAt: '2025-11-21' },
      { id: 5, assignmentId: 3, studentId: 'student1', status: 'submitted', submittedAt: '2025-11-30' },
    ],
    students: [
      { id: 'student1', name: 'Alice Johnson', email: 'alice@university.edu' },
      { id: 'student2', name: 'Bob Smith', email: 'bob@university.edu' },
    ],
  };

  try {
    localStorage?.setItem('assignmentData', JSON.stringify(defaultData));
  } catch { /* empty */ }

  return defaultData;
};

export const users = {
  student: [
    { id: 'student1', name: 'Alice Johnson', email: 'alice@university.edu' },
    { id: 'student2', name: 'Bob Smith', email: 'bob@university.edu' },
  ],
  admin: [
    { id: 'prof1', name: 'Dr. Sarah Anderson', email: 'sarah@university.edu' },
    { id: 'prof2', name: 'Dr. Michael Chen', email: 'michael@university.edu' },
  ],
};
