import React from 'react';
import { Product } from '../../Types/Product';

type CartItemProps = {
  item: {
    product: Product;
    quantity: number;
  };
  onRemove: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, updateQuantity }) => (
  <div className="cart-item">
    <h4>{item.product.name}</h4>
    <p>${item.product.price.toFixed(2)}</p>
    <input
      type="number"
      value={item.quantity}
      onChange={e => updateQuantity(item.product.id, Number(e.target.value))}
    />
    <button id="exit-button" onClick={() => onRemove(item.product.id)} aria-label="Remove item">x</button>
  </div>
);

export default CartItem;
