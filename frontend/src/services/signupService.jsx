const signUpUrl = 'http://localhost:9002/api/signup'

async function signUpApi({ name, email, password }) {
    try {
        const response = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, age: 20, password }),
        });

        if (response.status !== 201) {
            throw new Error('Invalide data')
        }

        // Assuming your API returns a token upon successful signup
        const data = await response.json()
        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        throw new Error('Error during signUp');
    }
};

export default signUpApi