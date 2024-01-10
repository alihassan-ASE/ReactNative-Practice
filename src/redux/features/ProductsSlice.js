import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// All Products
export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async thunkApi => {
    try {
      const response = await API.get('products');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);


const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { products, isSuccess } = state.products;
      products.push(action.payload);
    },
  },
  extraReducers: builder => {
    // getAllProducts cases
    builder.addCase(getAllProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addProduct } = ProductsSlice.actions;

export default ProductsSlice.reducer;
