import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

import { JwtService } from './jwt/jwt.service'


@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
