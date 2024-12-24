import React, { useState, useEffect } from 'react';
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
  const [filter] = useState<Filter>({ name: '', category: '' });
  const [sort] = useState<Sort>({ field: 'name', direction: 'asc' });

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

  const updateQuantity = (productId: number, quantity: number,isIncrement:boolean) => {
    if (quantity ==0){
      removeFromCart(productId);
    }
    else{
    addToCart(
      products.find((product) => product.id === productId)!,quantity,isIncrement
    );
  }
  };

  

const handleDelistingProduct = async (productId: number) => {
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
};



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

  
  const filterProducts = (products: Product[]): Product[] => {
    return products
      .filter((product) =>
        filter.name
          ? product.name.toLowerCase().includes(filter.name.toLowerCase())
          : true
      )
      .filter((product) =>
        filter.category
          ? product.category.toLowerCase().includes(filter.category.toLowerCase())
          : true
      );
  };

  
  const sortProducts = (products: Product[]): Product[] => {
    return [...products].sort((a, b) => {
      if (sort.field === 'name') {
        return sort.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort.field === 'price') {
        return sort.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  };

 
  const displayedProducts = sortProducts(filterProducts(products));

  return (
    <div className="App">
      <div className="logo">
        <h1>ShopIt</h1>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ProductList delistItem={handleDelistingProduct} products={displayedProducts} addToCart={addToCart}/>
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
