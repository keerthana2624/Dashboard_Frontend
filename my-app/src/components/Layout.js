// frontend/src/components/Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Homepage.css';

const Layout = ({ children }) => {
  const location = useLocation();

  // Function to determine if current route is /register
  const isRegisterPage = () => {
    return location.pathname === '/register';
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
          {!isRegisterPage() && (
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          )}
          {isRegisterPage() && (
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
            </ul>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Education Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;