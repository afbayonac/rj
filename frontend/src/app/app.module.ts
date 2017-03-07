import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'


import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

//import { AUTH_PROVIDERS } from 'angular2-jwt'
import { AuthModule } from './auth/auth.module'
import { JwtService } from './jwt/jwt.service'
import { RemateService } from './remates/remate.service'
import { CanActivateJwtService } from './CanActivate/CanActibateJwt.service'
import { RemateListComponent } from './remates/remate-list/remate-list.component'

import { RematesModule } from './remates/remates.module'

@NgModule({
  imports: [
    RematesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    routableComponents,
  ],
  providers: [
    JwtService,
    CanActivateJwtService,
    RemateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
