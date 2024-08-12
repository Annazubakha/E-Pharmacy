import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchRefreshThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations";
import { RootState } from "../store";

interface User {
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface AuthState {
  user: User;
  isLoading: boolean;
  error: string | null | undefined | unknown;
  isLoggedIn: boolean;
  token: string | null;
  isRefresh: boolean;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    phone: null,
  },
  token: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  isRefresh: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(
        fetchRefreshThunk.fulfilled,
        (state, { payload: { token, user } }) => {
          state.token = token;
          state.user = user;
          state.isLoggedIn = true;
        }
      )
      .addCase(loginThunk.fulfilled, (state, { payload: { token, user } }) => {
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          fetchRefreshThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          logoutThunk.fulfilled,
          fetchRefreshThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          logoutThunk.rejected,
          fetchRefreshThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const authReducer = slice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefresh = (state: RootState) => state.auth.isRefresh;
