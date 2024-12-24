

import { useState} from 'react';

import { Product } from '../Types/Product';
import {CartItem} from '../Types/CartItem';

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);  // Toggle the cart open/close
  };
  const addToCart = (product: Product, quantity: number, isIncrement: boolean = false) => {
    openCart();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        let newQuantity = isIncrement
          ? existingItem.quantity + quantity // Increment by the given amount
          : quantity; // Set to the exact quantity if not incrementing
  

        if (newQuantity > product.stockQuantity) {
          alert(`You can only add up to ${product.stockQuantity} units of ${product.name}.`);
          return prevCart;
        }
  
        // Update the cart with the new quantity
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
  
      // Add a new product with the exact or incremented quantity
      return [...prevCart, { product, quantity }];
    });
  };
  
  

 


 

  
  const removeFromCart = (productId: number) => {
  
    setCart((prevCart) => {

      const updatedCart = prevCart.filter((item) => item.product.id !== productId);

      return updatedCart;
    });
  };
  

  return { cart, isCartOpen, addToCart, removeFromCart, openCart, closeCart,clearCart,toggleCart  };
};

export default useCart;
