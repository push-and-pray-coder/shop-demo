import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './CategoryGrid.css';

function CategoryGrid(){
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetch('/api/categories/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    return(
        <section className="category-grid">
            <h2>Shop by Category</h2>

            <div className="category-grid__items">
                {categories.map(category => (
                    <Link
                    key={category.id}
                    to={`/shop?category=${category.id}`}
                    className="category-grid__item"
                    >
                        {category.image && (
                            <img
                            src={category.image}
                            alt={category.name}
                            loading="lazy"
                            />
                        )}
                        <span>{category.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoryGrid;