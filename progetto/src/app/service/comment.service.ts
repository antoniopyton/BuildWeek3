import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.interface';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment.development';
import { Post } from '../models/post.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiURL = `${environment.apiURL}comments`
 /*  private _commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  readonly comments$ = this._commentsSubject.asObservable(); */

  constructor(private http:HttpClient) { }


getComments() {
  return this.http.get<Comment[]>(`${this.apiURL}`)
}

getComment(id: number) {
  return this.http.get<Comment>(`${this.apiURL}/${id}`)
}

deleteComment(id:number){
  return this.http.delete(`${this.apiURL}/${id}`)
}

editComment(id:number, data:Partial<Comment>){
  return this.http.patch(`${this.apiURL}/${id}`, data)
}

createComment(data:Partial<Comment>){
  return this.http.post(`${this.apiURL}`, data)
}
}