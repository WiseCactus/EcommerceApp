import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPanel.css';
import { CartItem as CartItemType } from '../../Types/CartItem';
import QuantitySelector from '../Shared/QuantitySelector';
import { useCart } from '../../context/CartContext';

interface CartPanelProps {
  updateQuantity: (props: { productId: number, quantity: number, isIncrement: boolean }) => void;
  removeFromCart: (productId: number) => void;
  closeCart: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ updateQuantity, removeFromCart, closeCart }) => {
  const { cart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = useCallback(
    (productId: number, newQuantity: number) => {
      const cartItem = cart.get(productId);
      if (!cartItem) {
        console.error('Product not found in the cart!');
        return;
      }

      if (newQuantity > cartItem.product.stockQuantity) {
        setModalMessage(`You can only select up to ${cartItem.product.stockQuantity} units of ${cartItem.product.name}.`);
        setIsModalOpen(true);
        return;
      }

      updateQuantity({
        productId,
        quantity: newQuantity,
        isIncrement: false
      });
    },
    [cart, updateQuantity]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  const renderCartItem = (item: CartItemType) => (
    <li className="cart-item" key={item.product.id}>
      <div className="cart-item-details">
        <span>{item.product.name} - ${item.product.price.toFixed(2)}</span>
        <QuantitySelector
          value={item.quantity}
          max={item.product.stockQuantity}
          onChange={newValue => handleQuantityChange(item.product.id, newValue)}
        />
      </div>
      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item.product.id)}
        aria-label={`Remove ${item.product.name} from cart`}
      >
        ×
      </button>
    </li>
  );

  return (
    <div className="cart-panel">
      <header className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <button
          className="cart-close-button"
          onClick={closeCart}
          aria-label="Close cart panel"
        >
          ×
        </button>
      </header>
      <div className="cart-content">
        {cart.size > 0 ? (
          <>
            <ul className="cart-item-list">
              {Array.from(cart.values()).map(renderCartItem)}
            </ul>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </>
        ) : (
          <p className="cart-empty">Your cart is empty.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
