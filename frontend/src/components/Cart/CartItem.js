// CartItem.js
import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div className="cart-item">
    <h4>{item.product.name}</h4>
    <p>{item.product.price}</p>
    <input
      type="number"
      value={item.quantity}
      onChange={(e) => onUpdateQuantity(item.product.id, e.target.value)}
    />
    <button id="exit-button" onClick={() => onRemove(item.product.id)}>x</button>
  </div>
);

export default CartItem;
