import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { fetchPlacesRequest, removePlaceRequest } from '../../store/places.actions';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  loading: Observable<Boolean>;
  error: Observable<null | string>;
  user: Observable<User | null>;
  env = environment;


  constructor(private store: Store<AppState>,
  ) {
    this.places = store.select(state => state.places.places);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  delete(id: string) {
    this.store.dispatch(removePlaceRequest({id}));
  }
}
