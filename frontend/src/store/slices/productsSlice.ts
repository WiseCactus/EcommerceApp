import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../Types/Product';
import { getAllProducts, purchaseProducts } from '../../utils/api';
import { ProductPurchaseRequest } from '../../Types/ProductPurchaseRequest';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getAllProducts();
    console.log('Fetched products:', response);
    return response;
  }
);

export const purchaseProductsThunk = createAsyncThunk(
  'products/purchaseProducts',
  async (purchaseRequests: ProductPurchaseRequest[]) => {
    const response = await purchaseProducts(purchaseRequests);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProductStock: (state, action: PayloadAction<{ id: number; newQuantity: number }>) => {
      const product = state.items.find(p => p.id === action.payload.id);
      if (product) {
        product.stockQuantity = action.payload.newQuantity;
        product.status = action.payload.newQuantity > 0 ? 'In Stock' : 'Out of Stock';
      }
    },
    delistProduct: (state, action: PayloadAction<number>) => {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.stockQuantity = 0;
        product.status = 'Out of Stock';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(purchaseProductsThunk.fulfilled, (state, action) => {
        if (action.payload.updatedProducts) {
          state.items = state.items.map(product => {
            const updatedProduct = action.payload.updatedProducts?.find((p: Product) => p.id === product.id);
            return updatedProduct || product;
          });
        }
      });
  },
});

export const { updateProductStock, delistProduct } = productsSlice.actions;
export default productsSlice.reducer;