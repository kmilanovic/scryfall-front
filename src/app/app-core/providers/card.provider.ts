import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CardModel, RulingModel } from "../../pages/card/model/dto/card.model";
import {environment} from "../../../environments/environment";
import {ByIdCommand} from "../../pages/card/model/command/by-id.command";
import {SearchCardCommand} from "../../pages/card/model/command/search-card.command";
import {SetCodeCommand} from "../../pages/set/model/command/set-code.command";
import {SaveCardInSetCommand} from "../../pages/card/model/command/save-card-in-set.command";
import {CardRequestCommand} from "../../pages/card/model/command/card-request.command";

@Injectable({providedIn: 'root'})
export class CardProvider {
  private cardUrl= `${environment.apiUrl}card/`

  constructor(private http: HttpClient) {
  }

  getCardById(command: ByIdCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}get`, command)
  }

  getCardRulings(command: ByIdCommand): Observable<RulingModel[]> {
    return this.http.post<{ data: RulingModel[] }>(`${this.cardUrl}rulings`, command)
      .pipe(
        map((response: { data: any; }) => response.data)
      );
  }

  searchCards(command: SearchCardCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}search`, command);
  }

  searchCardsBySetCode(command: SetCodeCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}search-by-code`, command)
  }

  saveCardInSet(command: SaveCardInSetCommand): Observable<void> {
    return this.http.post<void>(`${this.cardUrl}save-in-set`, command);
  }

  getCardsBySetId(command: ByIdCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}get-by-set`, command)
  }

  getCardsBySetIdPaginated(command: ByIdCommand, pageIndex: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.post<any>(`${this.cardUrl}get-by-set-paginated`, command, { params });
  }

  getRandomCard(): Observable<CardModel> {
    return this.http.get<CardModel>(`${this.cardUrl}random`);
  }

  getCardByMultiverse(command: CardRequestCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}by-multiverse`, command);
  }

  getCardByCatalog(command: CardRequestCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}by-catalog`, command);
  }

  getCardByCardId(command: ByIdCommand): Observable<CardModel> {
    return this.http.post<CardModel>(`${this.cardUrl}by-id`, command);
  }
}
