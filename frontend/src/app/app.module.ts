import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

//import { AUTH_PROVIDERS } from 'angular2-jwt'
import { AuthModule } from './auth/auth.module'
import { JwtService } from './jwt/jwt.service'
import { CanActivateJwtService } from './CanActivate/CanActibateJwt.service'

@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // en lugar de AUTH_PROVIDERS
    AuthModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    JwtService,
    CanActivateJwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
