import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userData!: null | User;
  user: Observable<User | null>;
  userSub!: Subscription;
  env = environment;

  constructor(
    private store: Store<AppState>,
  ) {
    this.user = store.select((state) => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe((user) => {
      if (user) {
        this.userData = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
