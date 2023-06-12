import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SetModel} from "../../pages/set/model/dto/set.model";
import {environment} from "../../../environments/environment";
import {MySetModel} from "../../pages/set/model/dto/my-set.model";

@Injectable({providedIn: 'root'})
export class SetProvider {
  private setUrl  = `${environment.apiUrl}set/`

  constructor(private http: HttpClient) {
  }

  getSets(): Observable<SetModel[]> {
    return this.http.get<SetModel[]>(`${this.setUrl}all-api`)
  }

  getMySets(userId: number): Observable<MySetModel[]> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    return this.http.get<MySetModel[]>(`${this.setUrl}all`, {headers})
  }
}
