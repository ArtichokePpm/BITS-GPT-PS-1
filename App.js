import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import CoursesPage from './pages/CoursesPage';
import AddUsersPage from './pages/AddUsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('auth') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth');
  };

  return (
    <Router>
      <AppContent 
        isAuthenticated={isAuthenticated} 
        login={login} 
        logout={logout} 
      />
    </Router>
  );
};

const AppContent = ({ isAuthenticated, login, logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {isAuthenticated && <NavBar logout={logout} />}
      <Routes>
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/programs" element={isAuthenticated ? <ProgramsPage /> : <Navigate to="/" />} />
        <Route path="/departments" element={isAuthenticated ? <DepartmentsPage /> : <Navigate to="/" />} />
        <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />} />
        <Route path="/add-users" element={isAuthenticated ? <AddUsersPage /> : <Navigate to="/" />} />
        <Route path="/analytics" element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/" />} />
        <Route path="/" element={<LoginPage login={login} />} />
      </Routes>
    </div>
  );
};

export default App;
