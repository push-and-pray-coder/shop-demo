
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';
import { API_URL } from '../api.js';

export default function Checkout() {
    const { cart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [shipping, setShipping] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            try {
                const response = await fetch(`${API_URL}/api/products/`);

                if (!response.ok) {
                    throw new Error('Failed to load products.');
                }

                const data = await response.json();

                if (active) {
                    setProducts(data);
                }
            } catch (error) {
                if (active) {
                    setError(error.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        // Ignore responses after the component unmounts.
        return () => {
            active = false;
        };
    }, []);

    // Combine locally stored quantities with current Django product data.
    const cartItems = cart.map(item => {
        const product = products.find(product => product.id === item.id);

        return {
            ...product,
            id: item.id,
            quantity: item.quantity,
        };
    });

    const missingProducts = cartItems.some(
        item => item.name == null || item.price == null
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + (Number(item.price) || 0) * item.quantity,
        0
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setShipping(current => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loading || error || missingProducts || cart.length === 0) {
            return;
        }

        // Demo only: no payment is processed or order saved.
        alert('Checkout form submitted successfully (demo only).');
    };

    return (
        <main className="checkout">
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit} className="checkout__layout">

                <section className="checkout__shipping">
                    <h2>Shipping Information</h2>

                    <div className="checkout__field">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            value={shipping.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkout__field">
                        <label htmlFor="address">Street Address</label>
                        <input
                            id="address"
                            name="address"
                            value={shipping.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkout__field">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            value={shipping.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkout__field">
                        <label htmlFor="state">State</label>
                        <input
                            id="state"
                            name="state"
                            value={shipping.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkout__field">
                        <label htmlFor="zip">ZIP Code</label>
                        <input
                            id="zip"
                            name="zip"
                            value={shipping.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </section>

                <section className="checkout__summary">
                    <h2>Order Summary</h2>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p role="alert">{error}</p>
                    ) : missingProducts ? (
                        <p role="alert">
                            Some products are unavailable. Checkout cannot continue.
                        </p>
                    ) : (
                        cartItems.map(item => (
                            <p key={item.id}>
                                {item.name} × {item.quantity}
                                {' — '}
                                ${(Number(item.price) * item.quantity).toFixed(2)}
                            </p>
                        ))
                    )}

                    <h3>Subtotal: ${subtotal.toFixed(2)}</h3>

                    <button
                        type="submit"
                        className="checkout__button"
                        disabled={
                            loading ||
                            Boolean(error) ||
                            missingProducts ||
                            cart.length === 0
                        }
                    >
                        Place Demo Order
                    </button>
                </section>

            </form>
        </main>
    );
}
