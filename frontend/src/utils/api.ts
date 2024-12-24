
import axios from 'axios';
import { Product } from '../Types/Product';
export const delistItem = async (productId: number) => {
  const itemDelistResponse =  await axios.post('http://localhost:5246/api/product/delist', productId , {
    headers: { 'Content-Type': 'application/json' }},);

  return itemDelistResponse;
};

export const fetchProducts = async () => { 
    const fetchResponse = await axios.get('http://localhost:5246/api/product');
    return fetchResponse;
}

export const purchaseProducts =  async (productsToPurchase: { id: any; quantity: number; }[]) => { 

    const purchaseResponse = await axios.post('http://localhost:5246/api/product/purchase', productsToPurchase, {
          headers: { 'Content-Type': 'application/json' },
        });

      return purchaseResponse;

    };