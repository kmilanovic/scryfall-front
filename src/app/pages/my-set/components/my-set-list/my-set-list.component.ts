import { Component, OnInit } from '@angular/core';
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {Router} from "@angular/router";
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
    const userId = localStorage.getItem('userId');
    this.setProvider.getMySets(Number(userId)).subscribe((res: any) => {
      this.setList = res;
      this.showTable = true;
      this.showTableLoading = false;
    })
  }

  navigateToSetCardList(setId: number) {
    this.router.navigate(['/my-set-list', setId])
  }

}
