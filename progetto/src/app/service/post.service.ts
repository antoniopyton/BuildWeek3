import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL = `${environment.apiURL}posts`

  
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(`${this.apiURL}`)
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.apiURL}/${id}`)
  }

  deletePost(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  editPost(id:number, data:Partial<Post>){
    return this.http.patch(`${this.apiURL}/${id}`, data)
  }

  createPost(data:Partial<Post>){
    return this.http.post(`${this.apiURL}`, data)
  }

  getPostLikes(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/${postId}/likes/count`);
  }
}