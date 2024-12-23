import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPanel.css';

function CartPanel({ cart, updateQuantity, removeFromCart, closeCart }) {
  const navigate = useNavigate();

  const changeToCheckoutPage = () => {
    closeCart();  // Close the cart when navigating
    navigate('/checkout');
  };

  return (
    <div className="cart-panel">
      {/* Cart Header */}
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <button
          className="cart-close-button"
          onClick={closeCart}  // Use closeCart prop to close the cart
        >
          ×
        </button>
      </div>

      {cart.length > 0 ? (
        <>
          <ul className="cart-item-list">
            {cart.map((item) => (
              <li className="cart-item" key={item.product.id}>
                <span>
                  {item.product.name} - ${item.product.price.toFixed(2)}
                </span>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, e.target.value)}
                >
                  {[...Array(11).keys()].map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <button id="checkout-button" onClick={changeToCheckoutPage}>
            Checkout
          </button>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPanel;
