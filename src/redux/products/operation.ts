import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../api/api";
import { Category, Product } from "./slice";

interface FetchProductsParams {
  category?: string;
  name?: string;
  page?: number;
}

export const fetchProductsThunk = createAsyncThunk<
  { products: Product[]; totalPages: number },
  FetchProductsParams,
  { rejectValue: string }
>(
  "get products",
  async (
    { category = "", page = 1, name = "" }: FetchProductsParams,
    thunkAPI
  ) => {
    try {
      const { data } = await instance.get("/products", {
        params: { category, page, name },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCategoriesThunk = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("get categories", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/categories");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const fetchOneProductThunk = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("get one product", async (id, thunkAPI) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
