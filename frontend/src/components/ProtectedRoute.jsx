import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyTokenAPi from '../services/verifyTokenService';

export default function ProtectedRoute(props) {
    const navigate = useNavigate();
    const { Component } = props;
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                await verifyTokenAPi();
                setIsTokenValid(true);
            } catch (error) {
                navigate('/login');
            }
        };

        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            checkToken();
        }
    }, [navigate]);

    return isTokenValid ? <Component /> : null;
}
