import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post.interface';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/models/comment.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(private PostsSrv: PostService, private commentSrv: CommentService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getComments();
  }

  getPosts() {
    this.PostsSrv.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  getComments() {
    this.commentSrv.getComments().subscribe((data) => {
      this.comments = data;
    });
  }
}
