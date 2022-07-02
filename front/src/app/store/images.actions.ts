import { createAction, props } from '@ngrx/store';
import { DeleteImageData, Image, ImageData } from '../models/image.model';
import { Place } from '../models/place.model';

export const createImageRequest = createAction('[Images] Create Request', props<{ imageData: ImageData }>());
export const createImageSuccess = createAction('[Images] Create Success', props<{ image: Image }>());
export const createImageFailure = createAction('[Images] Create Failure', props<{ error: string }>());

export const removeImageRequest = createAction('[Image] Remove Request', props<{ deleteImageData: DeleteImageData }>());
export const removeImageSuccess = createAction('[Image] Remove Success', props<{ updatedPlace: Place }>());
export const removeImageFailure = createAction('[Image] Remove Failure', props<{ error: string }>());
