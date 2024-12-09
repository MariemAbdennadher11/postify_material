import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSideComponent } from './right-side/right-side.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';



@NgModule({
  declarations: [
    RightSideComponent,
    LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
