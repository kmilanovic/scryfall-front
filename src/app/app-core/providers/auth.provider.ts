import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthProvider {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: any) {
    return this.http.post<any>("http://localhost:8080/api/auth/login", {email, password}).pipe(
      map(userData => {
        sessionStorage.setItem("email", email);
        let jwtToken = "Bearer " + userData.token;
        sessionStorage.setItem("jwtToken", jwtToken);
        return userData;
      })
    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    let jwtToken = sessionStorage.getItem("jwtToken")
    console.log(!(user === null && jwtToken === null));
    return !(user === null && jwtToken === null);
  }

  logout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('jwtToken');
  }
}
