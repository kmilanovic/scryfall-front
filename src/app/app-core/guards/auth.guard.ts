import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthProvider } from "../providers/auth.provider";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authProvider: AuthProvider
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authProvider.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

}

