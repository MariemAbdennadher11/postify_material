import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import { RechercheComponent } from './recherche/recherche.component';
import { NotificationComponent } from './notification/notification.component';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RechercheComponent,
    NotificationComponent,
    AddPostDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,MatInputModule,
    MatFormFieldModule,MatButtonModule,
    MatDatepickerModule,MatCardModule,MatNativeDateModule,
    ReactiveFormsModule,FormsModule,MatSortModule,
    LayoutModule,MatSlideToggleModule,MatStepperModule,
    RouterModule,MatTableModule,MatToolbarModule,
    MatSidenavModule,MatMenuModule, MatDialogModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
