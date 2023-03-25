import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzImageModule } from "ng-zorro-antd/image";

const COMPONENTS = [
  HeaderComponent,
  SideMenuComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    NzIconModule,
    NzGridModule,
    NzImageModule
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class AppSharedModule {
}
