import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {
  SocialLoginModule,
  FacebookLoginProvider,
  SocialAuthServiceConfig
} from 'angularx-social-login';
// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
// Services
import { SharedService } from './services/shared.service';
import { AuthorizationHeaderInterceptor, ErrorInterceptor } from './interceptors';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SharedModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-top-right',
      maxOpened: 1,
      autoDismiss: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookId),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
