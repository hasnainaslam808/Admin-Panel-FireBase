import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string='';
  password:string='';
    constructor(private auth:AuthService) { }
  
    ngOnInit(): void {
    }
    onlogin(){
      this.auth.login(this.email, this.password);
      this.email='';
      this.password='';
    }
   
   ;
    showPassword: boolean = false;
  
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
  
    }
  
  
  signGoogle(){
    this.auth.googleSignIn();
  }

}
