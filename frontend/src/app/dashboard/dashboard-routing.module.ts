import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RemateListComponent } from '../remate/remate-list/remate-list.component'
import { DashboardComponent } from './dashboard.component'
import { CanActivateJwtService} from '../CanActivate/CanActibateJwt.service';

const routes : Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
export class DashboardRoutingModule {}

export const routableComponents = [
  RemateListComponent,
  DashboardComponent
]
