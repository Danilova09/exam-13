import { ImagesState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess,
  removeImageFailure,
  removeImageRequest,
  removeImageSuccess
} from './images.actions';

const initialState: ImagesState = {
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const imagesReducer = createReducer(
  initialState,
  on(createImageRequest, state => ({...state, createLoading: true})),
  on(createImageSuccess, state => ({...state, createLoading: false})),
  on(createImageFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),
  on(removeImageRequest, (state) => ({...state, deleteLoading: true})),
  on(removeImageSuccess, (state) => ({...state, deleteLoading: false})),
  on(removeImageFailure, state => ({...state, deleteLoading: false})),
);
