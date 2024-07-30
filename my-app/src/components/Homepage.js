// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/programs">Programs</Link></li> */}
            {/* <li><Link to="/contact">Contact</Link></li> */}
            {/* Add new li elements for Register and Login */}
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="hero">
        <div className="hero-content">
          <h2>Welcome to the Education Platform</h2>
          <p>Discover our online programs and apply now!</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button">Register</Link>
            <Link to="/login" className="cta-button">Login</Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Education Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;