import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../../../models/reset-password/reset-password.model';
import { ConfirmPasswordValidator } from '../../../helpers/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../../../helpers/validateform';
import { ResetPasswordService } from '../../../services/reset-password/reset-password.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent implements OnInit {

  type1: string = "password";
  isText1: boolean = false;
  eyeIcon1: string = "fa-eye-slash";
  type2: string = "password";
  isText2: boolean = false;
  eyeIcon2: string = "fa-eye-slash";
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private resetService: ResetPasswordService,
    private toast: NgToastService,
    private router: Router
    ){}

  ngOnInit(): void{
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.customPasswordValidator
        ]],
        confirmPassword: ['', [
          Validators.required,
          Validators.minLength(8),
          this.customPasswordValidator
          ]]
    },{
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g,'+');
    })
  }

  hideShowPass(){
    this.isText1 = !this.isText1;
    this.isText1? this.eyeIcon1="fa-eye" : this.eyeIcon1="fa-eye-slash";
    this.isText1? this.type1 = "text": this.type1 = "password";
  }

  hideShowConfirmPass(){
    this.isText2 = !this.isText2;
    this.isText2? this.eyeIcon2="fa-eye" : this.eyeIcon2="fa-eye-slash";
    this.isText2? this.type2 = "text": this.type2 = "password";
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
  
  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      
      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS", summary:"Password Reset Successfully", duration: 3000});
          this.router.navigate(['login']);
        },
        error:(err)=>{
          console.log(err);
          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 3000});
        }
      })
    }
    else{
      ValidateForm.validateAllFormFileds(this.resetPasswordForm);
    }
  }
}
