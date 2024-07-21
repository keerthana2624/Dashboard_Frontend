import React, { useState } from 'react';
import AdminLayout from './AdminLayout'; // Import the AdminLayout component
import './CreateCourse.css'; // Import the CSS file

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    duration: '',
    program: '',
    startDate: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Proceed with course creation
      const response = await fetch('http://localhost:5000/api/admin/dashboard/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }
      
      setFormData({
        id: '',
        title: '',
        description: '',
        price: '',
        duration: '',
        program: '',
        startDate: '',
        image: ''
      });

      alert('Course created successfully.');

    } catch (error) {
        alert('Failed to create course. Course already exists.');
        console.error('Error creating course:', error.message);
        // Clear form fields after successful creation
      setFormData({
        id: '',
        title: '',
        description: '',
        price: '',
        duration: '',
        program: '',
        startDate: '',
        image: ''
      });

    }
  };

  return (
    <AdminLayout showLogout={true} handleLogout={() => {}}>
      <div className="create-course-container">
        <h1>Create a New Course</h1>
        <form onSubmit={handleSubmit} className="create-course-form">
          <label>
            Program:
            <input 
              type="text" 
              name="program" 
              value={formData.program} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Course ID:
            <input 
              type="text" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Course Title:
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Description:
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Price:
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Duration:
            <select 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
            >
              <option value="">Select duration</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </label>
          
          <label>
            Start Date:
            <input 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Image URL:
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
            />
          </label>
          <button type="submit">Create Course</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateCourse;