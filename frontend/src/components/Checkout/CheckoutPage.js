import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

function CheckoutPage({ cart, setCart }) {
  const navigate = useNavigate();

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  // Handle individual product purchase
  const purchaseProduct = (productId) => {
    // Send the request to reduce stock on the server
    axios.post(`http://localhost:5246/api/product/purchase/${productId}`)
      .then(response => {
        console.log(response.data.message);  // Success message
        // After successful purchase, update the cart or remove the product
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
      })
      .catch(error => {
        console.error('Error purchasing product:', error.response?.data || error.message);
        alert('Error purchasing product: ' + (error.response?.data || error.message));
      });
  };

  return (
    <div>
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      <div className="checkout-page">
        <div className="checkout-header">
          <h1>Order Summary</h1>
        </div>
        {cart.length > 0 ? (
          <>
            <table className="order-summary">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id}>
                    <td>
                      <img
                        src={`/items/${item.product.name}.jpg`}
                        alt={item.product.name}
                        className="product-image"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>${item.product.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="purchase-button"
                        onClick={() => purchaseProduct(item.product.id)}
                      >
                        Confirm Purchase
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-section">
              <div className="total-price">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
              <button className="checkout-button">Place Order</button>
            </div>
          </>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
