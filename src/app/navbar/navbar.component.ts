import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUser: User | null = null;
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

  onSearchNotes(){
    const searchQuery = this.searchForm.get('searchTerm').value;

    // Navigate to the search-notes route with the search query as a parameter
    this.router.navigate(['/search-notes'], {queryParams: {q: searchQuery}});
  }

  onLogout(){
    this.authService.logout();
  }
}
