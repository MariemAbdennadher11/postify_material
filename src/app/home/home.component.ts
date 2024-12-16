import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild(PostsComponent) postsComponent!: PostsComponent;
  isLogged = false
  currentDate: Date = new Date();
  // username

  isLoginPage: boolean = false;
  username: any;

  constructor(private router: Router) {
    //this.isLogged = this.authentiticationService.checkIfLoggedIn()
    // this.username = localStorage.getItem('username')?.slice(0,2).toUpperCase()
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;

    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isLoginPage = true;

    } else {
      this.isLoginPage = false;
    }

  }
  searchText: string = '';

  onSearch() {
    console.log('Searching for:', this.searchText);
    // You can add logic to handle the search functionality here
  }
  logout(): void {
    // Clear the authentication token from storage
    localStorage.removeItem('authToken');

    // Optional: Notify the server if necessary
    // fetch('/api/logout', { method: 'POST', credentials: 'include' });

    // Redirect the user to the login page
    this.router.navigate(['/']);
  }
  readonly dialog = inject(MatDialog);

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddPostDialogComponent
  //     , {
  //       width: '500px',
  //     }
  //   );
  //     // Listen for the `postAdded` event from the dialog
    
  //   dialogRef.componentInstance.postAdded.subscribe(() => {
  //     this.postsComponent.refreshFeed(); // Refresh the feed when a post is added
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '500px',
    });
    
    // Listen for the postAdded event
      dialogRef.componentInstance.postAdded.subscribe(() => {
      this.postsComponent.refreshFeed(); // Refresh the feed
    });
  
    // Optional: Additional handling if needed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with post creation');
        this.postsComponent.refreshFeed(); 
      }
    });
  }

}

