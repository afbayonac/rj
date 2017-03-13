import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'
import { RemateJSON } from '../remate'
import { RemateService } from '../remate.service'

@Component({
  selector : 'remate',
  templateUrl: './remate.component.html',
  styleUrls: ['./remate.component.scss']
})

export class RemateComponent implements OnInit {
  private remate: RemateJSON;

  constructor (
    private route:ActivatedRoute,
    private remateService:RemateService
  ){}

  ngOnInit () {
    this.route.params.subscribe(params => {
      this.remateService.getById(params['id']).subscribe(remate => this.remate = remate)
    })

  }

}
