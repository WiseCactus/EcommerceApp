import { CartItem } from '../../../Types/CartItem';

export interface OrderTableProps {
  cart: Map<number, CartItem>;
  handleQuantityChange: (productId: number, newQuantity: number, isIncrement: boolean) => void;
  handleRemoveFromCart: (productId: number) => void;
}