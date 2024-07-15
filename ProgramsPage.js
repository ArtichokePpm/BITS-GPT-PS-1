// src/pages/ProgramsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './ProgramsPage.css';

const ProgramsPage = () => {
  const navigate = useNavigate();

  const handleProgramClick = (programName) => {
    navigate(`/program/${programName}/departments`);
  };

  return (
    <div className="ProgramsPage">
      <NavBar />
      <div className="content">
        <h2>Programs</h2>
        <button className="program-button" onClick={() => handleProgramClick('Pilani')}>Pilani</button>
        <button className="program-button" onClick={() => handleProgramClick('Goa')}>Goa</button>
        <button className="program-button" onClick={() => handleProgramClick('Hyderabad')}>Hyderabad</button>
        <button className="program-button" onClick={() => handleProgramClick('Dubai')}>Dubai</button>
      </div>
    </div>
  );
};

export default ProgramsPage;
