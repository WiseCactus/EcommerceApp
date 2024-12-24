import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';
import { CartItem } from '../../Types/CartItem';
import useCart from '../../hooks/useCart';
import QuantitySelector from '../Shared/QuantitySelector';
import { purchaseProducts } from '../../utils/api';

interface CheckoutPageProps {
cart: CartItem[];
updateQuantity: (productId: number, quantity: number, isIncrement: boolean) => void;
removeFromCart: (productId: number) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderConfirmation, setOrderConfirmation] = useState({
  orderNumber: null as number | null,
  deliveryDate: null as string | null,
  });

  const calculateTotalPrice = () => {
  if (cart.length==0){
  return 0;
  }
  else{
  return cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
  }
  };

  const handleQuantityChange = (productId: number, newQuantity: number, isIncrement: boolean) => {

  updateQuantity(productId, newQuantity, isIncrement);
  };

  const generateDeliveryDate = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 14);

  const formattedDeliveryDate = deliveryDate.toLocaleDateString();
  return formattedDeliveryDate;
  }
  const handleRemoveFromCart = (productId: number) => {
  removeFromCart(productId);
  };

  const handlePurchase = async () => {

  const productsToPurchase = cart.map((item) => ({
  id: item.product.id,
  quantity: item.quantity,
  }));

  try {

  purchaseProducts(productsToPurchase);

  const orderNumber = Math.floor(Math.random() * 1000000);
  const formattedDeliveryDate = generateDeliveryDate();

  setOrderConfirmation({ orderNumber, deliveryDate: formattedDeliveryDate });
  clearCart();

  navigate('/order-success', {
  state: { orderNumber, deliveryDate: formattedDeliveryDate },
  });

  } catch (error) {
  if (axios.isAxiosError(error)) {
  console.error('Axios error:', error);
  alert('Error purchasing products: ' + (error.response?.data || error.message));
  } else {
  console.error('Unexpected error:', error);

  }
  }
  };

  const renderCartItem = (item: CartItem) => (
  <tr key={item.product.id}>
    <td>
      <img src={`/product-images/${item.product.name}.jpg`} alt={item.product.name} className="product-image" />
    </td>
    <td>{item.product.name}</td>
    <td>${item.product.price.toFixed(2)}</td>
    <td>


      <QuantitySelector value={item.quantity} max={item.product.stockQuantity} onChange={(newValue)=>
        handleQuantityChange(item.product.id, newValue, false)}
        />

    </td>
    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
    <td>
      <button className="delete-button" onClick={()=> handleRemoveFromCart(item.product.id)}
        >
        X
      </button>
    </td>
  </tr>
  );

  return (
  <div className="checkout-page-wrapper">
    <button className="back-button" onClick={()=> navigate('/')}>←</button>

    <div className="checkout-page">
      <h1>Order Summary</h1>

      {cart.length > 0 ? (
      <table className="order-summary">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(renderCartItem)}
        </tbody>
      </table>
      ) : (
      <p className="empty-cart-message">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
      <div className="total-section">
        <div className="total-price">
          <strong>Total: ${calculateTotalPrice().toFixed(2)}</strong>
        </div>
        <button className="checkout-button" onClick={handlePurchase}>
          Place Order
        </button>
      </div>
      )}
    </div>
  </div>
  );
  };

  export default CheckoutPage;