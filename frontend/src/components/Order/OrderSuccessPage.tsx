import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, deliveryDate } = location.state || {};

  return (
    <div className="order-success-page">
      <h1>Order Confirmation</h1>
      {orderNumber && deliveryDate ? (
        <div>
          <p>Thank you for your purchase!</p>
          <p>Your order number is: <strong>{orderNumber}</strong></p>
          <p>Estimated delivery date: <strong>{deliveryDate}</strong></p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <p>Order details are not available. Please check your order history.</p>
      )}
    </div>
  );
};

export default OrderSuccessPage;
