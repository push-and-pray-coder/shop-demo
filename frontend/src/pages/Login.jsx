import { useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api.js';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/auth/login/`, {
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
                setMessage(data.error || 'Login failed.');
                return;
            }

            setUser({
                id: data.id,
                username: data.username,
            });

            setMessage(`Welcome, ${data.username}!`);
            setPassword('');
            
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p role="status">{message}</p>
        </main>
    );
}