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

    const validateForm = () => {
        if (!user.email || !user.password) {
            setError('Email and password are required');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(user.email)) {
            setError('Invalid email address');
            return false;
        }

        if (user.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(user.password)) {
            setError('Password must contain at least one letter and one number');
            return false;
        }

        return true;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await loginApi(user)
            navigate('/home');

            // Reset form and error on successful login
            setUser({
                email: '',
                password: '',
            });
            setError(null);
        } catch (error) {
            setError(error.message || "error occured while login");
        }
    }

    const handleEmailChange = (e) => {
        setUser({
            ...user,
            email: e.target.value,
        });
    }

    const handlePasswordChange = (e) => {
        setUser({
            ...user,
            password: e.target.value,
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
