import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RemateListComponent } from './remate-list/remate-list.component'
import { RemateComponent } from './remate/remate.component'
import { RematesComponent } from './remates.component'
import { JwtGuard } from './JwtGuard.service';

const routes : Routes = [
  {
    path: 'remates',
    component: RematesComponent,
    canActivate: [ JwtGuard],
    children: [
      { path: '', component: RemateListComponent },
      { path: ':id', component: RemateComponent },
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
  RematesComponent,
  RemateComponent
]
