import { Component, OnInit } from '@angular/core';
import {SetModel} from "../../model/dto/set.model";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.less']
})
export class SetListComponent implements OnInit {
  showTable = false;
  setList!: SetModel[];
  listOfCurrentPageData: readonly SetModel[] = [];
  showTableLoading = false;

  constructor(public setProvider: SetProvider,
              public router: Router) { }

  ngOnInit(): void {
    this.getSets();
  }

  onCurrentPageDataChange($event: readonly SetModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  getSets() {
    this.showTableLoading = true;
    this.setProvider.getSets().subscribe((res: any) => {
      this.setList = res.data;
      this.showTable = true;
      this.showTableLoading = false;
    })
  }

  navigateToSetCardList(setCode: string) {
    this.router.navigate(['/set-list', setCode])
  }
}
