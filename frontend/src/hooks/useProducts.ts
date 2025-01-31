import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productsSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../store/store';
import { Product } from '../Types/Product';
export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products) as {
    items: Product[];
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('Products in hook:', products);
  return { products, loading, error };
}; 