import { Component, OnInit } from '@angular/core';
import ValidateForm from '../../../helpers/validateform';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm !: FormGroup;
  constructor (
    private fb : FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService
    ){}

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.customPasswordValidator
        ]]
    })
  }
  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText? this.type = "text": this.type = "password";
  }

  customPasswordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#%^&*()_+\-=\[\]{}|;':",./<>?~]/.test(password);

    if (!(hasLowercase && hasUppercase && hasDigit && hasSpecialChar)) {
      return { invalidPassword: true };
    }

    return null;
  }

  onSignup() {
    if(this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (response)=>{
          this.toast.success({detail:"SUCCESS", summary:response.message, duration: 5000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: (err)=>{
          this.toast.error({detail:"ERROR", summary:err?.error.message, duration: 5000});
        }
      })
    }
    else{
      ValidateForm.validateAllFormFileds(this.signUpForm)
      //logic for throwing error
      this.toast.error({detail:"ERROR", summary:"Must fill all the fields", duration: 5000});
    }
  }
}
