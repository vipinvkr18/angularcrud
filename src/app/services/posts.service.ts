import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

const baseUrl = "https://my-json-server.typicode.com/typicode/demo/posts";

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http:HttpClient) { }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(baseUrl);
  }

  get(id: any): Observable<Post> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  getAuthToken(){
    return "sssss22kkklxnajcasjcjcnjascnajcnajcnas";
  }
}
