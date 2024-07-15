
// import React, { useState } from 'react';
// import axios from 'axios';

// const DepartmentForm = ({ addDepartment }) => {
//   const [departmentName, setDepartmentName] = useState('');
//   const [programId, setProgramId] = useState('');

//   const handleDepartmentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDepartment({ department_name: departmentName, program_id: programId });
//       setDepartmentName('');
//       setProgramId('');
//     } catch (error) {
//       console.error('Error adding department:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleDepartmentSubmit}>
//       <input
//         type="text"
//         placeholder="Department Name"
//         value={departmentName}
//         onChange={(e) => setDepartmentName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Program ID"
//         value={programId}
//         onChange={(e) => setProgramId(e.target.value)}
//         required
//       />
//       <button type="submit">Add Department</button>
//     </form>
//   );
// };

// export default DepartmentForm;





import React, { useState } from 'react';
import Select from 'react-select';

const programOptions = [
  { value: 'Pilani', label: 'Pilani' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Dubai', label: 'Dubai' }
];

const DepartmentForm = ({ addDepartment }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [programName, setProgramName] = useState(null);

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment({ dept_name: departmentName, prog_name: programName.value });
      setDepartmentName('');
      setProgramName(null);
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <form onSubmit={handleDepartmentSubmit}>
      <input
        type="text"
        placeholder="Department Name"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
        required
      />
      <Select
        options={programOptions}
        value={programName}
        onChange={setProgramName}
        placeholder="Select Program"
        required
      />
      <button type="submit">Add Department</button>
    </form>
  );
};

export default DepartmentForm;
