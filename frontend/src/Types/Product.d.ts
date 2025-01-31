export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: string;
}

export type ProductDto = Product;
  