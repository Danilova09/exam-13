import { createAction, props } from '@ngrx/store';
import { Image, ImageData } from '../models/image.model';

export const createImageRequest = createAction('[Images] Create Request', props<{ imageData: ImageData }>());
export const createImageSuccess = createAction('[Images] Create Success', props<{ image: Image }>());
export const createImageFailure = createAction('[Images] Create Failure', props<{ error: string }>());

export const removeImageRequest = createAction('[Image] Remove Request', props<{ id: string }>());
export const removeImageSuccess = createAction('[Image] Remove Success');
export const removeImageFailure = createAction('[Image] Remove Failure', props<{ error: string }>());
