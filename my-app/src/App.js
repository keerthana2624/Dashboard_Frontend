import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './components/Initialpage';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminHome from './components/AdminHomepage';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CreateCourse from './components/CreateCourse';
import Programs from './components/Programs';
import EnrollmentForm from './components/Enrollment';
import TrackApplication from './components/TrackApplication';
import ApplicationReview from './components/ApplicationReview';
import PaymentPage from './components/PaymentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/track-application" element={<TrackApplication />} />
        <Route path="/dashboard/track-application/make-payment/:applicationId" element={<PaymentPage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/enroll/:courseId" element={<EnrollmentForm />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/create-course" element={<CreateCourse />} />
        <Route path="/admin/dashboard/application-review" element={<ApplicationReview />} />
        <Route path="/dashboard/make-payment/:applicationId" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
