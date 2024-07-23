import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from './Layout';
import './PaymentPage.css'; // Import the CSS file

const PaymentPage = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams(); // Get applicationId from URL
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentOption, setPaymentOption] = useState('full_payment');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    // Fetch course details using applicationId
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/details`);
        if (response.ok) {
          const data = await response.json();
          setCourseDetails(data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [applicationId]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Create payment payload
    const paymentData = {
      applicationId,
      courseDetails,
      paymentMethod,
      paymentOption,
      cardNumber,
      expirationDate,
      cvv
    };

    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setPaymentStatus('Payment successful!');
        setPaymentSuccessful(true);
        // Navigate to dashboard upon successful payment
        alert("Payment successfull.")
        navigate('/dashboard');
      } else {
        setPaymentStatus('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Error processing payment. Please try again.');
    }
  };

  return (
    <UserLayout showLogout={true} handleLogout={() => { /* Handle logout */ }}>
      <div className="payment-page-container">
        <h3>Make Payment</h3>
        <div className="course-details">
          <p><strong>Application ID:</strong> {applicationId}</p>
          <p><strong>Applicant Name:</strong> {courseDetails.fullname}</p>
          <p><strong>Email ID:</strong> {courseDetails.emailid}</p>
          <p><strong>Course ID:</strong> {courseDetails.courseid}</p>
          <p><strong>Course Name:</strong> {courseDetails.coursename}</p>
          <p><strong>Course Fee:</strong> Rs.{courseDetails.coursemoney}</p>
        </div>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <label>
            Payment Option:
            <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} className="payment-select">
              <option value="full_payment">Full Payment</option>
              <option value="payment_plan">Payment Plan</option>
            </select>
          </label>
          <label>
            Payment Method:
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="payment-select">
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
            </select>
          </label>
          {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
            <>
              <label>
                Card Number:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="payment-input"
                />
              </label>
              <label>
                Expiration Date:
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                  className="payment-input"
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="payment-input"
                />
              </label>
            </>
          )}
          <div className="button-group">
            <button type="submit" className="payment-button">Pay Now</button>
          </div>
        </form>
        {paymentStatus && <p className="status-message">{paymentStatus}</p>}
      </div>
    </UserLayout>
  );
};

export default PaymentPage;