import React from 'react';
import { Product } from '../../Types/Product';
import './Product.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number,isIncrement:boolean) => void;
  delistItem: (productID:number ) => void
  
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart,delistItem}) => {

  const handleAddToCart = () => {
    onAddToCart(product, 1,true); // Always add 1 more item to the cart
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p>${product.price.toFixed(2)}</p>

      
      {product.stockQuantity <= 0 ? (
        <div className="sold-out">Sold Out</div>
      ) : product.stockQuantity <= 5 ? (
        
        <button
        id="add-to-cart-button"
          onClick={handleAddToCart}
          className="limited-stock"
        >
          Only {product.stockQuantity} left
        </button>
     
      ) : (
        <button id="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      )}

      {product.stockQuantity>0 ? (<button id="remove-item" onClick={() => delistItem(product.id)}>Delist</button>
) : null}
    </div>

  );
};
