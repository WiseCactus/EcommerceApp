import { useState } from 'react';

// Singleton state for sharing across components
const cartState = {
  cart: [],
  setCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
};

function useCart() {
  // Initialize state hooks only once
  const [cart, setCart] = useState(cartState.cart);
  const [isCartOpen, setIsCartOpen] = useState(cartState.isCartOpen);

  // Assign the state and updater functions to the singleton
  cartState.cart = cart;
  cartState.setCart = setCart;
  cartState.isCartOpen = isCartOpen;
  cartState.setIsCartOpen = setIsCartOpen;

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => {
    console.log('closeCart called');
    setIsCartOpen(false);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: parseInt(quantity, 10) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  return {
    cart,
    isCartOpen,
    toggleCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}

export default useCart;
