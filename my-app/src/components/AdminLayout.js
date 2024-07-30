import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file for styling

const AdminLayout = ({ children, showLogout, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine if the current route is an admin route
  const isAdminRoute = () => location.pathname.startsWith('/admin/dashboard');

  // Function to handle link clicks with alert
  const handleLinkClick = (pageName) => {
    alert(`Redirecting to ${pageName} page.`);
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    handleLogout(); // Perform logout actions (clear token, etc.)
    localStorage.removeItem('token');
    alert('Logout successful');
    navigate('/'); // Redirect to home page using navigate
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="brand">Education Platform</h1>
          {isAdminRoute() && (
            <ul className="nav-links">
              <li>
                <Link to="/admin/dashboard" onClick={() => handleLinkClick('Dashboard')}>Dashboard</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogoutClick}>Logout</Link>
              </li>
            </ul>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Education Platform. All rights are reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;