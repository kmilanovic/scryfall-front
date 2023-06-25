import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MySetListComponent} from "./components/my-set-list/my-set-list.component";
import {MySetCardListComponent} from "./components/my-set-card-list/my-set-card-list.component";

const routes: Routes = [
  {path: '', component: MySetListComponent},
  {path: ':id', component: MySetCardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySetRoutingModule { }
