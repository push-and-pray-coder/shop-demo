import { API_URL } from '../api.js';

export async function getCsrfToken() {
    const response = await fetch(`${API_URL}/api/auth/csrf/`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Unable to retrieve CSRF token.');
    }

    const data = await response.json();
    return data.csrfToken;
}