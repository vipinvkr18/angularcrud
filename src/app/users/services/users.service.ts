import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model ';

const BASE_URL = 'https://angular2.free.beeceptor.com';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  constructor(private http: HttpClient) { 
  }
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }
  getUserbyId(id:any):Observable<User>{
    return this.http.get<User>(`${BASE_URL}/users/${id}`);
  }
}
