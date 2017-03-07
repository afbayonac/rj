import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardRoutingModule, routableComponents } from './dashboard-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [routableComponents],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule ],
  exports: [],
  providers: []
})

export class DashboardModule {}
