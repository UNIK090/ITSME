import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return isLoggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default Admin;