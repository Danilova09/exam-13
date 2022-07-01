import { createAction, props } from '@ngrx/store';
import { EditUserData, LoginError, LoginUserData, RegisterError, RegisterUserData, User } from '../models/user.model';
import { SocialUser } from 'angularx-social-login';

export const registerUserRequest = createAction('[Users] Register User Request', props<{ userData: RegisterUserData }>());
export const registerUserSuccess = createAction('[Users] Register User Success', props<{ user: User }>());
export const registerUserFailure = createAction('[Users] Register User Failure', props<{ error: null | RegisterError }>());

export const loginUserRequest = createAction('[Users] Login Request', props<{ userData: LoginUserData }>());
export const loginUserSuccess = createAction('[Users] Login Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Users] Login Failure', props<{ error: null | LoginError }>());

export const editUserRequest = createAction('[Users] Edit Request', props<{userData: EditUserData}>());
export const editUserSuccess = createAction('[Users] Edit Success', props<{user: User}>());
export const editUserFailure = createAction('[Users] Edit Failure', props<{error: null | string}>());

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');

export const loginWithFbRequest = createAction('[Users] Login Facebook Request', props<{ userData: SocialUser }>());

