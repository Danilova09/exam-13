import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Place } from '../../models/place.model';
import { fetchPlaceById } from '../../store/places.actions';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit, OnDestroy {
  placeIdSub!: Subscription;
  placeSub!: Subscription;
  placeId!: string;
  place!: Place | null;
  env = environment;

  constructor(
    private placeService: PlacesService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
     this.placeSub = store.select(state => state.places.place).subscribe(place => {
      this.place = place;
      console.log(this.place);
    });
  }

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId !== null) {
      this.store.dispatch(fetchPlaceById({id: placeId}));
    }
  }

  ngOnDestroy(): void {
    this.placeIdSub.unsubscribe();
    this.placeSub.unsubscribe();
  }
}

