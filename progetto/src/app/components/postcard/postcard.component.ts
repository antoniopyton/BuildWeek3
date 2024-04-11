import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { UsersService } from 'src/app/service/users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/auth-data.interface';
import { LikeService } from 'src/app/service/like.service';
import { Like } from 'src/app/models/like.interface';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';
import { Comment } from 'src/app/models/comment.interface';


@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
  @Input() post!: Post;
  @Input() comments:Comment[]=[];
  postComments=this.comments.filter(comment=> comment.postId === this.post.id)
  user!: AuthData | null
  show = true;
  likeCount = 0;
  likes:Like[]=[];
  userLikes:Like[]=[];
  toggle!: boolean;
  activeUser: any = localStorage.getItem('user');
  activeUserParsed = JSON.parse(this.activeUser);
  users: User[] = [];
  authorName: string = '';
  isTextAreaFocused: boolean = false;
 

  constructor(private postSrv: PostService, private router: Router, private authsrv: AuthService, private likeSrv: LikeService, private userSrv: UsersService) { }

  ngOnInit(): void {
    this.authsrv.user$.subscribe((data) => {
      this.user = data;
    })
    this.getLikes();
    console.log(this.activeUserParsed.user.id)
    this.loadAuthorName();
  }

  deletePost(id: number) {
    this.postSrv.deletePost(id).subscribe();
    this.show = false;
  }

  getLikes() {
    this.likeSrv.getLikes().subscribe((data)=>{
      this.likes=data;
      const activeUser: any = localStorage.getItem('user')
      const activeUserId = JSON.parse(activeUser).user.id;
      this.userLikes=this.likes.filter((fav)=>fav.userId===activeUserId)

    });
    this.show = true;
  }

  addLike(likedPostId: number) {
  
    const like = {
      postId: likedPostId,
      userId: this.activeUserParsed.user.id
    }
    this.likeSrv.createLike(like).subscribe();
    this.isFav(likedPostId)
    this.getLikes();
  }

  removeLike(postId: number) {
    let daRimuovere:any = this.userLikes.find(fav=>fav.postId===postId)
    this.likeSrv.deleteLike(daRimuovere.id).subscribe();
    this.likes = [];
      this.isFav(postId)
  }
  getLikeCount() {
    this.postSrv.getPostLikes(this.post.id).subscribe((count) => this.likeCount = count)
  }
  
  /*   editTitle=this.post.title;
    editBody=this.post.body */

  editPost(form: NgForm) {
    console.log(form.value);
    this.postSrv.editPost(this.post.id, form.value).subscribe();
    location.reload()
  }

  isFav(id: number) {
    if (this.likes.find(fav => fav.postId === id)) {
      return true
    }
    else { return false }
  }

  loadAuthorName() {
    this.userSrv.getUsers().subscribe(users => {
      console.log(users)
      const author = users.find(user => user.id === this.post.userId);
      if (author) {
        this.authorName = author.name;
      }
    });
  }

  newComment(form: NgForm) {
    const activeUser: any = localStorage.getItem('user')
    const activeUserId = JSON.parse(activeUser).user.id;
    let post = {
      title: "",
      body: form.value.body,
      userId: activeUserId
    }
    console.log(post);
    this.postSrv.createPost(post).subscribe();
    alert('Commento creato!');
    this.router.navigate(['/'])
  }

  onTextAreaFocus() {
    this.isTextAreaFocused = true;
  }
  
  onTextAreaBlur() {
    this.isTextAreaFocused = false;
  }
}
