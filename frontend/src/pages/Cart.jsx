
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import './Cart.css';
import { API_URL } from '../api.js';

function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Retrieve current product information from Django.
    useEffect(() => {
        let active = true;

        async function loadProducts() {
            setLoading(true);
            try {
                const results = await Promise.allSettled(
                    cart.map(async (item) => {
                        const response = await fetch(`${API_URL}/api/products/${item.id}/`);

                        if (!response.ok) {
                            throw new Error(`Failed to load product ${item.id}`);
                        }

                        return response.json();
                    })
                );

                const data = results
                    .filter(result => result.status === 'fulfilled')
                    .map(result => result.value);

                if (active) {
                    setProducts(data);
                    setError(false);
                }
            } catch (err) {
                if (active) {
                    console.error(err);
                    setError(true);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        if (cart.length > 0) {
            loadProducts();
        } else {
            setProducts([]);
            setLoading(false);
        }

        return () => {
            active = false;
        };
    }, [cart.map(item => item.id).join(',')]);

    // Combine saved quantities with current product information.
    const cartItems = cart
        .map(item => {
            const product = products.find(
                product => product.id === item.id
            );

            return product
                ? { ...product, quantity: item.quantity }
                : null;
        })
        .filter(Boolean);

    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    return (
        <main className="cart">
            <h1>Shopping Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : loading ? (
                <p>Loading cart...</p>
            ) : error ? (
                <p>Unable to load product information.</p>
            ) : (
                <>
                    <section aria-label="Cart items">
                        {cartItems.map(item => (
                            <article key={item.id} className="cart__item">
                                {item.image && (
                                    <img
                                        className="cart__image"
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                )}

                                <div className="cart__item-info">
                                    <h2>{item.name}</h2>
                                    <p>Price: ${Number(item.price).toFixed(2)}</p>

                                    <div className="cart__quantity">
                                        <button
                                            type="button"
                                            aria-label={`Decrease quantity of ${item.name}`}
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            −
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            type="button"
                                            aria-label={`Increase quantity of ${item.name}`}
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p>
                                        Total: ${(Number(item.price) * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        type="button"
                                        className="cart__remove"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>

                    <h2>Subtotal: ${subtotal.toFixed(2)}</h2>
                    <Link to="/checkout" className="cart__checkout">
                        Proceed to Checkout
                    </Link>                
                </>
            )}
        </main>
    );
}

export default Cart;
