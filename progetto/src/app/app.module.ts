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
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
