import './ProductCard.css';
import { Link } from 'react-router';

function ProductCard({ product }) {
    return (
        <article className="product-card">
            <Link to={`/shop/${product.id}`}>
                {product.image && (
                    <img src={product.image} alt={product.name} loading="lazy" />
                )}
                <h2>{product.name}</h2>
                <p>${Number(product.price).toFixed(2)}</p>
            </Link>
        </article>
    );
}

export default ProductCard;