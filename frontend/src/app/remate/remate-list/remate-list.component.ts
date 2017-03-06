import { Component, OnInit } from '@angular/core';
import { RemateJSON } from '../remate'
import { RemateService } from '../remate.service'

@Component({
  selector : 'remate-list',
  templateUrl: './remate-list.component.html',
  styleUrls: ['./remate-list.component.css']
})

export class RemateListComponent implements OnInit {

  remateNumber = 0;
  page = 1;
  count = 10;
  public response : Array<Object>;
  valid = false;

  constructor(private remateService:RemateService) {}

  ngOnInit () {
    this.getPage(this.page, this.count);
  }

  getPage(page:number, count:number) {
    this.remateService.getList(this.page, this.count )
     .subscribe( result => {
       this.remateNumber = JSON.parse(result._body).total;
       this.response = JSON.parse(result._body).results;
       console.log(JSON.parse(result._body).results);
     })
  }

  private next() {
    this.page = this.page + 1
    this.getPage(this.page, this.count);
    }

  private previous() {
    this.page = this.page - 1
    this.getPage(this.page, this.count);
    }

  private last() {
    this.page = this.remateNumber / this.count
    this.getPage(this.page, this.count);
    }

  private first() {
    this.page = 1
    this.getPage(this.page, this.count);
    }
}
