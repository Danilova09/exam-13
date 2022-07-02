import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PlacesState = {
  places: Place[],
  fetchLoading: Boolean,
  fetchError: null | string,

}

export type AppState = {
  users: UsersState,
  places: PlacesState,
}
