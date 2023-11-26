import { LOGIN_URL } from "../constant";
/**
 * Call login api
 * @param {object} - object of login form data that
 */
async function loginApi({ email, password }) {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        //throw error message if login failed
        if (!response.ok) {
            throw new Error(data.message || 'Login failed. Please try again.');
        }

        //set token if login successful
        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        throw error
    }
};

export default loginApi