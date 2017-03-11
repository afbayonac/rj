import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms'

import { AuthHttp } from 'angular2-jwt';

import { RemateListComponent } from './remate-list/remate-list.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './remates.component.html',
  styleUrls: ['./remates.component.css']
})
export class RematesComponent implements OnInit {
  public mineForm: FormGroup;

  constructor(private authHttp: AuthHttp, private fb: FormBuilder) { }

  private dateInitValidator(c: FormControl){
    if( c.value === ''){
      return true;
    }
  }

  ngOnInit() {
    this.mineForm = this.fb.group({
      dateInit : ["", Validators.pattern(/20[0-1][0-9]-[0-1][0-2]-[0-3][0-9]/)]
    });
  }

  mine(e){
    if(this.mineForm.valid)
      this.authHttp.post(
      `http://localhost:5000/mine`,
      `dateInit=${this.mineForm.value.dateInit}`)
        .subscribe( res => console.log( JSON.stringify(res)) );
  }

}
