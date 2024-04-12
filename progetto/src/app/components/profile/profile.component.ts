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
  loading = true;

  constructor(private route: ActivatedRoute, private userSrv: UsersService) { }

  ngOnInit(): void {
    this.getLoggedUser();
    this.route.params.subscribe((params) => {
      const urlProfileId = +params['userid'];
      this.userSrv.getUser(urlProfileId).subscribe((data) =>
        this.user = data);

      console.log(this.user)

    });
  }

  getUser(id: number): void {
    // this.selectedUser = this.userSrv.getSelectedUser();
    this.userSrv.getUser(id).subscribe();
  }

  getLoggedUser(): void {
    const activeUser: any = localStorage.getItem('user');
    this.user = JSON.parse(activeUser).user;
    console.log(this.user);
  }
}
