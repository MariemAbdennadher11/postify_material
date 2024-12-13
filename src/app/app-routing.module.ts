import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { RechercheComponent } from './recherche/recherche.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [],
    children: [
      {
        path: 'post',
        component: AddPostDialogComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'notif',
        component: NotificationComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'search',
        component: RechercheComponent
      },
    ]
  },

  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
