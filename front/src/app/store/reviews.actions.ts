import { createAction, props } from '@ngrx/store';
import { DeleteReviewData, Review, ReviewData } from '../models/review.model';
import { Place } from '../models/place.model';

export const createReviewRequest = createAction('[Reviews] Create Request', props<{reviewData: ReviewData}>());
export const createReviewSuccess = createAction('[Reviews] Create Success', props<{review: Review}>());
export const createReviewFailure = createAction('[Reviews] Create Failure', props<{error: string}>());

export const removeReviewRequest = createAction('[Review] Remove Request', props<{ deleteReviewData: DeleteReviewData }>());
export const removeReviewSuccess = createAction('[Review] Remove Success', props<{ updatedPlace: Place }>());
export const removeReviewFailure = createAction('[Review] Remove Failure', props<{ error: string }>());
