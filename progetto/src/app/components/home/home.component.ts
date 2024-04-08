import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private PostsSrv: PostService) {}

  ngOnInit(): void {}

  getPosts() {
    this.PostsSrv.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
