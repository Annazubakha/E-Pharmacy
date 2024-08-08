import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../api/api";
import { Store } from "../storesNear/slice";

export const fetchStoresThunk = createAsyncThunk<
  Store[],
  void,
  { rejectValue: string }
>("get stores", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/stores");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
