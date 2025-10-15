import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      onLogin();
      window.location.href = '/'; // Redirect to dashboard
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Access your code review dashboard</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <div className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;