import { Component } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  constructor(private postSrv: PostService, private router: Router) { }

  createPost(form: NgForm) {

    const activeUser: any = localStorage.getItem('user')
    const activeUserId = JSON.parse(activeUser).user.id;
    let post = {
      title: form.value.title,
      body: form.value.body,
      userId: activeUserId
    }
    console.log(post);
    this.postSrv.createPost(post).subscribe();
    alert('Post creato!');
    this.router.navigate(['/'])
  }
}
