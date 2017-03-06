import { Component } from '@angular/core';
import { JwtService } from './jwt/jwt.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'rj';
  constructor (private jwtService : JwtService) {}
}
