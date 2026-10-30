import { NavLink } from 'react-router';

function Navbar(){
    return (
        <header>
            <nav className="navbar">
                <div className="navbar__brand">
                    <a href="/">Shop Demo</a>
                </div>

                <div className="navbar__navigation">
                    <ul className="navbar__links">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/shop">Shop</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/cart">Cart</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;