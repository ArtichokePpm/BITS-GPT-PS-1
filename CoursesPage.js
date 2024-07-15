import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CourseForm from '../components/CourseForm';
import './CoursesPage.css';

const CoursesPage = () => {
  const [departments, setDepartments] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    file_path: '',
    department_id: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDepartments(response.data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleCourseSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', newCourse);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('course_id', newCourse.course_id); // Corrected to use course_id

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewCourse({ ...newCourse, file_path: response.data.file_path });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="CoursesPage">
      <NavBar />
      <div className="content">
        <h2>Courses</h2>
        <form onSubmit={handleCourseSubmit}>
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.course_name}
            onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
            required
          />
          <select
            value={newCourse.department_id}
            onChange={(e) => setNewCourse({ ...newCourse, department_id: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.dept_id}>
                {dept.dept_name} - {dept.prog_name}
              </option>
            ))}
          </select>
          <input type="file" onChange={handleFileUpload} required />
          <button type="submit">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default CoursesPage;
