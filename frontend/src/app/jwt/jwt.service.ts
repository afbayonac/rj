import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

declare const localStorage: any;

@Injectable()
export class  JwtService  {
  jwtHelper =new JwtHelper();

  constructor(private http: Http) {  }

  login(username: string, password: string): Observable<boolean> {

    let url = 'http://localhost:5000/login' ;
    let creds = `username=${username}&password=${password}`
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers:headers })

    return this.http.post( url, creds, options )
      .map((response: Response) => this.saveJwt(response.json()));
  }

  public saveJwt(jwt){

    if(jwt){
      localStorage.setItem('id_token', jwt.token)
      return true;
    }
    return false;
  }

  public logout():void{
    localStorage.removeItem('id_token');
  }

  public autenticated(){
    return tokenNotExpired();
  }

}
