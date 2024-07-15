

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from '../components/NavBar';
// import DepartmentForm from '../components/DepartmentForm';
// import Select from 'react-select';
// import './DepartmentsPage.css';

// const DepartmentsPage = () => {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/departments');
//       setDepartments(response.data.departments);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const addDepartment = async (newDepartment) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/departments', newDepartment);
//       alert(response.data.message);
//       fetchDepartments(); // Refresh departments after creation
//     } catch (error) {
//       console.error('Error adding department:', error);
//     }
//   };

//   const departmentOptions = departments.map((dept) => ({
//     value: dept._id,
//     label: `${dept.department_name} - ${dept.program_id}`
//   }));

//   return (
//     <div className="DepartmentsPage">
//       <NavBar />
//       <div className="content">
//         <h2>Departments</h2>
//         <Select
//           options={departmentOptions}
//           value={selectedDepartment}
//           onChange={setSelectedDepartment}
//           className="searchable-dropdown"
//           placeholder="Search and select a department"
//         />
//         <DepartmentForm addDepartment={addDepartment} />
//       </div>
//     </div>
//   );
// };

// export default DepartmentsPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import DepartmentForm from '../components/DepartmentForm';
import Select from 'react-select';
import './DepartmentsPage.css';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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

  const addDepartment = async (newDepartment) => {
    try {
      const response = await axios.post('http://localhost:5000/api/departments', newDepartment);
      alert(response.data.message);
      fetchDepartments(); // Refresh departments after creation
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const departmentOptions = departments.map((dept) => ({
    value: dept._id,
    label: `${dept.dept_name} - ${dept.prog_name}`
  }));

  return (
    <div className="DepartmentsPage">
      <NavBar />
      <div className="content">
        <h2>Departments</h2>
        <Select
          options={departmentOptions}
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          className="searchable-dropdown"
          placeholder="Search and select a department"
        />
        <DepartmentForm addDepartment={addDepartment} />
      </div>
    </div>
  );
};

export default DepartmentsPage;
