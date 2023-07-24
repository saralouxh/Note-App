import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    
  }

  onSignup(){
    const signupUser = this.signupForm.value;

    this.authService.signup(signupUser).subscribe((res:any)=>{
      console.log(res);
    })
  }

}
