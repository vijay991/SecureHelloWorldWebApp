import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className="text-center mt-5">
            <h1 className="display-4 text-primary mb-4" style={{ fontFamily: 'cursive' }}>Hello world :)</h1>
            <button type="submit" onClick={handleLogout} className="btn btn-primary">
                Logout
            </button>
        </div>
    );
}

export default HomePage;
