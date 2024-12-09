import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';

import { merge } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with validation
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Adjust phone number pattern as needed
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required], // Nouveau contrôle

    });
  }

  // Submit form
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
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