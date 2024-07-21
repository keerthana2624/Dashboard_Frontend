import React, { useState } from 'react';
import Layout from './Layout'; // Import the Layout component
import './Register.css'; // Import the new CSS file for registration page

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Prepare data for submission
    const formData = {
      fullName,
      email,
      password,
    };

    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        // Registration successful alert
        alert('Registration successful!');
        // Redirect to home page or another route
        window.location.href = '/';
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="registration-container">
        <div className="registration-card">
          <h2>Registration Form</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* Add more form fields as needed */}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;