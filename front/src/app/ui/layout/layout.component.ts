import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { logoutUserRequest } from '../../store/users.actions';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
  env = env;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: Observable<null | User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }

}
