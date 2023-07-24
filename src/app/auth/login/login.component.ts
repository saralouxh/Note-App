import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private authService: AuthService,
    private route: Router
  ){}

  onLogin(){
    const loginUser = this.loginForm.value;
    this.authService.login(loginUser).subscribe((res:any)=>{
      if(res.success){
        this.authService.setCurrentUser(res.user);
        this.route.navigate(['/home']);
        this.authService.setToken(res.token);
      }
    });
  }
}
