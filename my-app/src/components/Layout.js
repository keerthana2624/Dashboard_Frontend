// frontend/src/components/Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Homepage.css';

const Layout = ({ children }) => {
  const location = useLocation();

  // Function to determine if current route is home, register, or login page
  const isSpecialPage = () => {
    const path = location.pathname;
    return path === '/' || path === '/register' || path === '/login' ||path === '/register' || path === '/admin/login';
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {!isSpecialPage() && <li><Link to="/programs">Programs</Link></li>}
            {/* <li><Link to="/contact">Contact</Link></li> */}
          </ul>
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
