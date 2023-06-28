import { Component, OnInit } from '@angular/core';
import { CardModel } from "../../model/dto/card.model";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {SearchCardCommand} from "../../model/command/search-card.command";
import {ModalSelectComponent} from "../modal-select/modal-select.component";
import {MySetModel} from "../../../set/model/dto/my-set.model";
import {ActivatedRoute, Router} from "@angular/router";

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
  mySetList!: MySetModel[];
  nzModalRef!: NzModalRef;

  constructor(public cardProvider: CardProvider,
              public modal: NzModalService,
              public setProvider: SetProvider,
              public router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.retrieveSearchParams();
  }


  retrieveSearchParams() {
    this.route.queryParams.subscribe(params => {
      this.term = params['term'] || '';
      if (this.term) {
        this.searchCards();
      }
    });
  }

  searchCards() {
    const searchCardCommand: SearchCardCommand = new SearchCardCommand();
    searchCardCommand.term = this.term;
    this.showTableLoading = true;

    this.router.navigate([], {queryParams: {term: this.term}})

    this.cardProvider.searchCards(searchCardCommand).subscribe({
      next: (res: any) => {
        this.cardList = res.data;
        this.showTableLoading = false;
        this.showTable = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  public openModal(cardId: string, cardName: string, imageUriNormal: string): void {
    const userId = localStorage.getItem('userId');
    this.setProvider.getMySets(Number(userId)).subscribe((sets: MySetModel[]) => {
      this.mySetList = sets || [];
      this.nzModalRef = this.modal.create({
        nzTitle: 'Sets',
        nzContent: ModalSelectComponent,
        nzComponentParams: {
          mySetList: this.mySetList,
          cardId: cardId,
          cardName: cardName,
          imageUriNormal: imageUriNormal
        },
        nzFooter: null
      });
    });
  }
}
