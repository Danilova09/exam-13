import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { AppStoreModule } from './app-store.module';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './auth.interceptor';
import { HasRolesDirective } from './directives/has-roles.directive';
import { UserTypeDirective } from './directives/user-type.directive';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlaceComponent } from './pages/place/place.component';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile'
      })
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HasRolesDirective,
    UserTypeDirective,
    LoginComponent,
    RegisterComponent,
    CenteredCardComponent,
    FileInputComponent,
    EditProfileComponent,
    ProfileComponent,
    PlacesComponent,
    AddPlaceComponent,
    PlaceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule,
    AppStoreModule,
    MatSelectModule,
    SocialLoginModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
