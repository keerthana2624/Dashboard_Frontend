import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from './Layout'; 
import './Enrollment.css'; 

function EnrollmentForm() {
    const { courseId } = useParams(); // Access courseId from URL parameters
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      qualification: '',
      degreeType: '', // Added for graduation degree type
      qualificationScore: '',
      courseId: courseId, // Set courseId to the URL parameter courseId
      statementOfPurpose: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
    const [applicationNumber, setApplicationNumber] = useState('');
    const [applicationPosition, setApplicationPosition] = useState(0);
  
    useEffect(() => {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().slice(-2);
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      const day = ('0' + currentDate.getDate()).slice(-2);
      let position = parseInt(localStorage.getItem('applicationPosition') || '0');
      const applicationDate = `${year}${month}${day}`;
      setApplicationNumber(`KH${applicationDate}${position}`);
      setApplicationPosition(position);
    }, []);
  
    const handleChange = e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const formDataWithAppNumber = { ...formData, applicationNumber, courseId };
        await fetch('http://localhost:5000/api/enroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithAppNumber),
        });
    
        const newPosition = applicationPosition + 1;
        localStorage.setItem('applicationPosition', newPosition.toString());
    
        console.log('Form data submitted successfully');
        setFormSubmitted(true);
    
        // Show success alert
        alert('Form submitted successfully!');
    
        // Redirect to the user dashboard page after a delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    };
    
    return (
      <UserLayout>
        <div className="enrollment-form-container">
          <h2 className="form-title">Enrollment Form</h2>
          {formSubmitted ? (
            <div className="alert alert-success" role="alert">
              Form submitted successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enrollment-form">
              {/* Application Details */}
              <fieldset className="form-section">
                <legend className="section-title">Application Details</legend>
                <div className="form-group">
                  <label htmlFor="applicationNumber">Application Number</label>
                  <input type="text" className="form-control" id="applicationNumber" name="applicationNumber" value={applicationNumber} readOnly />
                </div>
              </fieldset>
              {/* Personal Details */}
              <fieldset className="form-section">
                <legend className="section-title">Personal Details</legend>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="col">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
              </fieldset>
              {/* Educational Qualification */}
              <fieldset className="form-section">
                <legend className="section-title">Educational Qualification</legend>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="qualification">Highest Qualification</label>
                    <select className="form-control" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required>
                      <option value="">Select Qualification</option>
                      <option value="10th Class">10th Class</option>
                      <option value="12th Class">12th Class</option>
                      <option value="Graduation">Graduation</option>
                    </select>
                  </div>
                  {formData.qualification === 'Graduation' && (
                    <div className="col">
                      <label htmlFor="degreeType">Type of Degree</label>
                      <input type="text" className="form-control" id="degreeType" name="degreeType" value={formData.degreeType} onChange={handleChange} required />
                    </div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="qualificationScore">Qualification Score</label>
                    <input type="number" step="0.1" min="5" max="10" className="form-control" id="qualificationScore" name="qualificationScore" value={formData.qualificationScore} onChange={handleChange} required />
                  </div>
                </div>
              </fieldset>
              {/* Course Id */}
              <fieldset className="form-section">
                <legend className="section-title">Course Id</legend>
                <div className="form-group">
                  <label htmlFor="courseId">Course Id</label>
                  <input type="text" className="form-control" id="courseId" name="courseId" value={formData.courseId} readOnly />
                </div>
              </fieldset>
              {/* Statement of Purpose */}
              <fieldset className="form-section">
                <legend className="section-title">Statement of Purpose</legend>
                <div className="form-group">
                  <textarea className="form-control" id="statementOfPurpose" name="statementOfPurpose" value={formData.statementOfPurpose} onChange={handleChange} required />
                </div>
              </fieldset>
              <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
          )}
        </div>
      </UserLayout>
    );
  }
  
  export default EnrollmentForm;