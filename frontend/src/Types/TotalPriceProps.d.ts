export interface TotalPriceProps {
    cart: Map<number, CartItem>;
    calculateTotalPrice: number;
    handlePlaceOrder: () => void;
  }