import React from 'react';

const UploadDialog = ({ isOpen, onClose, onFileChange }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <input type="file" onChange={onFileChange} accept=".txt,.pdf" />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDialog;
