import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-list-item">
          <img
            src={`/items/${product.name}.jpg`} // Adjust the path if necessary
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <ProductCard
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
