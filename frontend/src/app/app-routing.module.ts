import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CanActivateJwtService} from './CanActivate/CanActibateJwt.service';

const routes : Routes = [
  {path: "", pathMatch: "full", redirectTo: "/login"},
  {path: "login", component: LoginComponent },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   canActivate: [CanActivateJwtService]
  // }
]

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})

export class AppRoutingModule {}

export const routableComponents = [
  LoginComponent,
//  DashboardComponent
]
