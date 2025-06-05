import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Gallery from './components/Gallery';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard'; // Admin Dashboard component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true when login is successful
  };

  // Handle registration
  const handleRegister = async (newUser) => {
    try {
      const response = await fetch('http://localhost:3005/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('Registration successful!');
      } else {
        const data = await response.json();
        console.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer /> 
    </Router>
  );
};

export default App;
