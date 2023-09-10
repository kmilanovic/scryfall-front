import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from "./components/login/login.component";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ReactiveFormsModule } from "@angular/forms";
import { NzImageModule } from "ng-zorro-antd/image";
import {NzMessageModule} from "ng-zorro-antd/message";

const COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzImageModule,
    NzMessageModule
  ]
})
export class LoginModule {
}
