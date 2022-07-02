import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { PlacesService } from '../../services/places.service';
import { createPlaceRequest } from '../../store/places.actions';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.sass']
})
export class AddPlaceComponent {
  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  error!: Observable<null | RegisterError>;
  isAgreeControl = new FormControl(true);
  userId!: string | undefined;
  isAgree = false;

  constructor(
    private store: Store<AppState>,
    private placesService: PlacesService,
  ) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const placeData = this.form.value;
      placeData.isAgree = this.isAgreeControl.value;
      placeData.owner = this.userId;
      this.store.dispatch(createPlaceRequest({placeData}));
    }
  }
}
