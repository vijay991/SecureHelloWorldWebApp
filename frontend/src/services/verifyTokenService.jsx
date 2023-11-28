import { VERIFY_TOKEN_URL } from "../constant";

//call api that verify jwt token is valid or not
async function verifyTokenAPi() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found.');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await fetch(VERIFY_TOKEN_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Unable to verify token.');
        }
        return data;

    } catch (error) {
        throw error
    }
};

export default verifyTokenAPi