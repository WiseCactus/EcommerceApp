import { useState, useCallback } from 'react'
import { Product } from '../Types/Product'
import { CartItem } from '../Types/CartItem'

const useCart = () => {

  const [cart, setCart] = useState<Map<number,CartItem>>(new Map());
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback(({ product, quantity, isIncrement }: { 
    product: Product; 
    quantity: number; 
    isIncrement: boolean 
  }) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const existingItem = newCart.get(product.id);

      if (existingItem) {
        const newQuantity = isIncrement 
          ? existingItem.quantity + quantity
          : quantity;

        if (newQuantity > product.stockQuantity) {
          alert(`Sorry, only ${product.stockQuantity} items available in stock.`);
          return prevCart;
        }

        newCart.set(product.id, {
          product,
          quantity: newQuantity
        });
      } else {
        if (quantity > product.stockQuantity) {
          alert(`Sorry, only ${product.stockQuantity} items available in stock.`);
          return prevCart;
        }
        newCart.set(product.id, { product, quantity });
        setIsCartOpen(true); // Open cart panel when adding new item
      }

      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart(new Map());
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    toggleCart,
    closeCart
  };
};

export default useCart;
