import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SetListComponent} from "./components/set-list/set-list.component";
import {SetCardListComponent} from "./components/set-card-list/set-card-list.component";
import {CardDetailsComponent} from "../card/components/card-details/card-details.component";

const routes: Routes = [
  {path: '', component: SetListComponent},
  {path: ':code', component: SetCardListComponent},
  {path: ':code/:id', component: CardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetRoutingModule { }
