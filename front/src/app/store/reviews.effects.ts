import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { createPlaceFailure, fetchPlaceById, fetchPlaceByIdSuccess } from './places.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { createReviewRequest, createReviewSuccess, removeReviewRequest, removeReviewSuccess } from './reviews.actions';

@Injectable()
export class ReviewsEffects {

  constructor(
    private actions: Actions,
    private reviewsService: ReviewsService,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewRequest),
    mergeMap(({reviewData}) => this.reviewsService.createReview(reviewData).pipe(
      map((review) => createReviewSuccess({review})),
      tap(({review}) => {
        this.store.dispatch(fetchPlaceById({id: review.place}));
        this.helpers.openSnackbar('Review created');
      }),
      catchError(() => of(createPlaceFailure({error: 'Wrong data'})))
    ))
  ));

  removeReview = createEffect(() => this.actions.pipe(
    ofType(removeReviewRequest),
    mergeMap(({deleteReviewData}) => this.reviewsService.removeReview(deleteReviewData).pipe(
      map((updatedPlace) => removeReviewSuccess({updatedPlace})),
      tap(({updatedPlace}) => {
        this.store.dispatch(fetchPlaceByIdSuccess({place: updatedPlace}));
        this.helpers.openSnackbar('Deleted Successfully');
      })
    ))
  ));
}
