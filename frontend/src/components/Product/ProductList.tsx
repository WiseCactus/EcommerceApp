import React, { useState, useEffect,useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '../../Types/Product';
import {Filter} from '../../Types/Filter';
import './Product.css';
import { FilterComponent } from './Filter';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product, quantity: number, isIncrement: boolean) => void;
  delistItem:(productID:number) => void;

}


const ProductList: React.FC<ProductListProps> = ({ products,addToCart ,delistItem}) => {
  const [filter, setFilter] = useState<Filter>({ name: '', category: '' });
  const [sortType,setSortType] = useState<'name' | 'price'>('name');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'name' | 'price');
  };

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

    let filteredProducts = [...products]

    filteredProducts.sort((a,b) => {
      if (sortType === 'name') {
           return a.name.localeCompare(b.name)
      } 
      return a.price - b.price;
    });

    return [ 
      ...filteredProducts.filter((product) => product.stockQuantity > 0),
      ...filteredProducts.filter((product) => product.stockQuantity == 0),
    ]
  };


  const filteredProducts = useMemo(() => sortProducts(filterProducts(products)),[products,filter,sortType]);

  return (
    <div>
     <FilterComponent filter={filter} handleCategoryChange={handleCategoryChange} handleSearchChange = {handleSearchChange} sortType={sortType} handleSortChange={handleSortChange}/>
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
