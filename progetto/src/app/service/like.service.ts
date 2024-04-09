import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Like } from '../models/like.interface';


@Injectable({
  providedIn: 'root'
})
export class LikeService {
  apiURL = `${environment.apiURL}likes`;
  
  constructor(private http:HttpClient) {}

  getLikes() {
    return this.http.get<Like[]>(`${this.apiURL}`)
  }

  deleteLike(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  createLike(data:Partial<Like>){
    return this.http.post(`${this.apiURL}`, data)
  }
}
