// src/components/AdminLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Admin login successful!');
        navigate('/admin/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="registration-container">
        <div className="registration-card">
          <h2>Admin Login Form</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="login-helper-text">
            {/* Don't have an account? <Link to="/admin/register">Register here</Link> */}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;