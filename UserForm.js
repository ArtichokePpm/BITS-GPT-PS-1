import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const UserForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const fileType = file.name.split('.').pop();
      if (fileType === 'xlsx' || fileType === 'xls') {
        uploadExcel(file);
      } else {
        alert('Unsupported file format. Please upload an Excel file.');
      }
    }
  };

  const uploadExcel = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/api/upload-user-details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Response:', response);
      alert(response.data.message);
    })
    .catch(error => {
      console.error('Error uploading user details:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error uploading user details');
      }
    });
  };

  return (
    <div>
      <h2>Add User Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Upload User login details:
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UserForm;
