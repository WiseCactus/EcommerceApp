import React, { useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckoutPage from './components/Order/CheckoutPage';
import OrderSuccessPage from './components/Order/OrderSuccessPage';
import ProductList from './components/Product/ProductList';
import CartPanel from './components/Cart/CartPanel';
import { useCart } from './context/CartContext';
import './App.css';
import { delistItem } from './utils/api';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useProducts } from './hooks/useProducts';
import { useDispatch } from 'react-redux';
import { delistProduct, fetchProducts } from './store/slices/productsSlice';
import { CartProvider } from './context/CartContext';
import { AppDispatch } from './store/store';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useProducts();
  const location = useLocation();

  const {
    cart,
    removeFromCart,
    isCartOpen,
    toggleCart,
    closeCart,
    addToCart,
    cartSize
  } = useCart();

  const isHomePage = location.pathname === '/';

  const updateQuantity = useCallback(
    (props: { productId: number; quantity: number; isIncrement: boolean }) => {
      const { productId, quantity, isIncrement } = props;
      if (quantity === 0) {
        removeFromCart(productId);
      } else {
        const product = products.find((product) => product.id === productId);

        if (product) {
          addToCart({ product, quantity, isIncrement });
        } else {
          console.error(`Product with ID ${productId} not found.`);
        }
      }
    },
    [addToCart, removeFromCart, products]
  );

  const handleDelistingProduct = useCallback(
    async (productId: number) => {
      try {
        dispatch(delistProduct(productId));

        if (cart.has(productId)) {
          removeFromCart(productId);
        }

        const result = await delistItem(productId);
        if (!result.success) {
          await dispatch(fetchProducts());
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error delisting item:", error);
        alert(error instanceof Error ? error.message : "Failed to delist the product. Please try again.");
      }
    },
    [dispatch, cart, removeFromCart]
  );

  return (
    <div className="App">
      <div className="logo">
        <h1>ShopIt</h1>
      </div>
      <Routes>
        <Route
          path="/"
          element={<ProductList delistItem={handleDelistingProduct} />}
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>

      {isHomePage && (
        <button
          className="cart-button"
          onClick={toggleCart}
          aria-label={`Shopping cart with ${cartSize} items`}
        >
          🛒 Cart ({cartSize})
        </button>
      )}

      {isCartOpen && isHomePage && (
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
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            closeCart={closeCart}
          />
        </motion.div>
      )}

      
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Provider>
  );
};

export default App;
