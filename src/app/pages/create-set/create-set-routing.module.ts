import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateSetComponent} from "./components/create-set/create-set.component";

const routes: Routes = [
  {path: '', component: CreateSetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSetRoutingModule { }
