import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const email = sessionStorage.getItem('email')
    const jwtToken = sessionStorage.getItem('jwtToken')
    if (email && jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${jwtToken}`
        }
      });
    }

    return next.handle(request);
  }
}
