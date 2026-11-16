import { useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import { API_URL } from '../api.js';


export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            // Obtain a CSRF cookie before submitting protected data.
            const csrfResponse = await fetch(`${API_URL}/api/auth/csrf/`, {
                credentials: 'include',
            });

            if (!csrfResponse.ok) {
                throw new Error('Unable to initialize CSRF protection.');
            }

            const response = await fetch(`${API_URL}/api/auth/register/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.error || data.errors?.join(' ') || 'Registration failed.'
                );
                return;
            }

            setMessage(`Account created for ${data.username}!`);
            setPassword('');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <p role="status">{message}</p>
        </main>
    );
}