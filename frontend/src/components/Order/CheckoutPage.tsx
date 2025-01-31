import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { CartItem } from '../../Types/CartItem';
import { CheckoutPageProps } from '../../Types/CheckoutPageProps';
import { TotalPrice } from './components/TotalPrice';
import { purchaseProducts } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { updateProductStock } from '../../store/slices/productsSlice';
import { OrderHeader } from './components/OrderHeader';
import { OrderTable } from './components/OrderTable';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateRandomOrderNumberAndDeliveryDate = (): [string, Date] => {
    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 1);
    return [orderNumber, deliveryDate];
  };

  const calculateTotalPrice = useMemo((): number => {
    return Array.from(cart.values()).reduce(
      (total: number, item: CartItem) => total + item.quantity * item.product.price,
      0
    );
  }, [cart]);

  const handleQuantityChange = useCallback(
    (productId: number, newQuantity: number, isIncrement: boolean) => {
      updateQuantity({ productId, quantity: newQuantity, isIncrement });
    },
    [updateQuantity]
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => removeFromCart(productId),
    [removeFromCart]
  );

  const handlePlaceOrder = async () => {
    try {
      const purchaseRequests = Array.from(cart.values()).map(item => ({
        id: item.product.id,
        quantity: item.quantity,
      }));

      const result = await purchaseProducts(purchaseRequests);

      if (result.success) {
        purchaseRequests.forEach(request => {
          dispatch(updateProductStock({ id: request.id, newQuantity: 0 }));
        });

        cart.clear();

        // Generate random order number and delivery date
        const [orderNumber, deliveryDate] = generateRandomOrderNumberAndDeliveryDate();

        // Navigate to the order confirmation page with order details
        navigate('/order-success', { state: { orderNumber, deliveryDate: deliveryDate.toDateString() } });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <div className="checkout-page-wrapper">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <div className="checkout-page">
        <h1>Order Summary</h1>
        {cart.size > 0 ? (
          <table className="order-summary">
            <OrderHeader />
            <OrderTable
              cart={cart}
              handleQuantityChange={handleQuantityChange}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <TotalPrice
          cart={cart}
          handlePlaceOrder={handlePlaceOrder}
          calculateTotalPrice={calculateTotalPrice}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
