import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { JwtService } from '../jwt/jwt.service'


@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private router: Router, private jwtService:JwtService){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.jwtService.autenticated();
  }
}
