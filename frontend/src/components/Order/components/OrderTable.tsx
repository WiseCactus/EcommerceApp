import React from 'react';
import QuantitySelector from '../../Shared/QuantitySelector';
import { CountrySelect } from '../components/CountrySelect';
import { CartItem } from '../../../Types/CartItem';
import { OrderTableProps } from '../../../Types/OrderTable';

export const OrderTable: React.FC<OrderTableProps> = ({ cart, handleQuantityChange, handleRemoveFromCart }) => {
    return (
      <>
        {Array.from(cart.values()).map((item: CartItem) => (
          <tr key={item.product.id}>
            <td><img src={`/product-images/${item.product.name.replace(/\s+/g, '-')}.jpg`} alt={item.product.name} className="product-image" /></td>
            <td>{item.product.name}</td>
            <td>${item.product.price.toFixed(2)}</td>
            <td>
              <QuantitySelector
                value={item.quantity}
                max={item.product.stockQuantity}
                onChange={newValue => handleQuantityChange(item.product.id, newValue, false)}
              />
            </td>
            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
            <td><button className="delete-button" onClick={() => handleRemoveFromCart(item.product.id)}>Remove</button></td>
            <CountrySelect/>
          </tr>
        ))}
         
      </>
    );
  };
  