import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftSideComponent } from './left-side/left-side.component';
import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    LeftSideComponent,
    MainComponent,
    TopbarComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[MainComponent]
})
export class MainModule { }
