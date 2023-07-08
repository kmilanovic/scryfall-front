import { Component, OnInit } from '@angular/core';
import { CardModel } from "../../model/dto/card.model";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { SetProvider } from "../../../../app-core/providers/set.provider";
import { SearchCardCommand } from "../../model/command/search-card.command";
import { ModalSelectComponent } from "../modal-select/modal-select.component";
import { MySetModel } from "../../../set/model/dto/my-set.model";
import { ActivatedRoute, Router } from "@angular/router";
import {CardRequestCommand} from "../../model/command/card-request.command";
import {ByIdCommand} from "../../model/command/by-id.command";

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
  multiverse: string = '';
  catalog: string = '';
  cardId: string = '';
  mySetList!: MySetModel[];
  nzModalRef!: NzModalRef;
  showButtons = false; // Variable to toggle the visibility of the buttons

  constructor(
    public cardProvider: CardProvider,
    public modal: NzModalService,
    public setProvider: SetProvider,
    public router: Router,
    private route: ActivatedRoute
  ) {}

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

    this.router.navigate([], { queryParams: { term: this.term } });

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

  getRandomCard() {
    this.showTableLoading = true;
    this.cardProvider.getRandomCard().subscribe({
      next: (res: any) => {
        this.cardList = res;
        this.showTableLoading = false;
        this.showTable = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getCardByMultiverse() {
    const command: CardRequestCommand = new CardRequestCommand();
    command.multiverseId = this.multiverse;
    this.showTableLoading = true;
    this.cardProvider.getCardByMultiverse(command).subscribe({
      next: (res: any) => {
        this.cardList = res;
        this.showTableLoading = false;
        this.showTable = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getCardByCatalog() {
    const command: CardRequestCommand = new CardRequestCommand();
    command.mtgoId = this.catalog;
    this.showTableLoading = true;
    this.cardProvider.getCardByCatalog(command).subscribe({
      next: (res: any) => {
        this.cardList = res;
        this.showTableLoading = false;
        this.showTable = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getCardByCardId() {
    const command: ByIdCommand = new ByIdCommand();
    command.id = this.cardId;
    this.showTableLoading = true;
    this.cardProvider.getCardByCardId(command).subscribe({
      next: (res: any) => {
        this.cardList = res;
        this.showTableLoading = false;
        this.showTable = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  toggleButtons() {
    this.showButtons = !this.showButtons;
  }
}
