// src/pages/AddUsersPage.js
import React from 'react';
import NavBar from '../components/NavBar';
import UserForm from '../components/UserForm';
import './AddUsersPage.css';

const AddUsersPage = () => {
  return (
    <div className="AddUsersPage">
      <NavBar />
      <div className="content">
        <h2>Add Users</h2>
        <UserForm />
      </div>
    </div>
  );
};

export default AddUsersPage;
