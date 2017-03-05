import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  body:any ={} ;

  constructor(private authHttp: AuthHttp) { }

  ngOnInit() {
  }
 
  mine(){
    this.authHttp.post(`http://localhost:5000/mine`,`dateInit=${this.body.dateInit}`).subscribe(
      res => console.log( JSON.stringify(res))
    )
  }

}
