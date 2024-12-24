import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CheckoutPage'
const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const { orderNumber, deliveryDate } = location.state || {};

  return (
    <motion.div
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{duration: 1, ease: "easeIn"}}className="order-success-page">
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <strong>{orderNumber}</strong></p>
      <p>Estimated delivery date: <strong>{deliveryDate}</strong></p>
      <button onClick={() => window.location.href = '/'}>Go back to Home</button>
    </motion.div>
  );
};

export default OrderSuccessPage;
