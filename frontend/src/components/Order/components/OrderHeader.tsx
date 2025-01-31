import React from "react";

export const OrderHeader: React.FC = () => {
    return (
      <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
            <th>Country</th>
          </tr>
      </thead>
    );
  }