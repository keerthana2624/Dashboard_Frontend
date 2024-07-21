// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage'; // Import the Home component
import Register from './components/Register'; // Import the Register component
import Login from './components/Login'; // Import the Login component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;