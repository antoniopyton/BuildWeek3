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
  authorName: string = '';
  show = true;
  user!: AuthData | null
  activeUser: any = localStorage.getItem('user');
  activeUserParsed = JSON.parse(this.activeUser)
  

  @Input() comment!: Comment;

  ngOnInit(): void {
    this.loadAuthorName();
    console.log(this.comment.userId);
    console.log(this.activeUserParsed.user.id);
    this.authSrv.user$.subscribe((data) => {
      this.user = data
    })
    }
 

  loadAuthorName() {
    this.userSrv.getUsers().subscribe(users => {
      console.log(users)
      const author = users.find(user => user.id === this.comment.userId);
      if (author) {
        this.authorName = author.name;
        console.log(this.authorName)
      }
    });
  }

  deleteComment(id: number) {
    this.cmmntSrv.deleteComment(id).subscribe();
    this.show = false;
  }

 }