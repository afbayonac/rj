//TODO Añadir un "_" como prefijo a los nombres de los metodos privados
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtService } from '../jwt/jwt.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtService:JwtService
  ) { }

  ngOnInit() {

    this.loginForm =  this.fb.group({
      username : ["", Validators.required],
      password : ["", Validators.required]
    });

    this.jwtService.logout();
  }

  private login(){

    if(this.loginForm.valid)
    this.jwtService.login(this.loginForm.value.username, this.loginForm.value.password).
      subscribe(result => {
        if (result === true){
          this.router.navigate(['/dashboard']);
        }else{
          this.error = 'Username or password is incorrect';
        }
      })
  }

}
