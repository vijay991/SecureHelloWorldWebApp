import { SIGNUP_URL } from "../constant";
/**
 * Call signUp api
 * @param {object} - object of form data that
 */
async function signUpApi({ name, email, password }) {
    try {
        const response = await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json()

        //throw error message if signup fail
        if (!response.ok) {
            throw new Error(data.message || 'SignUp failed. Please try again.')
        }

        //set token is signup successful
        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        throw error
    }
};

export default signUpApi