import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";
import { FormsModule } from "@angular/forms";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { NzImageModule } from "ng-zorro-antd/image";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTagModule } from "ng-zorro-antd/tag";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    CardListComponent,
    CardDetailsComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
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
    NzModalModule
  ]
})
export class CardModule {
}
