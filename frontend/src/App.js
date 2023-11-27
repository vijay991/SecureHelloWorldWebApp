import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import HomePage from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
      </Routes>
    </Router>
  );
};

export default App;

