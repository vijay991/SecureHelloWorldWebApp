import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signUpApi from '../services/signupService';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Invalid email address');
            return false;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(formData.password)) {
            setError('Password must contain at least one letter and one number');
            return false;
        }

        return true;
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return;
        }

        try {
            await signUpApi(formData)
            navigate('/home')

            // Reset form and error on successful signup
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            setError(null);
        } catch (error) {
            setError(error.message || 'An error occurred during signup');
        }
    }

    const handleNameChange = (e) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    }

    const handleEmailChange = (e) => {
        setFormData({
            ...formData,
            email: e.target.value,
        });
    }

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });
    }

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Sign Up</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input

                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
};

export default SignupPage;
