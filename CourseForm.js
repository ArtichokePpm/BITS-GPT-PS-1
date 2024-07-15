import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessDialog from './SuccessDialog';

const CourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const courseResponse = await axios.post('http://localhost:5000/api/courses', {
        course_name: courseName,
        file_path: '',
        department_id: departmentId
      });

      const courseId = courseResponse.data.course_id;
      const collectionName = courseResponse.data.collection_name;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('course_id', courseId);

        const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('File uploaded:', uploadResponse.data.message);
      }

      setCourseName('');
      setFile(null);
      setSelectedFileName('');
      setSuccessDialogOpen(true);

      setTimeout(() => {
        setSuccessDialogOpen(false);
      }, 3000);

      console.log('Course created successfully:', courseResponse.data.message);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="CourseForm">
      <form onSubmit={handleCreateCourse}>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.dept_id}>
              {dept.dept_name} - {dept.prog_name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <span>{selectedFileName}</span>
        <button type="submit">Create Course</button>
      </form>
      {successDialogOpen && <SuccessDialog message="Course created successfully!" />}
    </div>
  );
};

export default CourseForm;
