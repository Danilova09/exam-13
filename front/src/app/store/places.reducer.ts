import { PlacesState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess, fetchPlaceById, fetchPlaceByIdFailure, fetchPlaceByIdSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess, removePlaceRequest, removePlaceSuccess
} from './places.actions';

const initialState: PlacesState = {
  place: null,
  places: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createPlaceRequest, state => ({...state, createLoading: true})),
  on(createPlaceSuccess, state => ({...state, createLoading: false})),
  on(createPlaceFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),
  on(removePlaceRequest, (state) => ({...state, fetchLoading: true})),
  on(removePlaceSuccess, state => ({...state, fetchLoading: false})),
  on(fetchPlaceById, state => ({...state, fetchLoading: true})),
  on(fetchPlaceByIdSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
  on(fetchPlaceByIdFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
);
