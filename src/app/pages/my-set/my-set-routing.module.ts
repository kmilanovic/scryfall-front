import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MySetListComponent} from "./components/my-set-list/my-set-list.component";

const routes: Routes = [
  {path: '', component: MySetListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySetRoutingModule { }
