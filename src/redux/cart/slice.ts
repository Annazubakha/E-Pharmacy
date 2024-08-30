import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCartThunk,
  fetchPostOrderThunk,
  fetchUpdateItemThunk,
} from "./operations";
import { RootState } from "../store";

export interface cartItem {
  productId: string;
  name: string;
  suppliers: string;
  price: number;
  photo: string;
  quantity: number;
}

export interface orderItem {
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
  products: orderProduct[];
  totalAmount: number;
}
interface orderProduct {
  productId: string;
  quantity: number;
}
export interface CartState {
  cart: cartItem[];
  order: orderItem | null;
  isLoading: boolean;
  error: string | null | undefined | unknown;
}

const initialState: CartState = {
  cart: [],
  order: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCartThunk.fulfilled,
        (state, action: PayloadAction<cartItem[]>) => {
          state.cart = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchUpdateItemThunk.fulfilled,
        (state, action: PayloadAction<cartItem[]>) => {
          state.cart = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchPostOrderThunk.fulfilled,
        (state, action: PayloadAction<orderItem>) => {
          state.order = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCartThunk.pending,
          fetchUpdateItemThunk.pending,
          fetchPostOrderThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCartThunk.rejected,
          fetchUpdateItemThunk.rejected,
          fetchPostOrderThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const cartReducer = slice.reducer;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectIsLoading = (state: RootState) => state.cart.isLoading;
export const selectError = (state: RootState) => state.cart.error;
