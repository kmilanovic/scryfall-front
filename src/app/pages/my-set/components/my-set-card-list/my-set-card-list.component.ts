import { Component, OnInit } from '@angular/core';
import {CardModel} from "../../../card/model/dto/card.model";
import {SetModel} from "../../../set/model/dto/set.model";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CardProvider} from "../../../../app-core/providers/card.provider";
import {SetService} from "../../../set/set.service";
import {ByIdCommand} from "../../../card/model/command/by-id.command";
import {switchMap} from "rxjs";
import {CardDbModel} from "../../../card/model/dto/card-db.model";

@Component({
  selector: 'app-my-set-card-list',
  templateUrl: './my-set-card-list.component.html',
  styleUrls: ['./my-set-card-list.component.less']
})
export class MySetCardListComponent implements OnInit {
  showTable = false;
  setCardList!: CardDbModel[];
  listOfCurrentPageData: readonly CardDbModel[] = [];
  showTableLoading = false;
  selectedSet!: SetModel | null
  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider,
              private setService: SetService) { }

  ngOnInit(): void {
    this.getCardsBySetId();
  }

  onCurrentPageDataChange($event: readonly CardDbModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  getCardsBySetId() {
    this.showTableLoading = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const command: ByIdCommand = new ByIdCommand();
        command.id = params.get('id');

        return this.cardProvider.getCardsBySetId(command);
      })
    ).subscribe( {
      next: (res: any) => {
        this.setCardList = res;
        console.log(this.setCardList)
        this.selectedSet = this.setService.getSelectedSet();
        this.showTable = true;
        this.showTableLoading = false;
      },
      error: (error) => {
        console.error('Error retrieving cards:', error);
      }
    })
  }

}
