import { Component, OnInit} from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/auth-data.interface';


@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
  @Input() post!: Post;
  user!: AuthData | null 
  mostra = true;

  constructor(private postSrv: PostService, private router:Router, private authsrv: AuthService) { }

  ngOnInit(): void {
    this.authsrv.user$.subscribe((data) => {
      this.user = data
    })
  }

  deletePost(id: number) {
    this.postSrv.deletePost(id).subscribe();
    this.mostra = false;
  }

/*   editTitle=this.post.title;
  editBody=this.post.body */

  editPost(form: NgForm) {
    console.log(form.value);
    this.postSrv.editPost(this.post.id, form.value).subscribe();
    location.reload()
    
  }
}
