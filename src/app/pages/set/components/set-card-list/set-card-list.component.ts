import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from "../../../card/model/dto/card.model";
import {forkJoin, switchMap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SetCodeCommand} from "../../model/command/set-code.command";
import {CardProvider} from "../../../../app-core/providers/card.provider";
import {SetService} from "../../set.service";
import {SetModel} from "../../model/dto/set.model";

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
  selectedSet!: SetModel | null
  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider,
              private setService: SetService) { }

  ngOnInit(): void {
    this.searchCardsBySet();
  }

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  searchCardsBySet() {
    this.showTableLoading = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const setCodeCommand: SetCodeCommand = new SetCodeCommand();
        setCodeCommand.code = params.get('code');

        return this.cardProvider.searchCardsBySetCode(setCodeCommand);
      })
    ).subscribe({
      next: (res: any) => {
       this.setCardList = res.data;
       this.selectedSet = this.setService.getSelectedSet();
        console.log(this.selectedSet)
       this.showTable = true;
       this.showTableLoading = false;

      },
      error: (error) => {
        console.error('Error retrieving cards:', error);
      }
    });
  }
}
