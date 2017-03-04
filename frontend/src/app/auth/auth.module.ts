import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

function authHttpServiceFactory(http: Http, options: RequestOptions){
  return new AuthHttp(new AuthConfig({
       globalHeaders: [{'Content-Type':'application/json'}],
   }
  ), http, options)
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  declarations: []
})

export class AuthModule { }
