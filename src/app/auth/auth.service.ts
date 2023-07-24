import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  setCurrentUser(user: User){
    this.currentUserSubject.next(user);
  }

  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  signup(signupUser: any){
    return this.http.post("http://localhost:3000/users/signup", signupUser)
  }

  autoSignIn(){
    // get token from browser
    // if token doesn't exist, just return(natural flow of the website)
    const token = this.getToken()
    if(!token){
      return;
    }

    // send request to get user info
    this.http.get("http://localhost:3000/users/me", 
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).subscribe((res:any)=>{
      if(res.success){
        this.setCurrentUser(res.user);
        console.log(res);
        this.route.navigate(['/home'])
      }
    })
  }

  login(loginUser: any){
    return this.http.post("http://localhost:3000/users/login", loginUser)
  }

  logout(){
    const token = this.getToken();

    this.http.delete("http://localhost:3000/users/logout", {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).subscribe((res:any)=>{
      if (res.success){
        console.log(res);
        this.removeToken();
        this.setCurrentUser(null);
        this.route.navigate(['/login']);
      }
    })
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token'));
  }

  setToken(token){
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
