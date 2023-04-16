import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../../pages/login/model/dto/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthProvider {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: any): Observable<UserModel> {
    return this.http.post<any>("http://localhost:4200/api/auth/login", {email, password});
  }

  isUserLoggedIn() {
    let jwtToken = localStorage.getItem("token")
    console.log(!(jwtToken === null));
    return !(jwtToken === null);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
}
