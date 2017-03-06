import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


// TODO investigar porque se rombre en en primer compose up sin exportar
export function authHttpServiceFactory(http: Http, options: RequestOptions){
  return new AuthHttp(new AuthConfig({
      globalHeaders: [{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Request-Headers' : 'Authorization'
      }]
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
  ]
})

export class AuthModule { }
