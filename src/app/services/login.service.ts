import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnements/environment';
const BASE_URL = environment.rootUrl + "/auth/local";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient : HttpClient) { }

  login(body :any){
    return  this.httpClient.post(BASE_URL, body)
  }}
