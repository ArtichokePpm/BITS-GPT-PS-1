import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './PilaniDepartmentsPage.css';

const PilaniDepartmentsPage = () => {
  const { programName } = useParams();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/departments/${programName}`)
      .then(response => response.json())
      .then(data => setDepartments(data.departments))
      .catch(error => console.error('Error fetching departments:', error));
  }, [programName]);

  return (
    <div className="DepartmentsPage">
      <NavBar />
      <div className="content">
        <h2>{programName} Departments</h2>
        {departments.map(department => (
          <div key={department.departmentName}>
            <h3>{department.departmentName}</h3>
            {/* Include course list and create course functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PilaniDepartmentsPage;
