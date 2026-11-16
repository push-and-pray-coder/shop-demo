
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');

        // Restore only product IDs and quantities.
        // Also converts carts saved in the old format.
        return savedCart
            ? JSON.parse(savedCart).map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
            : [];
    });

    useEffect(() => {
        // Persist only IDs and quantities.
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(
                item => item.id === product.id
            );

            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, {
                id: product.id,
                quantity: 1
            }];
        });
    };

    const updateQuantity = (productId, change) => {
        setCart(currentCart =>
            currentCart
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart(currentCart =>
            currentCart.filter(item => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
