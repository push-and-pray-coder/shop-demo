
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard.jsx';
import './Products.css';
import { API_URL } from '../api.js';

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryId = searchParams.get('category');

    const clearFilters = () => {
        setSearch('');
        setSubmittedSearch('');
        setSearchParams({});
    };

    useEffect(() => {
        fetch(`${API_URL}/api/products/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error(error));

        fetch(`${API_URL}/api/categories/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSearchParams(
            categoryId ? { category: categoryId } : {}
        );
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(submittedSearch.trim().toLowerCase());

        const matchesCategory =
            !categoryId || String(product.category_id) === categoryId;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="products">
            <h1>Products</h1>

            <div className="products__layout">
                <aside className="products__sidebar">
                    <h2>Categories</h2>

                    <button
                        type="button"
                        className={
                            !categoryId
                                ? 'products__category--active'
                                : ''
                        }
                        onClick={() => handleCategoryChange('')}
                    >
                        All Categories
                    </button>

                    {categories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            className={
                                categoryId === String(category.id)
                                    ? 'products__category--active'
                                    : ''
                            }
                            onClick={() =>
                                handleCategoryChange(String(category.id))
                            }
                        >
                            {category.name}
                        </button>
                    ))}
                </aside>

                <div className="products__content">
                    <form
                        className="products__controls"
                        onSubmit={(event) => {
                            event.preventDefault();
                            setSubmittedSearch(search);
                        }}
                    >
                        <input
                            type="search"
                            placeholder="Search products..."
                            aria-label="Search products"
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />

                        <select
                            className="products__mobile-categories"
                            aria-label="Filter by category"
                            value={categoryId || ''}
                            onChange={event =>
                                handleCategoryChange(event.target.value)
                            }
                        >
                            <option value="">All Categories</option>

                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {(submittedSearch || categoryId) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>
                        )}
                    </form>

                    <section
                        className="products__grid"
                        aria-label="Product listings"
                    >
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Products;
