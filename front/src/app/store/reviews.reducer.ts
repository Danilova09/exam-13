import { ReviewsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { createReviewFailure, createReviewRequest, createReviewSuccess } from './reviews.actions';

const initialState: ReviewsState = {
  createLoading: false,
  createError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(createReviewRequest, state => ({...state, createLoading: true})),
  on(createReviewSuccess, state => ({...state, createLoading: false})),
  on(createReviewFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),
);
