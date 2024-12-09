import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  { path:'' , component:FirstPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
