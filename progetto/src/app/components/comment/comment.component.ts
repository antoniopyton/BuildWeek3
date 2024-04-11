import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Comment } from 'src/app/models/comment.interface';





@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  constructor(private userSrv: UsersService){}
  authorName: string = '';
  @Input() comment!: Comment;

  ngOnInit(): void {
    this.loadAuthorName();
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
}
