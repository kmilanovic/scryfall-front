import { Component, OnInit } from '@angular/core';
import {CardModel} from "../../../card/model/dto/card.model";
import {SetModel} from "../../model/dto/set.model";
import {NzModalRef} from "ng-zorro-antd/modal";
import {forkJoin, switchMap} from "rxjs";
import {ByIdCommand} from "../../../card/model/command/by-id.command";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SetCodeCommand} from "../../model/command/set-code.command";
import {CardProvider} from "../../../../app-core/providers/card.provider";

@Component({
  selector: 'app-set-card-list',
  templateUrl: './set-card-list.component.html',
  styleUrls: ['./set-card-list.component.less']
})
export class SetCardListComponent implements OnInit {
  showTable = false;
  setCardList!: CardModel[];
  listOfCurrentPageData: readonly CardModel[] = [];
  showTableLoading = false;
  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider) { }

  ngOnInit(): void {
    this.getCardsBySet();
  }

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  getCardsBySet() {
    this.showTableLoading = false;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const setCodeCommand: SetCodeCommand = new SetCodeCommand();
        setCodeCommand.code = params.get('code');

        return this.cardProvider.getCardsBySet(setCodeCommand);
      })
    ).subscribe({
      next: (res: any) => {
       this.setCardList = res.data;
       this.showTable = true;
       this.showTableLoading = false;
      },
      error: (error) => {
        console.error('Error retrieving cards:', error);
      }
    });
  }
}
