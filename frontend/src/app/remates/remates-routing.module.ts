import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RemateListComponent } from './remate-list/remate-list.component'
import { RematesComponent } from './remates.component'
import { CanActivateJwtService} from '../CanActivate/CanActibateJwt.service';

const routes : Routes = [
  {
    path: 'dashboard',
    component: RematesComponent,
    canActivate: [ CanActivateJwtService],
    children: [
      { path: '', component: RemateListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RematesRoutingModule {}

export const routableComponents = [
  RemateListComponent,
  RematesComponent
]
