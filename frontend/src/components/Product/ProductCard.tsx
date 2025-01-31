import React from 'react';
import { Product } from '../../Types/Product';
import './Product.css';

interface ProductCardProps {
  product: Product;
  delistItem: (id: number) => void;
  onAddToCart: (props: { product: Product; quantity: number; isIncrement: boolean }) => void;
}

const StockQuantityStatus: React.FC<{ product: Product, onAddToCart: (props:{product: Product, quantity: number,isIncrement:boolean}) => void }> = ({ product, onAddToCart }) => {
  if (product.stockQuantity <= 0) {
    return <div className="sold-out">Sold Out</div>;
  } else if (product.stockQuantity <= 5) {
    return (
      <button
        id="add-to-cart-button"
        onClick={() => onAddToCart({ product, quantity: 1, isIncrement: true })}
        className="limited-stock"
      >
        Only {product.stockQuantity} left
      </button>
    );
  } else {
    return (
      <button
        id="add-to-cart-button"
        onClick={() => onAddToCart({ product, quantity: 1, isIncrement: true })}
      >
        Add to Cart
      </button>
    );
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, delistItem, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ product, quantity: 1, isIncrement: true });
  };

  return (
    <div
      key={product.id}
      className={`product-list-item ${product.stockQuantity === 0 ? 'disabled' : ''}`}
      style={{ cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer' }}
    >
      <img
        src={`/product-images/${product.name.replace(/\s+/g, '-')}.jpg`}
        alt={product.name}
        className="product-image"
      />
    
      <div className="product-details">
        <div className="product-card">
          <h3>{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p>${product.price.toFixed(2)}</p>

          <StockQuantityStatus product={product} onAddToCart={onAddToCart} />
    
          {product.stockQuantity > 0 && (
            <button id="remove-item" onClick={() => delistItem(product.id)}>
              Delist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};