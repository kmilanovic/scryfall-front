import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySetListComponent } from './components/my-set-list/my-set-list.component';
import {MySetRoutingModule} from "./my-set-routing.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTransitionPatchModule} from "ng-zorro-antd/core/transition-patch/transition-patch.module";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {FormsModule} from "@angular/forms";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { MySetCardListComponent } from './components/my-set-card-list/my-set-card-list.component';



@NgModule({
  declarations: [
    MySetListComponent,
    MySetCardListComponent
  ],
  imports: [
    CommonModule,
    MySetRoutingModule,
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
export class MySetModule { }
