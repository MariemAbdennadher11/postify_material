import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  // Track the currently active tab
  activeTab: string = 'posts';

  // Example data for posts and photos
  posts: string[] = [
    'Post 1: My first post!',
    'Post 2: Loving this app!',
    'Post 3: A beautiful sunset photo I took.'
  ];

  photos: string[] = [
    'assets/images/photo1.jpg',
    'assets/images/photo2.jpg',
    'assets/images/photo3.jpg'
  ];

  constructor() { }

  ngOnInit(): void { }

  // Function to switch the active tab
  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}
