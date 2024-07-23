import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <AdminLayout showLogout={true} handleLogout={() => {}}>
      <div className="admin-dashboard">
        <header className="admin-header">
          <h1 className="welcome-message">Welcome, Admin!</h1>
        </header>
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <h2>Create a Course</h2>
            <Link to="/admin/dashboard/create-course" className="dashboard-link">
              Go to the course creation form
            </Link>
          </div>
          <div className="dashboard-section">
            <h2>Application Review</h2>
            <Link to="/admin/dashboard/application-review" className="dashboard-link">
              Go to the application review section
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;