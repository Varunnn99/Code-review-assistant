import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ReportView from './components/ReportView';
import './App.css'; // Import global CSS

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report/:id" element={<ReportView isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
};

export default App;