import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSideComponent } from './right-side/right-side.component';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { LeftSideComponent } from './left-side/left-side.component';



@NgModule({
  declarations: [
    RightSideComponent,
    MainComponent,
    TopbarComponent,
    LeftSideComponent,
    LayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
