import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL=`${environment.apiURL}users`
  usersSub = new BehaviorSubject<User[]>([]);
  users: User[] = [];
  selectedUser!: User;

  constructor(private http:HttpClient) {}

  getUsers(){
    return this.http.get<User[]>(this.apiURL)
  }

  getUser(id: number){
    return this.http.get<User>(`${this.apiURL}/${id}`)
  }

  getUsersObservable(): Observable<User[]> {
    this.usersSub.subscribe((data => {
      this.users = data;
    }))
    return this.usersSub;
  }

  setUsersObservable(userss: User[]) {
    this.usersSub.next(userss);
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }
}
