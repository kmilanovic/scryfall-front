import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CardModel, RulingModel } from "../../pages/card/model/dto/card.model";
import { CARD_SEARCH_URL } from "../globals/global";

@Injectable({providedIn: 'root'})
export class CardProvider {

  constructor(private http: HttpClient) {
  }

  getCardById(id: string): Observable<CardModel> {
    return this.http.get<CardModel>(`https://api.scryfall.com/cards/` + id);
  }

  getCardRullings(id: string): Observable<RulingModel[]> {
    return this.http.get<{ data: RulingModel[] }>(`https://api.scryfall.com/cards/${id}/rulings`)
      .pipe(
        map((response: { data: any; }) => response.data)
      );
  }

  searchCards(searchTerm: string): Observable<CardModel> {
    return this.http.get<CardModel>(CARD_SEARCH_URL + `${searchTerm}`);
  }
}
