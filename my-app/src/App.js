// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './components/Initialpage';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminHome from './components/AdminHomepage';
import AdminRegister from './components/AdminRegister';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        {/* Add an admin route if needed */}
      </Routes>
    </Router>
  );
};

export default App;