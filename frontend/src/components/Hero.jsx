import { Link } from "react-router";
import "./Hero.css";


function Hero()
{
    return(
        <section className="hero">
            <div className="hero__content">
                <h1>Welcome to Shop Demo</h1>
                <p>Discover products for your everyday needs.</p>
                <Link to="/shop" className="hero__button">
                    Shop Now
                </Link>
            </div>
        </section>
    );
}

export default Hero;