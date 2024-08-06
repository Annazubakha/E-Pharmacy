import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../api/api";
import { Store } from "./slice";

export const fetchStoresNearThunk = createAsyncThunk<
  Store[],
  void,
  { rejectValue: string }
>("get stores near", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/stores/nearest");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
