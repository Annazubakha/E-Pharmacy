import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCategoriesThunk,
  fetchOneProductThunk,
  fetchProductsThunk,
} from "./operation";
import { RootState } from "../store";

interface ProductReview {
  name: string;
  imgUrl: string;
  rating: string;
  comment: string;
  time: string;
}
export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  description?: object;
  reviews?: ProductReview[];
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  page: number;
  categories: Category[];
  totalPages: number;
  product: Product | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  page: 1,
  categories: [],
  totalPages: 0,
  product: null,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProductsThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ products: Product[]; totalPages: number }>
        ) => {
          state.products = action.payload.products;
          state.totalPages = action.payload.totalPages;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchCategoriesThunk.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchOneProductThunk.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchProductsThunk.pending,
          fetchCategoriesThunk.pending,
          fetchOneProductThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchProductsThunk.rejected,
          fetchCategoriesThunk.rejected,
          fetchOneProductThunk.rejected
        ),
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? null;
          state.isLoading = false;
        }
      );
  },
});

export const { setPage } = slice.actions;
export const productsReducer = slice.reducer;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;
export const selectPage = (state: RootState) => state.products.page;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
