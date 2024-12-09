import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './layout/main/main.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'' , component:FirstPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  {
    path: 'acceuil', // Parent path for layout
    component: LayoutComponent,
    // children: [
    //   {
    //     path: '', // Default child route
    //     component: MainComponent,
    //   },
    // ],
  },
=======
  { path: 'home', component: HomeComponent },

  // {
  //   path: 'acceuil', // Parent path for layout
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: '', // Default child route
  //       component: MainComponent,
  //     },
   
  //   ],
  // },
>>>>>>> 7450d64 (homePage)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
