import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CardModel, RulingModel } from "../../pages/card/model/dto/card.model";
import { CARD_SEARCH_URL } from "../globals/global";
import {SetModel} from "../../pages/set/model/dto/set.model";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class SetProvider {
  private cardUrl  = `${environment.apiUrl}set/`

  constructor(private http: HttpClient) {
  }

  getSets(): Observable<SetModel[]> {
    return this.http.get<SetModel[]>(`${this.cardUrl}all-api`)
  }
}
