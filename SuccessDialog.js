// import React from 'react';

// const SuccessDialog = ({ isOpen, onClose, courseName }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={onClose}>&times;</span>
//             <p>Success! The course "{courseName}" has been created.</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SuccessDialog;




import React from 'react';
import './SuccessDialog.css';

const SuccessDialog = ({ message }) => {
  return (
    <div className="success-dialog">
      <p>{message}</p>
    </div>
  );
};

export default SuccessDialog;
