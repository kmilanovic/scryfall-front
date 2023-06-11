import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from "../../../card/model/dto/card.model";
import {forkJoin, switchMap} from "rxjs";
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

       console.log(res)
      },
      error: (error) => {
        console.error('Error retrieving cards:', error);
      }
    });
  }
}
