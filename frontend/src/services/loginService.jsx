const loginUrl = 'http://localhost:9002/api/user/login'

async function loginApi({ email, password }) {
    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        // Assuming your API returns a token upon successful login
        const data = await response.json()
        // Store the token in localStorage or a state management solution
        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        throw new Error('Error during login');
    }
};

export default loginApi