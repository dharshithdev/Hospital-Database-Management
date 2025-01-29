import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Patient from './Patient';
import Doctors from './Doctor';
import Staffs from './Staffs';
import Admin from './Admins';
import "./App.css"; // Use a separate CSS file for better organization

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Hospital Management System</h1>

        {/* Navigation Bar */}
        <nav className="navbar">
          <NavLink to="/Doctor" className="nav-btn" activeClassName="active">Doctors</NavLink>
          <NavLink to="/Patient" className="nav-btn" activeClassName="active">Patients</NavLink>
          <NavLink to="/Staffs" className="nav-btn" activeClassName="active">Staffs</NavLink>
          <NavLink to="/Admins" className="nav-btn" activeClassName="active">Admin</NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<h2 className="welcome-text">Welcome to the Hospital Management System</h2>} />
          <Route path="/patient" element={<Patient />} />
          <Route path='/Doctor' element={<Doctors />} />
          <Route path='/Admins' element={<Admin />} />
          <Route path='/Staffs' element={<Staffs />} />
          <Route path="*" element={<h2 className="error-text">404: Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
