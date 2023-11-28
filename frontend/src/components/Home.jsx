import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutApi from '../services/logoutService';

const HomePage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            await logoutApi()
            navigate("/login");
        } catch (error) {
            setError(error.message || 'Logout failed. Please try again.');
        }
    }
    return (
        <div className="text-center mt-5">
            {error && <p className="text-danger">{error}</p>}
            <h1 className="display-4 text-primary mb-4" style={{ fontFamily: 'cursive' }}>Hello world :)</h1>
            <button type="submit" onClick={handleLogout} className="btn btn-primary">
                Logout
            </button>
        </div>
    );
}

export default HomePage;
