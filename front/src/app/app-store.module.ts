import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './store/users.reducer';
import { placesReducer } from './store/places.reducer';
import { reviewsReducer } from './store/reviews.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { PlacesEffects } from './store/places.effects';
import { imagesReducer } from './store/images.reducer';
import { ImagesEffects } from './store/images.effects';
import { ReviewsEffects } from './store/reviews.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  places: placesReducer,
  images: imagesReducer,
  reviews: reviewsReducer,
};

const effects = [
  UsersEffects,
  PlacesEffects,
  ImagesEffects,
  ReviewsEffects,
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {
}
