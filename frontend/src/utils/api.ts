import { ProductPurchaseRequest } from '../Types/ProductPurchaseRequest';

const API_BASE_URL = 'http://localhost:5246/api';

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const purchaseProducts = async (purchaseRequests: ProductPurchaseRequest[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseRequests)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error purchasing products:', error);
    throw error;
  }
};

export const delistItem = async (productId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/delist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error delisting product:', error);
    throw error;
  }
};