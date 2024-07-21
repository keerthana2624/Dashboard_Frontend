// src/components/InitialPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Reuse the CSS file for styling

const InitialPage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
        </nav>
      </header>
      <main className="hero">
        <div className="hero-content">
          <h2>Welcome to the Education Platform</h2>
          <p>Select your portal:</p>
          <div className="cta-buttons">
            <Link to="/home" className="cta-button">For Students</Link>
            <Link to="/admin/home" className="cta-button">For Admin</Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Education Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InitialPage;