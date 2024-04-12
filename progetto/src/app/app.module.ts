import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Validators, Form, FormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';


import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Route, RouterModule } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PostcardComponent } from './components/postcard/postcard.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';



const routes: Route[] = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "newpost",
   component: NewPostComponent,
  },
  {
    path: "profile/:userid",
   component: ProfileComponent,
  },
  {
    path: "error404",
    component: Error404Component
  },
  {
    path: "**",
    redirectTo: "error404"
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Error404Component,
    NavbarComponent,
    HomeComponent,
    PostcardComponent,
    NewPostComponent,
    CommentComponent,
    SearchbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgIf,
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
