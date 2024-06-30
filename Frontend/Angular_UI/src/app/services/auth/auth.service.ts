import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenApiModel } from '../../models/token-api/token-api.module';
import { JwtHelperService } from '@auth0/angular-jwt';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7249/api/User/";
  private userPayload:any;
  //private loggedInWithGoogle:boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    if(this.isLoggedIn() || this.getRefreshToken())
      this.userPayload = this.decodedToken();
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj)
  }

  signOut(){
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

  storeToken(tokenValue: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', tokenValue);
      //this.userPayload = this.decodedToken();
    }
  }
  
  storeRefreshToken(tokenValue: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('refreshToken', tokenValue);
    }
  }
  getToken(): string | null {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  getRefreshToken(): string | null {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }
  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    console.log(token)
    return jwtHelper.decodeToken(token)
  }
  googleDecodeToken(token: string){
    //this.loggedInWithGoogle = true;
    return JSON.parse(atob(token.split(".")[1]));
  }

  getNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getEmailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
