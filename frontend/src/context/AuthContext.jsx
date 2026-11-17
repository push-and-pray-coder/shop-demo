import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
import { API_URL } from '../api.js';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore the authenticated user from Django's existing session.
        async function checkAuth() {
            try {
                const response = await fetch(`${API_URL}/api/auth/me/`, {
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Authentication check failed.');
                }

                const data = await response.json();

                if (data.authenticated) {
                    setUser({
                        id: data.id,
                        username: data.username,
                    });
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}