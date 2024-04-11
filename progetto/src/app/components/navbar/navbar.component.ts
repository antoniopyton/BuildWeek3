import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/auth-data.interface';
import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: AuthData | null 
  

  constructor(private authsrv: AuthService, private userSrv: UsersService) {}

  ngOnInit(): void {
    this.authsrv.user$.subscribe((data) => {
      this.user = data
    })
  }
  logout() {
    this.authsrv.logout()
  }

  setSelectedUser(name: string, email: string, userId: number) {
    const selectedUser = {
      name: name,
      email: email,
      id: userId
    }
    console.log(selectedUser)
    this.userSrv.setSelectedUser(selectedUser)
  }
  
}
