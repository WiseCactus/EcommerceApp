import React, { useState,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPanel.css';
import { CartItem as CartItemType } from '../../Types/CartItem';
import QuantitySelector from '../Shared/QuantitySelector';

interface CartPanelProps {
  cart: CartItemType[];
  updateQuantity: (productId: number, quantity: number, isIncrement: boolean) => void;
  removeFromCart: (productId: number) => void;
  closeCart: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ cart, updateQuantity, removeFromCart, closeCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const cartItem = cart.find(item => item.product.id === productId);
    if (!cartItem) {
      console.error('Product not found in the cart!');
      return;
    }

    if (newQuantity > cartItem.product.stockQuantity) {
      setModalMessage(`You can only select up to ${cartItem.product.stockQuantity} units of ${cartItem.product.name}.`);
      setIsModalOpen(true);
      return;
    }

    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    updateQuantity(productId, newQuantity, false);
  };

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
        {cart.length > 0 ? (
          <>
            <ul className="cart-item-list">
              {cart.map(renderCartItem)}
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
