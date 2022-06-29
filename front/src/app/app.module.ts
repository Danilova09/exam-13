import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';
import { HasRolesDirective } from './directives/has-roles.directive';
import { UserTypeDirective } from './directives/user-type.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AppStoreModule } from './app-store.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './auth.interceptor';
import { FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../environments/environment';

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
    HasRolesDirective,
    UserTypeDirective,
  ],
  imports: [
    AppStoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    FlexModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
