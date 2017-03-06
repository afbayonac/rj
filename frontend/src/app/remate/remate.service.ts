import { Injectable } from '@angular/core'
import { RemateJSON } from './remate'
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt'

import 'rxjs/add/operator/map';

@Injectable()
export class RemateService {

  constructor(private authHttp:AuthHttp) {}

  getList(page:number = 1, count:number = 10):Observable<any> {
    return this.authHttp.get(`http://localhost:5000/remate/list?page=${page}&count=${count}`)
      .map((response) => response )
  }
}
