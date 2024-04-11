import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/service/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  selectedUser!: User
  urlProfileId: string | null = null;

  constructor(private route: ActivatedRoute, private userSrv: UsersService) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.route.paramMap.subscribe(params => {
      this.urlProfileId = params.get('id');
      if (this.urlProfileId) {
        const id = parseInt(this.urlProfileId, 10);
        
      }
      this.getUser();
      console.log(this.selectedUser)
    });
  }

  getUser(): void {
    this.selectedUser = this.userSrv.getSelectedUser();
  }

  getLoggedUser(): void {
    const activeUser: any = localStorage.getItem('user');
    this.user = JSON.parse(activeUser).user;
    console.log(this.user);
  }
}
