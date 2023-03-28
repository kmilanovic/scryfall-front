import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from "@ngxs/store";
import { SearchState } from "./card-list/search-state";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([SearchState])
  ]
})
export class StateModule {
}
