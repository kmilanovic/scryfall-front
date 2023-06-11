import { Component, OnInit } from '@angular/core';
import { CardModel } from "../../model/dto/card.model";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {SetModel} from "../../../set/model/dto/set.model";
import {SearchCardCommand} from "../../model/command/search-card.command";
import {ModalSelectComponent} from "../modal-select/modal-select.component";
import {MySetModel} from "../../../set/model/dto/my-set.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit {

  showTable = false;
  cardList!: CardModel[];
  listOfCurrentPageData: readonly CardModel[] = [];
  showTableLoading = false;
  term: string = '';
  setList!: SetModel[];
  mySetList!: MySetModel[];
  nzModalRef!: NzModalRef;
  selectedSetName!: string;

  constructor(public cardProvider: CardProvider,
              public modal: NzModalService,
              public setProvider: SetProvider) {}

  ngOnInit(): void {
  }

  searchCards() {
    const searchCardCommand: SearchCardCommand = new SearchCardCommand();
    searchCardCommand.term = this.term;
    this.showTableLoading = true;

    this.cardProvider.searchCards(searchCardCommand).subscribe({
      next: (res: any) => {
        this.cardList = res.data;
        this.showTable = true;
        this.showTableLoading = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  public openModal(cardId: string): void {
    this.setProvider.getMySets().subscribe((sets: MySetModel[]) => {
      if (sets && sets.length > 0) {
        this.mySetList = sets;
        this.nzModalRef = this.modal.create({
          nzTitle: 'Sets',
          nzContent: ModalSelectComponent,
          nzComponentParams: {
            mySetList: this.mySetList,
            cardId: cardId
          },
          nzFooter: null
        });
      }
    });
  }
}
