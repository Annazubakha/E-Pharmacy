import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStoresThunk } from "./operation";
import { RootState } from "../store";
import { Store, StoresState } from "../storesNear/slice";

const initialState: StoresState = {
  stores: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStoresThunk.fulfilled,
        (state, action: PayloadAction<Store[]>) => {
          state.stores = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchStoresThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStoresThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? null;
          state.isLoading = false;
        }
      );
  },
});

export const storesReducer = slice.reducer;

export const selectStores = (state: RootState) => state.stores.stores;
export const selectIsLoading = (state: RootState) => state.stores.isLoading;
export const selectError = (state: RootState) => state.stores.error;
