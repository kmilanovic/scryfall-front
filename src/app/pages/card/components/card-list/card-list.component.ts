import { Component, OnInit } from '@angular/core';
import { CardModel } from "../../model/dto/card.model";
import { HttpClient } from "@angular/common/http";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import { CARD_SEARCH_URL } from "../../../../app-core/globals/global";

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit {

  showTable = false;
  cardList!: CardModel[];
  currentPage = 1;
  itemsPerPage = 10;
  listOfCurrentPageData: readonly CardModel[] = [];
  showTableLoading = false;
  searchTerm: string = '';

  constructor(private http: HttpClient,
              public cardProvider: CardProvider) {
  }

  ngOnInit(): void {
    this.searchTerm = this.cardProvider.searchTerm;
    this.cardProvider.searchResults = [];
  }

  searchCards() {
    const url = CARD_SEARCH_URL + `${this.searchTerm}`;
    this.showTableLoading = true;
    this.http.get(url).subscribe((response: any) => {
      this.cardList = response.data;
      this.showTable = true;
      this.currentPage = 1;
      this.showTableLoading = false;
    });
  }

  /*searchCards() {
    this.cardProvider.searchTerm = this.searchTerm;
    this.showTableLoading = true;
    this.cardProvider.searchCards(this.searchTerm).subscribe((
      res: any) => {
        this.cardProvider.searchResults = res.data;
        this.showTable = true;
        this.currentPage = 1;
        this.showTableLoading = false;
        console.log(this.cardProvider.searchResults)
      },
      error => console.log(error)
    )
  }*/

  onCurrentPageDataChange($event: readonly CardModel[]): void {
    this.listOfCurrentPageData = $event;
  }

}
