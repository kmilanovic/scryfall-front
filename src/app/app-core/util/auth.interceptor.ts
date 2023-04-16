import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = localStorage.getItem('token')
    if (jwtToken) {
      request = this.addAuthHeader(request, jwtToken);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status === 403) {
          console.log(error.status)
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
