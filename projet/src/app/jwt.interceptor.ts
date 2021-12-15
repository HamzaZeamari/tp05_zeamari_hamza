import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  token: string = "";

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token != "") {
      request = request.clone({setHeaders: {Authorization: `Bearer ${this.token}`}});
    }
    return next.handle(request).pipe(tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            var tab: Array<string>;
            var auth = event.headers.get("Authorization");
            if (auth != null) {
              tab = auth.split(/Bearer\s+(.*)$/i);
              if (tab.length > 1) this.token = tab[1];
            }
          }
        }
      )
    );
  }
}
