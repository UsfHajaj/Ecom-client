import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _service:LoadingService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._service.loading()
    return next.handle(req).pipe(
      delay(1000),
      finalize(() => {
        this._service.hideLoader()
      })
    )
  }
}
