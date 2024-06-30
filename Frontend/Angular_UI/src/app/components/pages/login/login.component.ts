declare var google: any;

import { Component, OnInit } from '@angular/core';
import ValidateForm from '../../../helpers/validateform';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import {  NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { ResetPasswordService } from '../../../services/reset-password/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm !: FormGroup;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

  constructor (
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
    ){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    google.accounts.id.initialize({
      client_id: '248070419373-t2m72bhdmvrc1la1e37v0qibndggjqae.apps.googleusercontent.com',
      callback: (resp: any)=> {
        this.auth.storeToken(resp.accessToken);
        this.auth.storeRefreshToken(resp.refreshToken);
        const tokenPayload = this.auth.googleDecodeToken(resp.credential);
        this.userStore.setNameForStore(tokenPayload.name);
        this.userStore.setEmailForStore(tokenPayload.email);
        this.toast.success({ detail: "SUCCESS", summary: "Login Successfully", duration: 3000 });
        this.router.navigate(['home']);
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), 
    {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 300
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText? this.type = "text": this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.auth.storeToken(response.accessToken);
          this.auth.storeRefreshToken(response.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayload.name);
          this.userStore.setEmailForStore(tokenPayload.email);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:"Login Successfully", duration: 3000});
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary: "Username or Password is incorrect", duration: 3000});
        },
      });
    }
    else{
      ValidateForm.validateAllFormFileds(this.loginForm);
      this.toast.error({detail:"ERROR", summary:"Must fill all the fields", duration: 3000});
    }
  }
  
  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      //API call to be done
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS", summary:"Mail Sent Successfully", duration: 3000});
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 3000});
        },
      })
    }
  }
}