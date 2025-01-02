import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CheckoutPage.css';

interface LocationState {
  orderNumber: string | null;
  deliveryDate: string | null;
}

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber, deliveryDate } = (location.state as LocationState) || { orderNumber: null, deliveryDate: null };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="order-success-page"
    >
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <strong>{orderNumber ?? 'N/A'}</strong></p>
      <p>Estimated delivery date: <strong>{deliveryDate ?? 'N/A'}</strong></p>
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </motion.div>
  );
};

export default OrderSuccessPage;
