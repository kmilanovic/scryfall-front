import { Component, OnInit } from '@angular/core';
import {SetModel} from "../../../set/model/dto/set.model";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {Router} from "@angular/router";
import {MySetModule} from "../../my-set.module";
import {MySetModel} from "../../../set/model/dto/my-set.model";

@Component({
  selector: 'app-my-set-list',
  templateUrl: './my-set-list.component.html',
  styleUrls: ['./my-set-list.component.less']
})
export class MySetListComponent implements OnInit {
  showTable = false;
  setList!: MySetModel[];
  listOfCurrentPageData: readonly MySetModel[] = [];
  showTableLoading = false;
  constructor(public setProvider: SetProvider,
              public router: Router) { }

  ngOnInit(): void {
    this.getMySets();
  }

  onCurrentPageDataChange($event: readonly MySetModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  getMySets() {
    this.showTableLoading = true;
    this.setProvider.getMySets().subscribe((res: any) => {
      this.setList = res;
      this.showTable = true;
      this.showTableLoading = false;
    })
  }

  navigateToSetCardList(setCode: string) {
    this.router.navigate(['/set-list', setCode])
  }

}
