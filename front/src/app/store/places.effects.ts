import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../services/places.service';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { catchError, mergeMap, of } from 'rxjs';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class PlacesEffects {

  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private helpers: HelpersService,
    private store: Store<AppState>,
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

}
