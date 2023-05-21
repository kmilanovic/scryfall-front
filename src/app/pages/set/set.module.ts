import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetRoutingModule } from './set-routing.module';
import { SetListComponent } from './components/set-list/set-list.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule} from "@angular/forms";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTagModule} from "ng-zorro-antd/tag";
import { SetCardListComponent } from './components/set-card-list/set-card-list.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";


@NgModule({
  declarations: [
    SetListComponent,
    SetCardListComponent
  ],
  imports: [
    CommonModule,
    SetRoutingModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    FormsModule,
    NzPaginationModule,
    NzButtonModule,
    NzSpinModule,
    NzImageModule,
    NzCardModule,
    NzGridModule,
    NzMenuModule,
    NzDropDownModule,
    NzTagModule,
    NzBreadCrumbModule,
  ]
})
export class SetModule { }
