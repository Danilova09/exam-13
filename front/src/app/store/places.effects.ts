import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../services/places.service';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { catchError, mergeMap, of, tap } from 'rxjs';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchPlaceById,
  fetchPlaceByIdFailure,
  fetchPlaceByIdSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  removePlaceRequest,
  removePlaceSuccess
} from './places.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class PlacesEffects {

  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({
        error: 'Something went wrong!'
      })))
    ))
  ));

  createPlace = createEffect(() => this.actions.pipe(
    ofType(createPlaceRequest),
    mergeMap(({placeData}) => this.placesService.createPlace(placeData).pipe(
      map(() => createPlaceSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Place created');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createPlaceFailure({error: 'Wrong data'})))
    ))
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePlaceRequest),
    mergeMap(({id}) => this.placesService.removePlace(id).pipe(
      map(() => removePlaceSuccess()),
      tap(() => {
        this.store.dispatch(fetchPlacesRequest());
        this.helpers.openSnackbar('Deleted Successfully');
      })
    ))
  ));

  fetchPlaceById = createEffect(() => this.actions.pipe(
    ofType(fetchPlaceById),
    mergeMap(({id}) => this.placesService.getPlaceById(id).pipe(
      map((place) => fetchPlaceByIdSuccess({place})),
      catchError(() => of(fetchPlaceByIdFailure({error: 'Something went wrong'})))
    ))
  ));

}
