import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetRoutingModule } from './set-routing.module';
import { SetComponent } from './components/set/set.component';


@NgModule({
  declarations: [
    SetComponent
  ],
  imports: [
    CommonModule,
    SetRoutingModule
  ]
})
export class SetModule { }
