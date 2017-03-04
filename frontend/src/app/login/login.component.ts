import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../jwt/jwt.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds :any ={} ;
  err = '';
  constructor( private router: Router, private jwtService:JwtService) { }

  ngOnInit() {
    this.jwtService.logout();
  }

  private login(){
    this.jwtService.login(this.creds.username, this.creds.password).
      subscribe(result => {
        if (result === true){
          this.router.navigate(['/dashboard']);
        }else{
          this.err = 'Username or password is incorrect';
        }
      })
  }

}
