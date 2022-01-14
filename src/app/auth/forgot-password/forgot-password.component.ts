import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  otp!: string;
  isValid: boolean =  true
  isSubmitted: boolean = false;
  isPassword: boolean = false;
  forgotPassword!: FormGroup;
  token!: string;
  email!: string;
  password!: FormGroup

  constructor(private _formBuilder: FormBuilder,
    private authservice: AuthService,
    private userService: UserService,
    private actRouter: ActivatedRoute,
    private _route: Router,
    private router: Router,) { }

  ngOnInit(): void {
    this.forgotPasswordForm();
    this.passwordForm();
    this.token = this.actRouter.snapshot.params['token']
    this.email = this.actRouter.snapshot.params['email']
    if(this.token && this.email){
      this.isPassword = true;
    }
  }


  forgotPasswordForm(){
    this.forgotPassword = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }
  get f(){
    return this.forgotPassword.controls;
  }

  sendOTP(){
    this.isSubmitted = true;
    if(this.forgotPassword.invalid){
      return;
    }
    this.authservice.recover(this.forgotPassword.get('email')?.value).subscribe((data) => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  passwordForm(){
    this.password = this._formBuilder.group({
      password: ['', Validators.required],
      token: [''],
      email: ['']
    })
  }

  get g(){
    return this.password.controls;
  }

  submit(){
    this.isValid = true;
    if(this.password.invalid){
      return;
    }
    let passwordReset = {
      password: this.password.get('password')?.value,
      token: this.token,
      email: this.email
    };
    console.log(passwordReset);
    this.authservice.resetPassword(passwordReset).subscribe((data) => {
      console.log(data)
      this._route.navigate(['./login'])
    },error => {
      console.log(error)
    })
  }
}
