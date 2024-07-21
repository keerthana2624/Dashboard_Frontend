// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage.js';
// import ProgramList from './components/ProgramList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/programs" element={<ProgramList />} /> */}
      </Routes>
    </Router>
  );
};

export default App;