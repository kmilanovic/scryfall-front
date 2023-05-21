import { Component, OnInit } from '@angular/core';
import { CardModel } from "../../model/dto/card.model";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {SetProvider} from "../../../../app-core/providers/sets.provider";
import {SetModel} from "../../../set/model/dto/set.model";
import {SearchCardCommand} from "../../model/command/search-card.command";

@Component({
  selector: 'app-dashboard',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit {

  books = [
    { id: 1, title: 'The Great Gatsby' },
    { id: 2, title: 'To Kill a Mockingbird' },
    { id: 3, title: '1984' },
    { id: 4, title: 'Pride and Prejudice' },
    { id: 5, title: 'The Catcher in the Rye' },
  ];

  showTable = false;
  cardList!: CardModel[];
  currentPage = 1;
  itemsPerPage = 10;
  listOfCurrentPageData: readonly CardModel[] = [];
  showTableLoading = false;
  term: string = '';
  setList!: SetModel[];
  nzModalRef!: NzModalRef;

  constructor(public cardProvider: CardProvider,
              public modal: NzModalService,
              public setProvider: SetProvider) {}

  ngOnInit(): void {
  }

  searchCards() {
    const searchCardCommand: SearchCardCommand = new SearchCardCommand();
    searchCardCommand.term = this.term;
    this.showTableLoading = true;
    this.cardProvider.searchCards(searchCardCommand).subscribe((
      res: any) => {
        this.cardList = res.data;
        this.showTable = true;
        this.currentPage = 1;
        this.showTableLoading = false;
      },
      error => console.log(error)
    )
  }

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

  private getSets(): void {
    this.setProvider.getSets().subscribe((res: SetModel[]) => {
      if (res) {
        this.setList = res;
        console.log(this.setList)
      }
    })
  }

  openModal(): void {
    this.getSets();
    this.nzModalRef = this.modal.create({
      nzTitle: 'Sets',
      nzClosable: true,
      nzContent: `
      <ul>
        <li *ngFor="let set of setList">{{set.name}}</li>
      </ul>
    `,
      nzFooter: null,
    });
  }
}
