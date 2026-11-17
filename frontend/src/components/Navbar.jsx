import { useState } from 'react';
import { NavLink } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getCsrfToken } from '../utils/csrf';
import { API_URL } from '../api.js';

import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart();
    const { user, setUser } = useAuth();

    let navigationClass = "navbar__navigation";

    if (menuOpen) {
        navigationClass = "navbar__navigation navbar__navigation--open";
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/logout/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': await getCsrfToken(),
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed.');
            }

            // Update the navbar only after Django invalidates the session.
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    return (
        <header>
            <nav className="navbar">
                <div className="navbar__brand">
                    <button
                        className="navbar__toggle"
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                        aria-controls="primary-navigation"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >☰</button>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Shop Demo</NavLink>
                </div>

                <div id="primary-navigation" className={navigationClass}>
                    <ul className="navbar__links">
                        <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
                        <li><NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink></li>
                        <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
                        <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
                        {user ? (
                            <>
                                <span>{user.username}</span>
                                <button
                                    type="button"
                                    className="navbar__logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                        <li><NavLink to="/cart" onClick={() => setMenuOpen(false)}>🛒({cartCount})</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;