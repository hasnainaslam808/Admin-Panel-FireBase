import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
import{GoogleAuthProvider} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router,private toastr: ToastrService) { }

  //login user
  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then((res:any) => {
      localStorage.setItem('token','true');
      this.router.navigate(['admin']);
      
      if(res.user?.emailVerified==true){
        this.router.navigate(['admin']);
      } 
  }, err=>{
    this.toastr.error(err.message);
    this.router.navigate(['/login']);
  })
  }


  //register user
  register(email:string,password:string) {
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res:any) =>{
      this.toastr.success('registration successful')
this.router.navigate(['/login']);
this.sendEmailForVarification(res.user);
    }, err =>{
      this.toastr.error(err.message);
 this.router.navigate(['/register']);   
    });  
}

//logout

logOut() {
  this.fireauth.signOut().then(() =>{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
,err=>{
  this.toastr.error(err.message);
});
}

//forgetPassword
forgetPassword(email:string){
this.fireauth.sendPasswordResetEmail(email).then(() =>{
  this.toastr.success("successfull");
this.router.navigate(['/verify-email']);
},err=>{
  this.toastr.success(err.message);
});
}

//verifyEmail
sendEmailForVarification(user:any){
  user.sendEmailForVarification().then((res:any) =>{
this.router.navigate(['/verify-email']);	
  },(err:any)=>{
this.toastr.error(err.message);
  });
}


//sign with google
googleSignIn(){
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res:any)=>{
    this.router.navigate(['dashboard']);
    localStorage.setItem('token', JSON.stringify(res.user?.uid))
  },err=>{
    this.toastr.error(err.message);
  })
}
// sig with facebook
// signInWithFacebook() {
//   this.fireauth.signInWithPopup(new this.fireauth.FacebookAuthProvider())
//     .then((result) => {
//       console.log('User signed in:', result.user);
//     })
//     .catch((error) => {
//       console.error('Error signing in with Facebook:', error);
//     });
// }
}