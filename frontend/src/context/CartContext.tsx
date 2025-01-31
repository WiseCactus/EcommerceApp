import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../Types/Product';
import { CartItem } from '../Types/CartItem';

interface CartContextType {
  cart: Map<number, CartItem>;
  addToCart: (props: { product: Product; quantity: number; isIncrement: boolean }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  cartSize: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Map<number, CartItem>>(new Map());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartSize, setCartSize] = useState(0);

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
      }
      
      setCartSize(newCart.size);
      return newCart;
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      setCartSize(newCart.size);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart(new Map());
    setCartSize(0);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      toggleCart,
      closeCart,
      cartSize
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 