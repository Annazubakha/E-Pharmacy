import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance, setToken } from "../../api/api";
import { cartItem, orderItem } from "./slice";
import { RootState } from "../store";
interface ThunkError {
  message: string;
}

export const fetchCartThunk = createAsyncThunk<
  cartItem[],
  void,
  {
    rejectValue: ThunkError;
  }
>("get cart", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.auth;
  try {
    if (token) {
      setToken(token);
      const { data } = await instance.get("/cart");
      return data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: (error as Error).message });
  }
});

export const fetchUpdateItemThunk = createAsyncThunk<
  cartItem[],
  { productId: string; quantity: number },
  {
    rejectValue: ThunkError;
  }
>("add item to cart", async ({ productId, quantity }, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.auth;
  try {
    if (token) {
      setToken(token);
      const { data } = await instance.put("/cart/update", {
        productId,
        quantity,
      });

      return data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: (error as Error).message });
  }
});

export const fetchPostOrderThunk = createAsyncThunk<
  orderItem,
  {
    products: { productId: string; quantity: number }[];
    email: string;
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
    totalAmount: number;
  },
  {
    rejectValue: ThunkError;
  }
>("post order", async (credentials, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.auth;
  try {
    if (token) {
      setToken(token);
      const { data } = await instance.post("/cart/checkout", credentials);

      return data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: (error as Error).message });
  }
});
