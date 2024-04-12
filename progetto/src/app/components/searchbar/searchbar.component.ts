import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/service/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data.interface';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  user!: AuthData | null ;
  searchTerm: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  sub!: Subscription;

  constructor(private userSrv: UsersService, private authsrv: AuthService) {}
  ngOnInit(): void {
    this.getUsers();
    
    setTimeout(() => {
      this.setUsersBehaviorSubject(this.users);
    }, 100);
    
    this.authsrv.user$.subscribe((data) => {
      this.user = data
    })
    this.loadUsers();
    
  }

  setSelectedUser(name: string, email: string, userId: number) {
    const selectedUser = {
      name: name,
      email: email,
      id: userId
    }
    this.userSrv.setSelectedUser(selectedUser)
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getUsers() {
    this.userSrv.getUsers().subscribe((data) => {
      
      this.users = data;
    })
  }

  loadUsers() {
    this.sub = this.userSrv.getUsersObservable().subscribe(
      (users) => {
        if (users.length > 0) {
          this.users = users;
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

  async setUsersBehaviorSubject(users: User[]) {
    this.userSrv.setUsersObservable(users);
  }
}
