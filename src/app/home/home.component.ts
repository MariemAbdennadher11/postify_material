import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'app-hemodialyse';
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
}

