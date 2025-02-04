import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const modifyRequest = request.clone(
      {
        //browser automatically appends http only cookie to request
        withCredentials : true
      }
    )

    return next.handle(modifyRequest).pipe(
      catchError((error)=> {
        console.log('my errro',error)
        if(error instanceof HttpErrorResponse && error.status === 401 ){

             //this.handleLogout()
        }
        return throwError(()=> error)
      })
    )


  }

  private handleLogout() {
   this.router.navigate(['/auth-login'])
  }
}
