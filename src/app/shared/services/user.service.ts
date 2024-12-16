import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest, RegisterRequest, UserDto } from '../DTO/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/user'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  // // Get all users
  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/all`);
  // }

  // Get user by ID
  // getUser ById(userId: string): Observable<User> {
  //   return this.http.get<User>(`${this.baseUrl}/${userId}`);
  // }

  // Register a new user
  addUser (request: RegisterRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/subscribe`, request);
  }

  // Authenticate a user
  authenticate(request: AuthenticationRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/authenticate`, request);
  }

}
