import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Fetch Success', props<{places: Place[]}>());
export const fetchPlacesFailure = createAction('[Places] Fetch Failure', props<{error: string}>());

export const createPlaceRequest = createAction('[Places] Create Request', props<{placeData: PlaceData}>());
export const createPlaceSuccess = createAction('[Places] Create Success');
export const createPlaceFailure = createAction('[Places] Create Failure', props<{error: string}>());

export const fetchPlaceById = createAction('[Posts] FetchIng Request', props<{id: string}>());
export const fetchPlaceByIdSuccess = createAction('[Posts] FetchIng Success', props<{place: Place | null}>());
export const fetchPlaceByIdFailure = createAction('[Posts] FetchIng Failure', props<{error: string}>());

export const removePlaceRequest = createAction('[Place] Remove Request', props<{id: string}>());
export const removePlaceSuccess = createAction('[Place] Remove Success');
