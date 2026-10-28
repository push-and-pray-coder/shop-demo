function Navbar(){
    return (
        <header>
            <nav className="navbar">
                <div className="navbar__brand">
                    <a href="/">Shop Demo</a>
                </div>

                <div className="navbar__navigation">
                    <ul className="navbar__links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;