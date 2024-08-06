import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import './ApplicationReview.css'; // Import your CSS file

const ApplicationReview = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/dashboard/applications', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.log('No applications found to review');
            setApplications([]); // Set applications array to empty
          } else {
            throw new Error('Network response was not ok');
          }
        } else {
          const data = await response.json();
          console.log('Fetched data:', data);

          if (!Array.isArray(data.applications)) {
            throw new Error('Applications data is not an array');
          }

          setApplications(data.applications);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleReview = (applicationNumber) => {
    const application = applications.find(app => app.applicationnumber === applicationNumber);
    setSelectedApplication(application);
  };

  const handleApprove = async () => {
    try {
      if (!selectedApplication || !selectedApplication.applicationnumber) {
        console.error('Selected application or application number is missing.');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/dashboard/applications/${selectedApplication.applicationnumber}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        throw new Error('Failed to approve enrollment');
      }

      console.log('Enrollment Approved:', selectedApplication);

      // Update applications list after approval
      const updatedApplications = applications.map(app => {
        if (app.applicationnumber === selectedApplication.applicationnumber) {
          return { ...app, status: 'approved' };
        }
        return app;
      });
      setApplications(updatedApplications);

      setSelectedApplication(null); // Clear selected application after action
    } catch (err) {
      console.error('Error approving enrollment:', err);
    }
  };

  const handleDeny = async () => {
    try {
      if (!selectedApplication || !selectedApplication.applicationnumber) {
        console.error('Selected application or application number is missing.');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/dashboard/applications/${selectedApplication.applicationnumber}/deny`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'denied' })
      });

      if (!response.ok) {
        throw new Error('Failed to deny enrollment');
      }

      console.log('Enrollment Denied:', selectedApplication);

      // Update applications list after denial
      const updatedApplications = applications.map(app => {
        if (app.applicationnumber === selectedApplication.applicationnumber) {
          return { ...app, status: 'denied' };
        }
        return app;
      });
      setApplications(updatedApplications);

      setSelectedApplication(null); // Clear selected application after action
    } catch (err) {
      console.error('Error denying enrollment:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading applications: {error.message}</p>;

  return (
    <AdminLayout>
      <div className="application-review-container">
        <h1 className="main-heading">Application Review</h1>
        {applications.length === 0 ? (
          <p>0 applications to review</p>
        ) : (
          <>
            <table className="review-table">
              <thead>
                <tr>
                  <th>Application Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.applicationnumber}>
                    <td>{application.applicationnumber}</td>
                    <td>
                      <button onClick={() => handleReview(application.applicationnumber)} className="review-button">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedApplication && (
              <div className="selected-application-details">
                <h2>Application Details</h2>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Full Name:</strong></td>
                      <td>{selectedApplication.fullname}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{selectedApplication.email}</td>
                    </tr>
                    <tr>
                      <td><strong>Phone:</strong></td>
                      <td>{selectedApplication.phone}</td>
                    </tr>
                    <tr>
                      <td><strong>Qualification:</strong></td>
                      <td>{selectedApplication.qualification}, {selectedApplication.degreetype}, {selectedApplication.qualificationscore}</td>
                    </tr>
                    <tr>
                      <td><strong>Course: </strong></td>
                      <td>{selectedApplication.courseid}, {selectedApplication.coursename}</td>
                    </tr>
                    <tr>
                      <td><strong>Statement of purpose:</strong></td>
                      <td>{selectedApplication.statementofpurpose}</td>
                    </tr>
                    <tr>
                      <td><strong>Status:</strong></td>
                      <td>{selectedApplication.status}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="actions-container">
                  <button onClick={handleApprove} className="approve-button">Approve</button> 
                  <button onClick={handleDeny} className="deny-button">Deny</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApplicationReview;
