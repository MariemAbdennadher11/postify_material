import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthenticationRequest } from '../shared/DTO/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Correction ici
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
     private userService: UserService,
     private router: Router) {} // Inject UserService

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: AuthenticationRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.authenticate(loginData).subscribe({
        next: (response) => {
          // Store the userId in local storage
          localStorage.setItem('userId', response.id);
          localStorage.setItem('nomUser', response.nom);
          localStorage.setItem('PrenomUser', response.prenom);
  
          // Retrieve and log the userId from local storage
          const userId = localStorage.getItem('userId');
          console.log('Logged-in userId:', userId);

          console.log('Login successful!', response);
          this.router.navigate(['/home/posts']); // Navigate to /home/posts on success
        },
        error: (err) => {
          console.error('Login failed', err);
          // Optionally, display an error message to the user
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const loginData: AuthenticationRequest = {
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password
  //     };

  //     this.userService.authenticate(loginData).subscribe({
  //       next: (response) => {
  //         console.log('Login successful!', response);
  //         // Handle successful login, e.g., redirect or store token
  //       },
  //       error: (err) => {
  //         console.error('Login failed', err);
  //         // Show error message to the user
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  
}