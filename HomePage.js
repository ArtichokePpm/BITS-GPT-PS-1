import React from 'react';
import NavBar from '../components/NavBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <NavBar />
      <div className="content">
        <div className="buttons">
          <button onClick={() => window.location.href = '/programs'}>Programs</button>
          <button onClick={() => window.location.href = '/departments'}>Departments</button>
          <button onClick={() => window.location.href = '/courses'}>Courses</button>
          <button onClick={() => window.location.href = '/add-users'}>Add Users</button>
        </div>
        <div className="analytics">
          <h2>Quick Analytics</h2>
          {/* Dummy graphs and plots */}
          <div className="graph">Graph 1</div>
          <div className="graph">Graph 2</div>
          <button className="more-analytics" onClick={() => window.location.href = '/analytics'}>More Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
