import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../api/api";
import { Review } from "./slice";

export const fetchReviewsThunk = createAsyncThunk<
  Review[],
  void,
  { rejectValue: string }
>("get reviews", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/customer-reviews");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
