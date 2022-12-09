import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError} from "rxjs/operators";
import { PostsService } from "./posts.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private postService: PostsService) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = this.postService.getAuthToken();

   if (token) {
     // If we have a token, we set it to the header
     request = request.clone({
        setHeaders: {Authorization: `${token}`}
     });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 // redirect user to the logout page
     	}
 	 }
  	return throwError(err);
	}))
  }
}

