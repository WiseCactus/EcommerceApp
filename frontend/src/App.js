import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';
import CheckoutPage from './components/Checkout/CheckoutPage';
import Header from './components/Layout/Header';
import ProductList from './components/Product/ProductList';
import CartPanel from './components/Cart/CartPanel';
import useCart from './hooks/useCart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState({ name: '', category: '' });
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' });
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5246/api/product');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filter.name) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      if (sort.field === 'name') {
        return sort.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort.field === 'price') {
        return sort.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(filtered);
  }, [filter, sort, products]);

  const toggleCart = () => setIsCartOpen(prevState => !prevState);
  const closeCart = () => setIsCartOpen(false);

  const handleCategoryChange = (e) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: e.target.value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      name: e.target.value,
    }));
  };

  return (
    <div className="App">
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="filters">
                <select value={filter.category} onChange={handleCategoryChange}>
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={filter.name}
                  onChange={handleSearchChange}
                />
              </div>
              <ProductList
                products={filteredProducts}
                addToCart={addToCart}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
              />
            </>
          }
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      </Routes>
      {isCheckoutPage ? null : (
        <button className="cart-button" onClick={toggleCart}>
          🛒 Cart ({cart.length})
        </button>
      )}
      {isCartOpen && (
        <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
          <CartPanel
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            closeCart={closeCart}
          />
        </div>
      )}
    </div>
  );
}

export default App;
