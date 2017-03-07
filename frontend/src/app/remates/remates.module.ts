import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RematesRoutingModule, routableComponents } from './remates-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [routableComponents],
  imports: [
    CommonModule,
    RematesRoutingModule,
    FormsModule,
    ReactiveFormsModule ],
  exports: [],
  providers: []
})

export class RematesModule {}
