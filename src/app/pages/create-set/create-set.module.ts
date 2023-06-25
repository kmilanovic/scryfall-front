import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSetRoutingModule } from './create-set-routing.module';
import { CreateSetComponent } from './components/create-set/create-set.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzCardModule} from "ng-zorro-antd/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzMessageModule} from "ng-zorro-antd/message";


@NgModule({
  declarations: [
    CreateSetComponent
  ],
  imports: [
    CommonModule,
    CreateSetRoutingModule,
    NzPageHeaderModule,
    NzFormModule,
    NzPopconfirmModule,
    NzCardModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    FormsModule,
    NzMessageModule
  ]
})
export class CreateSetModule { }
