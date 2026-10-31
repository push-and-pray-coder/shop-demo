import { useState } from 'react';
import { NavLink } from 'react-router';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    let navigationClass = "navbar__navigation";

    if (menuOpen) {
        navigationClass = "navbar__navigation navbar__navigation--open";
    }

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
                        <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
                        <li><NavLink to="/cart" onClick={() => setMenuOpen(false)}>🛒</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;