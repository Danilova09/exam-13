import { ReviewsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  removeReviewFailure,
  removeReviewRequest,
  removeReviewSuccess
} from './reviews.actions';

const initialState: ReviewsState = {
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(createReviewRequest, state => ({...state, createLoading: true})),
  on(createReviewSuccess, state => ({...state, createLoading: false})),
  on(createReviewFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),
  on(removeReviewRequest, (state) => ({...state, deleteLoading: true})),
  on(removeReviewSuccess, (state) => ({...state, deleteLoading: false})),
  on(removeReviewFailure, state => ({...state, deleteLoading: false})),
);
