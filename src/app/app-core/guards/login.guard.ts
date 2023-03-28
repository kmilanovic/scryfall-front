import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthProvider } from "../providers/auth.provider";

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authProvider: AuthProvider
  ) {
  }

  canActivate() {
    if (!(this.authProvider.isUserLoggedIn())) {
      return true;
    }
    this.router.navigate(['/card-list'])
    return false;
  }

}

