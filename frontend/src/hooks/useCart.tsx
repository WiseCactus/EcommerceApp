import { useCallback, useState } from 'react'
import { Product } from '../Types/Product'
import { CartItem } from '../Types/CartItem'

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = useCallback(() => {
    setCart([])
    }, [setCart]
  );

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = useCallback(
    (product: Product, quantity: number, isIncrement: boolean = false) => {
      openCart();
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product.id === product.id);

        if (existingItem) {
          let newQuantity = isIncrement
            ? existingItem.quantity + quantity
            : quantity;

          if (newQuantity > product.stockQuantity) {
            alert(`You can only add up to ${product.stockQuantity} units of ${product.name}.`);
            return prevCart;
          }

          return prevCart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: newQuantity } : item
          )
        }

        return [...prevCart, { product, quantity }];
      })
    }, [openCart, setCart] 
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.product.id !== productId);
      return updatedCart;
      })
    }, [setCart]);

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    clearCart,
    toggleCart,
  }
};

export default useCart;
