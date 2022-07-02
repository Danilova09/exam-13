import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../services/images.service';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { catchError, mergeMap, of, tap } from 'rxjs';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess,
  removeImageRequest,
  removeImageSuccess
} from './images.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fetchPlaceById, fetchPlaceByIdSuccess } from './places.actions';

@Injectable()
export class ImagesEffects {

  constructor(
    private actions: Actions,
    private imagesService: ImagesService,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  createImage = createEffect(() => this.actions.pipe(
    ofType(createImageRequest),
    mergeMap(({imageData}) => this.imagesService.createImage(imageData).pipe(
      map((image) => createImageSuccess({image})),
      tap(({image}) => {
        this.store.dispatch(fetchPlaceById({id: image.place}))
        this.helpers.openSnackbar('Image created');
      }),
      catchError(() => of(createImageFailure({error: 'Wrong data'})))
    ))
  ));

  removeImage = createEffect(() => this.actions.pipe(
    ofType(removeImageRequest),
    mergeMap(({deleteImageData}) => this.imagesService.removeImage(deleteImageData).pipe(
      map((updatedPlace) => removeImageSuccess({updatedPlace})),
      tap(({updatedPlace}) => {
        this.store.dispatch(fetchPlaceByIdSuccess({place: updatedPlace}));
        this.helpers.openSnackbar('Deleted Successfully');
      })
    ))
  ));
}
