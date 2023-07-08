import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import {RegisterComponent} from "./components/register/register.component";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";

const COMPONENTS = [
  RegisterComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    NzImageModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule
  ]
})
export class RegisterModule { }
