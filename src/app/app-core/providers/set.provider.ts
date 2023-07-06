import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SetModel} from "../../pages/set/model/dto/set.model";
import {environment} from "../../../environments/environment";
import {MySetModel} from "../../pages/set/model/dto/my-set.model";
import {SetIconModel} from "../../pages/set/model/dto/set-icon.model";
import {SetAddCommand} from "../../pages/create-set/model/command/set-add.command";

@Injectable({providedIn: 'root'})
export class SetProvider {
  private setUrl  = `${environment.apiUrl}set/`

  constructor(private http: HttpClient) {
  }

  getSets(): Observable<SetModel[]> {
    return this.http.get<SetModel[]>(`${this.setUrl}all-api`)
  }

  getMySetsPaginated(userId: number, pageIndex: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.setUrl}all-paginated`, { headers, params });
  }

  getMySets(userId: number): Observable<MySetModel[]> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    return this.http.get<MySetModel[]>(`${this.setUrl}all`, {headers})
  }

  getSetIcons(): Observable<SetIconModel[]> {
    return this.http.get<SetIconModel[]>(`${this.setUrl}set-icon/all`)
  }

  addSet(command: SetAddCommand): Observable<void> {
    return this.http.post<void>(`${this.setUrl}add`, command);
  }

  deleteSet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.setUrl}${id}`)
  }
}
