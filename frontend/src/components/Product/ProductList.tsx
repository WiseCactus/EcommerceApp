import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Filter } from '../../Types/Filter';
import './Product.css';
import { FilterComponent } from './Filter';
import { useCart } from '../../context/CartContext';

interface ProductListProps {
  delistItem: (productID: number) => void;
}

type SortType = 'name' | 'price';

const ProductList: React.FC<ProductListProps> = ({ delistItem }) => {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState<Filter>({ name: '', category: '' });
  const [sortType, setSortType] = useState<SortType>('name');
  const { addToCart } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products
      .filter(product =>
        filter.name
          ? product.name.toLowerCase().includes(filter.name.toLowerCase())
          : true
      )
      .filter(product =>
        filter.category
          ? product.category.toLowerCase().includes(filter.category.toLowerCase())
          : true
      );

    const sorted = [...filtered].sort((a, b) => {
      return sortType === 'name' ? a.name.localeCompare(b.name) : a.price - b.price;
    });

    return [
      ...sorted.filter(product => product.stockQuantity > 0),
      ...sorted.filter(product => product.stockQuantity === 0),
    ];
  }, [products, filter, sortType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'name' | 'price');
  };

  return (
    <div>
      <div className="filter-container">
        <FilterComponent
          filter={filter}
          handleCategoryChange={handleCategoryChange}
          handleSearchChange={handleSearchChange}
          sortType={sortType}
          handleSortChange={handleSortChange}
        />
      </div>
      <motion.div
        className="product-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        {filteredAndSortedProducts.length === 0 ? (
          <p className="no-products-message">No products found matching your search.</p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard
              delistItem={delistItem}
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
