import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

import { AuthModule } from './auth/auth.module'
import { JwtService } from './jwt/jwt.service'

import { RematesModule } from './remates/remates.module'

@NgModule({
  imports: [
    MaterialModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
