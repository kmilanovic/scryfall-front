import { Component, OnInit } from '@angular/core';
import {SetModel} from "../../model/dto/set.model";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {Router} from "@angular/router";
import {SetService} from "../../set.service";


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
              public router: Router,
              public setService: SetService) { }

  ngOnInit(): void {
    this.getSets();
  }

  getSets() {
    this.showTableLoading = true;
    this.setProvider.getSets().subscribe((res: any) => {
      this.setList = res.data;
      this.showTableLoading = false;
      this.showTable = true;
    })
  }

  onCurrentPageDataChange($event: readonly SetModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  navigateToSetCardList(set: SetModel) {
    this.setService.setSelectedSet(set);
    this.router.navigate(['/set-list', set.code])
  }
}
