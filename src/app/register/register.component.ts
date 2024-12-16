import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';

import { merge } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { RegisterRequest } from '../shared/DTO/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
     private userService: UserService,
     private router: Router
    ) {} 

  ngOnInit(): void {
    // Initialize the form with validation
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Adjust phone number pattern as needed
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
    });
  }

  // Submit form
  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     const registerRequest: RegisterRequest = {
  //       nom: this.registerForm.value.lastName,
  //       prenom: this.registerForm.value.firstName,
  //       email: this.registerForm.value.email,
  //       password: this.registerForm.value.password,
  //       phone: this.registerForm.value.phone,
  //       date_naiss: this.registerForm.value.dateOfBirth,
  //     };

  //     this.userService.addUser(registerRequest).subscribe({
  //       next: (response) => {
  //         console.log('User registered successfully', response);
  //       },
  //       error: (err) => {
  //         console.error('Error registering user', err);
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //     this.validateFormFields();
  //   }
  // }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = {
        nom: this.registerForm.value.lastName,
        prenom: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        date_naiss: this.registerForm.value.dateOfBirth,
      };

      this.userService.addUser(registerRequest).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']); // Redirect to login page
        },
        error: (err) => {
          console.error('Error registering user', err);
        }
      });
    } else {
      console.log('Form is invalid');
      this.validateFormFields();
    }
  }

  // Mark all fields as touched to show validation messages
  validateFormFields() {
    for (const control in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(control)) {
        this.registerForm.controls[control].markAsTouched();
      }
    }
  }

  // Getters for easier access to form controls in the HTML
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }
}