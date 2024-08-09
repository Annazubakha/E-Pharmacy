import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviewsThunk } from "./operation";
import { RootState } from "../store";

export interface Review {
  _id: string;
  name: string;
  testimonial: string;
  imageUrl: string;
}

interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReviewsThunk.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.reviews = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchReviewsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? null;
          state.isLoading = false;
        }
      );
  },
});

export const reviewsReducer = slice.reducer;

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectIsLoadingReviews = (state: RootState) =>
  state.reviews.isLoading;
export const selectError = (state: RootState) => state.reviews.error;
