
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from './Layout';
import './TrackApplication.css'; // Import the CSS file

const TrackApplication = () => {
  const [applicationId, setApplicationId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/payments/${applicationId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.paymentDone) {
            setPaymentStatus('completed');
          } else {
            setPaymentStatus('pending');
          }
        } else {
          setPaymentStatus('payment not found');
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setPaymentStatus('Error fetching payment status');
      }
    };

    if (applicationStatus === 'approved') {
      fetchPaymentStatus();
    }
  }, [applicationStatus, applicationId]);

  const handleTrackApplication = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}`);
      if (response.ok) {
        const data = await response.json();
        setApplicationStatus(data.status);
      } else {
        setApplicationStatus('Application not found');
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
      setApplicationStatus('Error fetching application status');
    }
  };

  return (
    <UserLayout showLogout={true} handleLogout={() => { /* Handle logout */ }}>
      <div className="track-application-container">
        <h3>Track Application</h3>
        <form onSubmit={handleTrackApplication} className="track-form">
          <input
            type="text"
            placeholder="Enter Application ID"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            required
            className="track-input"
          />
          <div className="button-group">
            <button type="submit" className="track-button">Track</button>
          </div>
        </form>
        {applicationStatus && <p className="status-message">Status: {applicationStatus}</p>}
        {applicationStatus === 'Approved' && (
          <>
            {paymentStatus === 'Completed' ? (
              <p className="status-message">Payment status: {paymentStatus}</p>
            ) : (
              <div className="Payment-link">
                <Link to={`/dashboard/track-application/make-payment/${applicationId}`}>Make Payment</Link>
              </div>
            )}
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default TrackApplication;
