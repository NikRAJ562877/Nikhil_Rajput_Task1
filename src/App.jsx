import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/Login';
import { StudentView } from './pages/Student';
import { AdminView } from './pages/Admin';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return user.role === 'admin' ? <AdminView /> : <StudentView />;
}

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
