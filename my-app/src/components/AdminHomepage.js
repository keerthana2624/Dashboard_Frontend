// src/components/AdminHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Reuse the CSS file for styling

const AdminHome = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Admin Portal</h1>
          <ul className="nav-links">
            <li><Link to="/admin/home">Home</Link></li>
            <li><Link to="/admin/register">Register</Link></li>
            <li><Link to="/admin/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="hero">
        <div className="hero-content">
          <h2>Welcome to the Admin Portal</h2>
          <p>Create courses, manage and review applications effectively!</p>
          <div className="cta-buttons">
            <Link to="/admin/register" className="cta-button">Register</Link>
            <Link to="/admin/login" className="cta-button">Login</Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Education Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminHome;