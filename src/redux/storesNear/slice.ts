import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStoresNearThunk } from "./operation";
import { RootState } from "../store";

export interface Store {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
}

interface StoresState {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoresState = {
  stores: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "storesNear",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStoresNearThunk.fulfilled,
        (state, action: PayloadAction<Store[]>) => {
          state.stores = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchStoresNearThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStoresNearThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? null;
          state.isLoading = false;
        }
      );
  },
});

export const storesNearReducer = slice.reducer;

export const selectStores = (state: RootState) => state.storesNear.stores;
export const selectIsLoading = (state: RootState) => state.storesNear.isLoading;
export const selectError = (state: RootState) => state.storesNear.error;
