import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent {
  @Input() post!: Post;
  mostra = true;

  constructor(private postSrv: PostService) { }

  deletePost(id: number) {
    this.postSrv.deletePost(id).subscribe();
    this.mostra = false;
  }
}
