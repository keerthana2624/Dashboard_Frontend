import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from './Layout';
import './Programs.css';
import { format, isValid } from 'date-fns';
const Programs = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDuration, setFilterDuration] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterProgram, setFilterProgram] = useState('');
    const [filteredCourses, setFilteredCourses] = useState({});
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/courses');
          if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.statusText}`);
          }
          const data = await response.json();
          setCourses(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching courses:', error);
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
  
    useEffect(() => {
      const filterCourses = () => {
        const filtered = courses.reduce((acc, course) => {
          const { title, duration, startdate, program } = course;
          if (
            title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterDuration === '' || duration.toLowerCase() === filterDuration.toLowerCase()) &&
            (filterStartDate === '' || new Date(startdate) >= new Date(filterStartDate)) &&
            (filterProgram === '' || program.toLowerCase() === filterProgram.toLowerCase())
          ) {
            if (!acc[program]) {
              acc[program] = [];
            }
            acc[program].push(course);
          }
          return acc;
        }, {});
        setFilteredCourses(filtered);
      };
  
      filterCourses();
    }, [courses, searchQuery, filterDuration, filterStartDate, filterProgram]);
  
    const handleEnrollClick = (courseId) => {
      navigate(`/enroll/${courseId}`);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleDurationChange = (event) => {
      setFilterDuration(event.target.value);
    };
  
    const handleStartDateChange = (event) => {
      setFilterStartDate(event.target.value);
    };
  
    const handleProgramChange = (event) => {
      setFilterProgram(event.target.value);
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <UserLayout>
        <div className="programs-container">
          <h2>Programs</h2>
  
          {/* Filters */}
          <div className="filters">
            {/* Search Input */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
  
            {/* Duration Filter */}
            <div className="filter">
              <select value={filterDuration} onChange={handleDurationChange}>
                <option value="">Filter by Duration</option>
                <option value="short">Short-term</option>
                <option value="medium">Medium-term</option>
                <option value="long">Long-term</option>
              </select>
            </div>
  
            {/* Start Date Filter */}
            <div className="filter">
              <input
                type="date"
                value={filterStartDate}
                onChange={handleStartDateChange}
              />
            </div>
  
            {/* Program Filter */}
            <div className="filter">
              <select value={filterProgram} onChange={handleProgramChange}>
                <option value="">Filter by Program</option>
                {Object.keys(filteredCourses).map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Render filtered courses */}
          <div className="courses">
            {Object.keys(filteredCourses).map((program) => (
              <div key={program} className="course-group">
                <h3>{program}</h3>
                <div className="course-row">
                  {filteredCourses[program].map((course) => (
                    <div key={course.id} className="course-card">
                      <img src={course.image} alt={course.title} />
                      <h4>{course.title}</h4>
                      <p>{course.description}</p>
                      <p className="price">Price: {course.price}</p>
                      <p>Duration: {course.duration}</p>
                      <p className="start-date">
                        Start Date:{' '}
                        {isValid(new Date(course.startdate))
                          ? format(new Date(course.startdate), 'yyyy-MM-dd')
                          : 'Invalid Date'}
                      </p>
                      <button
                        className="enroll-button"
                        onClick={() => handleEnrollClick(course.id)}
                      >
                        Enroll
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </UserLayout>
    );
  };
  
  export default Programs;