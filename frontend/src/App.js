import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

