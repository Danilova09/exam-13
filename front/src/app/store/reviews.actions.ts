import { createAction, props } from '@ngrx/store';
import { Review, ReviewData } from '../models/review.model';

export const createReviewRequest = createAction('[Reviews] Create Request', props<{reviewData: ReviewData}>());
export const createReviewSuccess = createAction('[Reviews] Create Success', props<{review: Review}>());
export const createReviewFailure = createAction('[Reviews] Create Failure', props<{error: string}>());
