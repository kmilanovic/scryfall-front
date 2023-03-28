import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CardModel } from "../../pages/card/model/dto/card.model";
import { CARD_SEARCH_URL } from "../globals/global";

@Injectable({providedIn: 'root'})
export class CardProvider {
  searchResults: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {
  }

  getCardById(id: string | null): Observable<CardModel> {
    return this.http.get<CardModel>(`https://api.scryfall.com/cards/` + id);
  }

  searchCards(searchTerm: string): Observable<CardModel> {
    return this.http.get<CardModel>(CARD_SEARCH_URL + `${this.searchTerm}`);
  }
}
