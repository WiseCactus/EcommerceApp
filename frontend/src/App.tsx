import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import CheckoutPage from './components/Order/CheckoutPage';
import OrderSuccessPage from './components/Order/OrderSuccessPage';
import ProductList from './components/Product/ProductList';
import CartPanel from './components/Cart/CartPanel';
import useCart from './hooks/useCart';
import './App.css';
import { Product } from './Types/Product';
import {delistItem,fetchProducts} from './utils/api';

interface Filter {
  name: string;
  category: string;
}

interface Sort {
  field: 'name' | 'price';
  direction: 'asc' | 'desc';
}

const App: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const handleFetchingProducts = async () => {
        try {
          const products = await fetchProducts();
   
          setProducts(products.data);
        } catch (error) {
          console.error('Failed to load products:', error);
        }
      };
  
      handleFetchingProducts();
    }, []);
  
    

  const {
    cart,
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart,
    closeCart,
  } = useCart();

  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const updateQuantity = useCallback((productId: number, quantity: number,isIncrement:boolean) => {
    if (quantity ==0){
      removeFromCart(productId);
    }
    else{
    addToCart(products.find((product) => product.id === productId)!,quantity,isIncrement);
    }
  },[addToCart,removeFromCart,products]);


const handleDelistingProduct = useCallback(async (productId: number) => {
  try {
   
    await delistItem(productId).then(() => {
  

    setProducts((prevProducts) =>
      prevProducts.map((item: Product) =>
        item.id === productId ? { ...item, stockQuantity: 0 } : item
      )
    );
  });
    
  } catch (error) {
    console.error("Error delisting item:", error);
    alert("Failed to delist the product. Please try again.");
  }
},[delistItem]);

  return (
    <div className="App">
      <div className="logo">
        <h1>ShopIt</h1>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ProductList products={products} delistItem={handleDelistingProduct}  addToCart={addToCart}/>
          }
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>

      {isHomePage && (
        <button className="cart-button" onClick={toggleCart}>
          🛒 Cart ({cart.length})
        </button>
      )}

{isCartOpen && isHomePage &&  (
        <motion.div
          initial={{ x: '500px' }}
          animate={{ x: '0px' }}
          transition={{
            type: 'tween',
            duration: 0.3,
          }}
          className="cart-panel"
        >
          <CartPanel
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            closeCart={closeCart}
          />
        </motion.div>
      )}
    </div>
  );
};

export default App;
