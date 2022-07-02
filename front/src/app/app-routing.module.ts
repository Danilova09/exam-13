import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'places',
    component: PlacesComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'add-place',
    component: AddPlaceComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
