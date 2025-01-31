export interface CheckoutPageProps {
  cart: Map<number, CartItem>;
  updateQuantity: (props: { productId: number; quantity: number; isIncrement: boolean }) => void;
  removeFromCart: (productId: number) => void;
}

