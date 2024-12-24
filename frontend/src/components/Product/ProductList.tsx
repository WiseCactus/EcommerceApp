import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '../../Types/Product';
import './Product.css';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product, quantity: number, isIncrement: boolean) => void;
  delistItem:(productID:number) => void;

}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart ,delistItem}) => {
  const [filter, setFilter] = useState({ name: '', category: '' });
  const [sortKey, setSortKey] = useState<'name' | 'price'>('name');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  
  
  useEffect(() => {
    const filterAndSortProducts = () => {
      let filtered = [...products];

      if (filter.name) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(filter.name.toLowerCase())
        );
      }

      if (filter.category) {
        filtered = filtered.filter((product) =>
          product.category.toLowerCase().includes(filter.category.toLowerCase())
        );
      }

      filtered.sort((a, b) => {
        if (sortKey === 'name') {
          return a.name.localeCompare(b.name);
        }
        return a.price - b.price;
      });

      return [
        ...filtered.filter((product) => product.stockQuantity > 0),
        ...filtered.filter((product) => product.stockQuantity === 0),
      ];
    };

    setFilteredProducts(filterAndSortProducts());
  }, [products, filter, sortKey]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, category: e.target.value });
  };

  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as 'name' | 'price');
  };

  return (
    <div>
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
        <select value={sortKey} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      <motion.div
        className="product-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        {filteredProducts.length === 0 ? (
          <p className="no-products-message">No products found matching your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-list-item ${product.stockQuantity === 0 ? 'disabled' : ''}`}
              style={{ cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer' }}
            >
              <img
                src={`/product-images/${product.name}.jpg`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <ProductCard
                delistItem={delistItem}
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
          
                />
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
