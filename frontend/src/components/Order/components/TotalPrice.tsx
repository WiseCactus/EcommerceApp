import React from "react";
import { TotalPriceProps } from "../../../Types/TotalPriceProps";
export const TotalPrice: React.FC<TotalPriceProps> = ({cart, calculateTotalPrice,handlePlaceOrder }) => { 
    return (
      <>
        {cart.size > 0 && (
          <div className="total-section">
            <div className="total-price">Total: ${calculateTotalPrice.toFixed(2)}</div>
            <button className="checkout-button" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        )}
      </>
    );
  }
  