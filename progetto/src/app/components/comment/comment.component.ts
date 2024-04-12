import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Comment } from 'src/app/models/comment.interface';
import { CommentService } from 'src/app/service/comment.service';
import { User } from 'src/app/models/user.interface';
import { AuthData } from 'src/app/models/auth-data.interface';
import { Post } from 'src/app/models/post.interface';
import { AuthService } from 'src/app/auth/auth.service';





@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  constructor(private userSrv: UsersService, private cmmntSrv: CommentService, private authSrv:AuthService){}
  selectedUser!: User;
  show = true;
  user!: AuthData | any
  activeUser: any = localStorage.getItem('user');
  activeUserParsed = JSON.parse(this.activeUser)
  @Input() comment!: Comment;
  userComment!: User;
  loading=true;


  ngOnInit(): void {
    this.loadSelectedUser();
    // console.log(this.activeUserParsed.user.id);
    this.userSrv.getUser(this.comment.userId).subscribe((data) =>
        this.userComment = data);

      setTimeout(() => {
        this.loading=false
      }, 250);    
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

  loadSelectedUser() {
    this.userSrv.getUsers().subscribe(users => {
      const author = users.find(user => user.id === this.comment.userId);
      if (author) {
        this.selectedUser = author;
      }
    });
  }

  deleteComment(id: number) {
    this.cmmntSrv.deleteComment(id).subscribe();
    this.show = false;
  }

 }