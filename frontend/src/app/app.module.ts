import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

//import { AUTH_PROVIDERS } from 'angular2-jwt'
import { AuthModule } from './auth/auth.module'
import { JwtService } from './jwt/jwt.service'
import { RemateService } from './remate/remate.service'
import { CanActivateJwtService } from './CanActivate/CanActibateJwt.service'
import { RemateListComponent } from './remate/remate-list/remate-list.component'

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    RemateListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    // en lugar de AUTH_PROVIDERS
    AuthModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    JwtService,
    CanActivateJwtService,
    RemateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
