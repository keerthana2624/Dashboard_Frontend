
// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          console.error('Error fetching dashboard data:', response.statusText);
          // Handle non-successful response
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle fetch error
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    alert('Logout successful');
    navigate('/', { replace: true }); // Redirect to home page after logout
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>{message}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
