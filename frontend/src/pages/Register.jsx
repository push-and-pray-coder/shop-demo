import { useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import { API_URL } from '../api.js';
import { Link } from 'react-router';
import './Auth.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/auth/register/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': await getCsrfToken(),
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
        <main className="auth-page">
            <div className="login">

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

                <p className="login__message" role="status">{message}</p>
            </div>
        </main>
    );
}