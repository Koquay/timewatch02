import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import cookie from "js-cookie";

@Injectable({
  providedIn: "root",
})
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = cookie.get("token");

    if (token) {
      const authReq = req.clone({ setHeaders: { Authorization: token } });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
