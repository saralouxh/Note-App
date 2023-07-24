import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUser: User | null = null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

  onLogout(){
    this.authService.logout();
  }
}
