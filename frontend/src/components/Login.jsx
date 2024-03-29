import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginApi from '../services/loginService';

const LoginPage = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Validates the login form
    const validateForm = () => {
        if (!user.email || !user.password) {
            setError('Email and password are required.');
            return false;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
            setError('Invalid email address.');
            return false;
        }

        if (user.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return false;
        }

        return true;
    }

    // Handles the login process
    const handleLogin = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            //call login api
            await loginApi(user);
            navigate('/home');

            // Reset form and error on successful login
            setUser({ email: '', password: '' });
            setError(null);
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Login failed. Please try again.');
        }
    }

    // Handles email input change
    const handleEmailChange = (event) => {
        setUser({
            ...user,
            email: event.target.value,
        });
    }

    // Handles password input change
    const handlePasswordChange = (event) => {
        setUser({
            ...user,
            password: event.target.value,
        });
    }

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user.email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <p className="mt-3">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
