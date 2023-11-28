import { LOGOUT_URL } from "../constant";
/**
 * Call logout api
 * @param {object} - object of logout form data
 */
async function logoutApi() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found.');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        const data = await response.json();

        //throw error message if logout failed
        if (!response.ok) {
            throw new Error(data.message || 'logout failed. Please try again.');
        }

        //remove token if logout successful
        localStorage.removeItem("token");

        return data;
    } catch (error) {
        throw error
    }
};

export default logoutApi