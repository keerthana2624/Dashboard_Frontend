import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserLayout from './Layout';
import './Dashboard.css';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Fetch dashboard data (message)
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
        }

        // Fetch enrolled courses from payments table
        const enrolledCoursesResponse = await fetch('http://localhost:5000/api/dashboard/enrolled-courses', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (enrolledCoursesResponse.ok) {
          const coursesData = await enrolledCoursesResponse.json();
          if (coursesData.enrolledCourses && coursesData.enrolledCourses.length > 0) {
            setEnrolledCourses(coursesData.enrolledCourses);
          } else {
            setEnrolledCourses(null);
          }
        } else {
          console.error('Error fetching enrolled courses:', enrolledCoursesResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout successful');
    navigate('/', { replace: true });
  };

  const handleTrackApplication = () => {
    navigate('/dashboard/track-application');
  };

  return (
    <UserLayout>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>{message}</p>

          {/* Display enrolled courses if available */}
          {enrolledCourses && (
            <div className="enrolled-courses">
              <h3>Enrolled Courses</h3>
              <table className="course-table">
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Status</th> {/* Add a column for status */}
                    <th>Action</th> {/* Add a column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.courseid}</td>
                      <td>{course.coursename}</td>
                      <td>{course.status}</td> {/* Display status */}
                      <td>
                        {course.status === 'Approved' && (
                          <Link to={`/dashboard/track-application/make-payment/${course.applicationid}`}>Make Payment</Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="dashboard-links">
          <button className="dashboard-button track-application-button" onClick={handleTrackApplication}>
            Track Application Status
          </button>
          <br />
          <button className="dashboard-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
