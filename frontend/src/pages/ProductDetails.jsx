import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useCart } from '../context/CartContext';
import './ProductDetails.css'
import { API_URL } from '../api.js';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${API_URL}/api/products/${productId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load product');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => setError(error.message));
    }, [productId]);

    if (error) return <p role="alert">{error}</p>;
    if (!product) return <p>Loading product...</p>;

    return (
        <main className="product-details">
            {product.image && (
                <img src={product.image} alt={product.name} />
            )}

            <div className="product-details__info">
                <h1>{product.name}</h1>
                <p>${Number(product.price).toFixed(2)}</p>
                {product.description && (
                    <p className="product-details__description">
                        {product.description}
                    </p>)}
                        <button
                            type="button"
                            className="product-details__add-to-cart"
                            onClick={() => addToCart(product)}
                        >  
                            Add to Cart
                        </button>
            </div>
        </main>
    );
}

export default ProductDetails;